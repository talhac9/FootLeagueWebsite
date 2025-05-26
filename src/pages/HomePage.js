import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SportsSoccer, Flag, Group, Search, PersonSearch } from '@mui/icons-material';
import AnimatedBackground from '../components/AnimatedBackground';

const HomePage = () => {
    const navigate = useNavigate();
    
    const features = [
        {
            title: 'Teams',
            icon: <SportsSoccer sx={{ fontSize: 60 }} />,
            path: '/teams'
        },
        {
            title: 'Nations',
            icon: <Flag sx={{ fontSize: 60 }} />,
            path: '/nations'
        },
        {
            title: 'Positions',
            icon: <Group sx={{ fontSize: 60 }} />,
            path: '/positions'
        },
        {
            title: 'Player Search',
            icon: <PersonSearch sx={{ fontSize: 60 }} />,
            path: '/search'
        }
    ];

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <AnimatedBackground />
            <Box sx={{ 
                p: 4, 
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}> 
                <Grid container spacing={4} sx={{ mt: 30, maxWidth: '1200px', mx: 'auto' }}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={3} key={feature.title}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    height: '200px',
                                    width: '200px',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    background: 'rgba(45, 45, 45, 0.5)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid var(--dark-divider)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                                        background: 'rgba(45, 45, 45, 0.8)',
                                        '& .feature-icon': {
                                            color: 'var(--dark-primary)',
                                            transform: 'scale(1.1)'
                                        }
                                    }
                                }}
                            >
                                <CardActionArea 
                                    onClick={() => navigate(feature.path)}
                                    sx={{ height: '100%' }}
                                >
                                    <CardContent sx={{ 
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 3
                                    }}>
                                        <Box 
                                            sx={{ 
                                                mb: 2,
                                                '& .feature-icon': {
                                                    transition: 'all 0.3s ease',
                                                    color: 'var(--dark-text-primary)'
                                                }
                                            }}
                                        >
                                            {React.cloneElement(feature.icon, { className: 'feature-icon' })}
                                        </Box>
                                        <Typography 
                                            gutterBottom 
                                            variant="h5" 
                                            component="h2"
                                            sx={{ 
                                                color: 'var(--dark-text-primary)',
                                                fontWeight: 600
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            sx={{ 
                                                color: 'var(--dark-text-secondary)',
                                                fontSize: '0.95rem'
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default HomePage; 