import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, Dialog } from '@mui/material';
import playerService from '../services/playerService';
import PlayerList from '../components/PlayerList';
import { getFullCountryName } from '../utils/countryMapping';

const NationsPage = () => {
    const [nations, setNations] = useState([]);
    const [selectedNation, setSelectedNation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNations = async () => {
            try {
                const players = await playerService.getAllPlayers();
                const uniqueNations = [...new Set(players.map(player => player.country))];
                // Filter out empty or null values and sort
                setNations(uniqueNations.filter(nation => nation && nation.trim() !== '').sort());
            } catch (error) {
                console.error('Error fetching nations:', error);
            }
            setLoading(false);
        };
        fetchNations();
    }, []);

    const getNationFlag = (countryCode) => {
        if (!countryCode) return '';
        
        // Split the country code by space and take the first part (e.g., "br" from "br BRA")
        const code = countryCode.split(' ')[0].toLowerCase();
        
        // Special cases for UK nations
        if (code === 'eng') {
            return `https://flagcdn.com/w160/gb-eng.png`;
        }
        
        if (code === 'sct') {
            return `https://flagcdn.com/w160/gb-sct.png`;
        }

        if (code === 'wls') {
            return `https://flagcdn.com/w160/gb-wls.png`;
        }

        if (code === 'nir') {
            return `https://flagcdn.com/w160/gb-nir.png`;
        }
        
        return `https://flagcdn.com/w160/${code}.png`;
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Players by Nation
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {nations.map((nation) => (
                    <Grid item xs={12} sm={6} md={3} key={nation}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                        >
                            <CardActionArea onClick={() => setSelectedNation(nation)}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <img 
                                        src={getNationFlag(nation)}
                                        alt={`${getFullCountryName(nation)} flag`}
                                        style={{ 
                                            width: '160px',
                                            height: 'auto',
                                            marginBottom: '16px',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <Typography variant="h6" component="h2">
                                        {getFullCountryName(nation)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={!!selectedNation}
                onClose={() => setSelectedNation(null)}
                maxWidth="lg"
                fullWidth
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Players from {getFullCountryName(selectedNation)}
                    </Typography>
                    <PlayerList 
                        filterCountry={selectedNation}
                        hideFilters={true}
                    />
                </Box>
            </Dialog>
        </Box>
    );
};

export default NationsPage; 