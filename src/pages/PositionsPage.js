import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, Dialog } from '@mui/material';
import { SportsSoccer, Security, Speed, Sports } from '@mui/icons-material';
import PlayerList from '../components/PlayerList';

const PositionsPage = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    const positions = [
        {
            code: 'FW',
            name: 'Forward',
            icon: <SportsSoccer sx={{ fontSize: 80 }} />,
            description: 'Strikers and Wingers',
            color: '#f44336'
        },
        {
            code: 'MF',
            name: 'Midfielder',
            icon: <Speed sx={{ fontSize: 80 }} />,
            description: 'Central and Wide Midfielders',
            color: '#2196f3'
        },
        {
            code: 'DF',
            name: 'Defender',
            icon: <Security sx={{ fontSize: 80 }} />,
            description: 'Center-backs and Full-backs',
            color: '#4caf50'
        },
        {
            code: 'GK',
            name: 'Goalkeeper',
            icon: <Sports sx={{ fontSize: 80 }} />,
            description: 'Shot-stoppers',
            color: '#ffc107'
        }
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Players by Position
            </Typography>
            
            <Grid container spacing={4} sx={{ 
                mt: 17, 
                mx: 'auto', 
                maxWidth: '1200px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {positions.map((position) => (
                    <Grid item xs={12} sm={6} md={3} key={position.code}>
                        <Card align = "center"
                            sx={{ 
                                display: 'flex',
                                height: '200px',
                                width: '200px',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 6
                                },
                                bgcolor: position.color,
                                color: 'white'
                            }}
                        >
                            <CardActionArea 
                                onClick={() => setSelectedPosition(position.code)}
                                sx={{ height: '100%' }}
                            >
                                <CardContent sx={{ 
                                    textAlign: 'center',
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    {position.icon}
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        {position.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {position.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={!!selectedPosition}
                onClose={() => setSelectedPosition(null)}
                maxWidth="lg"
                fullWidth
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        {positions.find(p => p.code === selectedPosition)?.name} Players
                    </Typography>
                    <PlayerList 
                        filterPosition={selectedPosition}
                        hideFilters={true}
                    />
                </Box>
            </Dialog>
        </Box>
    );
};

export default PositionsPage; 