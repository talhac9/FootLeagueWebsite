// src/components/Navbar.js
import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box,
    Container,
    Tooltip
} from '@mui/material';
import { 
    Home,
    SportsSoccer,
    Flag,
    Group,
    Search
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/', icon: <Home /> },
        { label: 'Teams', path: '/teams', icon: <SportsSoccer /> },
        { label: 'Nations', path: '/nations', icon: <Flag /> },
        { label: 'Positions', path: '/positions', icon: <Group /> },
        { label: 'Search', path: '/search', icon: <Search /> },
    ];

    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: 'var(--dark-bg-secondary)',
                boxShadow: 'var(--dark-shadow-2)',
                borderBottom: '1px solid var(--dark-divider)'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar 
                    disableGutters 
                    sx={{ 
                        display: 'flex',
                        position: 'relative',
                        height: '70px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            left: 0,
                            cursor: 'pointer',
                            '&:hover': {
                                '& img': {
                                    transform: 'scale(1.05)',
                                },
                                '& .MuiTypography-root': {
                                    color: 'var(--dark-primary)'
                                }
                            }
                        }}
                        onClick={() => navigate('/')}
                    >
                        <img 
                            src="/images/footleague-logo.png"
                            alt="FootLeague Logo"
                            style={{
                                height: '40px',
                                marginRight: '10px',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                color: 'var(--dark-text-primary)',
                                transition: 'color 0.3s ease'
                            }}
                        >
                            FootLeague
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            width: '100%'
                        }}
                    >
                        {navItems.map((item) => (
                            <Tooltip 
                                key={item.path} 
                                title={item.label}
                                arrow
                                placement="bottom"
                                sx={{
                                    backgroundColor: 'var(--dark-bg-elevated)',
                                    color: 'var(--dark-text-primary)'
                                }}
                            >
                                <Button
                                    color="inherit"
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        borderRadius: 'var(--border-radius-md)',
                                        minWidth: '48px',
                                        height: '48px',
                                        backgroundColor: location.pathname === item.path 
                                            ? 'var(--dark-bg-elevated)' 
                                            : 'transparent',
                                        color: location.pathname === item.path 
                                            ? 'var(--dark-primary)' 
                                            : 'var(--dark-text-secondary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--dark-bg-elevated)',
                                            color: 'var(--dark-primary)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {item.icon}
                                </Button>
                            </Tooltip>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;