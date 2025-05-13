"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Profile } from "../../backend/models/profile";
import { JobPost } from "../../backend/models/jobPost";
import { useImmerReducer } from "use-immer";

interface DataState {
  profiles: Profile[];
  jobPosts: JobPost[];
  loading: boolean;
  error: string | null;
}

type DataAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROFILES"; payload: Profile[] }
  | { type: "ADD_PROFILE"; payload: Profile }
  | { type: "SET_JOB_POSTS"; payload: JobPost[] }
  | { type: "ADD_JOB_POST"; payload: JobPost };

const initialState: DataState = {
  profiles: [],
  jobPosts: [],
  loading: true,
  error: null,
};

function dataReducer(draft: DataState, action: DataAction) {
  switch (action.type) {
    case "SET_LOADING":
      draft.loading = action.payload;
      break;
    case "SET_ERROR":
      draft.error = action.payload;
      break;
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
      draft.jobPosts.push(action.payload);
      break;
  }
}

interface DataContextType extends DataState {
  dispatch: React.Dispatch<DataAction>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        // Fetch profiles
        const profilesResponse = await fetch("/api/profiles");
        const profilesData = await profilesResponse.json();

        if (profilesData.success) {
          dispatch({ type: "SET_PROFILES", payload: profilesData.data });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: profilesData.error || "Failed to fetch profiles",
          });
        }

        // TODO: Add job posts fetching when the API is ready
        // const jobPostsResponse = await fetch("/api/job-posts");
        // const jobPostsData = await jobPostsResponse.json();
        // if (jobPostsData.success) {
        //   dispatch({ type: "SET_JOB_POSTS", payload: jobPostsData.data });
        // }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch data",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
