"use client";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { Profile } from "../../backend/models/profile";
import { JobPost } from "../../backend/models/jobPost";
import { useImmerReducer } from "use-immer";

interface DataState {
  profiles: Profile[];
  jobPosts: JobPost[];
  matchingCandidates: Record<string, string[]>; // jobId -> candidateIds
  isLoading: boolean;
  error: string | null;
}

type DataAction =
  | { type: "SET_PROFILES"; payload: Profile[] }
  | { type: "ADD_PROFILE"; payload: Profile }
  | { type: "SET_JOB_POSTS"; payload: JobPost[] }
  | { type: "ADD_JOB_POST"; payload: JobPost }
  | {
      type: "UPDATE_JOB_POST_MATCHES";
      payload: { jobId: string; candidateIds: string[] };
    }
  | {
      type: "SET_MATCHING_CANDIDATES";
      payload: { jobId: string; candidateIds: string[] };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "ACCEPT_JOB_POST_MATCHES";
      payload: { jobId: string; candidateId: string };
    };

const initialState: DataState = {
  profiles: [],
  jobPosts: [],
  matchingCandidates: {},
  isLoading: false,
  error: null,
};

function dataReducer(draft: DataState, action: DataAction) {
  switch (action.type) {
    case "SET_PROFILES":
      draft.profiles = action.payload;
      break;
    case "ADD_PROFILE":
      draft.profiles.push(action.payload);
      break;
    case "SET_JOB_POSTS":
      draft.jobPosts = action.payload;
      break;
    case "ADD_JOB_POST":
      draft.jobPosts.unshift(action.payload);
      break;
    case "SET_MATCHING_CANDIDATES":
      const jobPost = draft.jobPosts.find(
        (job) => job.id === action.payload.jobId
      );
      if (jobPost) {
        jobPost.matchedCandidates = action.payload.candidateIds;
      }
      break;
    case "SET_LOADING":
      draft.isLoading = action.payload;
      break;
    case "SET_ERROR":
      draft.error = action.payload;
      break;
    case "ACCEPT_JOB_POST_MATCHES":
      const jobId = draft.jobPosts.find(
        (job) => job.id === action.payload.jobId
      )?.id;
      const candidate = draft.profiles.find(
        (profile) => profile.id === action.payload.candidateId
      );
      if (candidate && jobId) {
        if (!candidate.selectedJobPostIds) candidate.selectedJobPostIds = [];
        candidate.selectedJobPostIds.push(jobId);
      }
      break;
  }
}

const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
} | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(dataReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        // Fetch profiles
        const profilesResponse = await fetch("/api/profiles");
        if (!profilesResponse.ok) {
          throw new Error("Failed to fetch profiles");
        }
        const { data: profiles } = await profilesResponse.json();
        dispatch({ type: "SET_PROFILES", payload: profiles });

        // TODO: Fetch job posts
        // const jobPostsResponse = await fetch("/api/jobs");
        // if (!jobPostsResponse.ok) {
        //   throw new Error("Failed to fetch job posts");
        // }
        // const jobPosts = await jobPostsResponse.json();
        // dispatch({ type: "SET_JOB_POSTS", payload: jobPosts });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
