"use client";

import { Card, CardContent, Typography, Avatar, Box, Chip, Stack, IconButton, Button } from '@mui/material';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@mui/icons-material';
import { Profile } from '@/backend/models/profile';
import { useTranslation } from '@/hooks/useTranslation';

export const ProfileSelection = ({ candidate, onViewProfile, onAccept, onReject }: { candidate: Profile, onViewProfile: () => void, onAccept: () => void, onReject: () => void }) => {
    const { name, title, skills, yearsOfExperience } = candidate;
    const { t } = useTranslation();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10rem' }}>
            <Card sx={{ width: 400, height: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box
                    sx={{
                        height: '33%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Avatar
                        alt={name}
                        // src={avatarUrl}
                        sx={{ width: 100, height: 100 }}
                    />
                </Box>

                <CardContent sx={{ textAlign: 'center', flex: 1, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {title}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
                        {skills.map((skill, index) => (
                            <Chip key={index} label={skill} size="small" />
                        ))}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {yearsOfExperience} years in the industry
                    </Typography>
                    {candidate.education && candidate.education.length > 0 ? (
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <Typography variant='body2' color='text.secondary'>
                                {candidate.education[0].degree} @ {candidate.education[0].institution}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {candidate.education[0].graduationYear}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {t("candidate.noEducation")}
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <IconButton
                    onClick={onReject}
                >
                    <CancelOutlined color='error' sx={{ fontSize: 40 }} />
                </IconButton>

                <div className="flex items-center justify-center">
                    <Button variant="contained" onClick={onViewProfile} sx={{ height: 40 }}>
                        View Profile
                    </Button>
                </div>

                <IconButton
                    onClick={onAccept}
                >
                    <CheckCircleOutlineOutlined color='success' sx={{ fontSize: 40 }} />
                </IconButton>
            </Stack>
        </Box>
    );

};