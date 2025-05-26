import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, Dialog } from '@mui/material';
import PlayerList from '../components/PlayerList';

const TeamsPage = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = [
        {
            name: 'Arsenal',
            logo: '/images/teams/arsenal.png',
            color: '#EF0107'
        },
        {
            name: 'Manchester-City',
            logo: '/images/teams/manchester-city.png',
            color: '#6CABDD'
        },
        {
            name: 'Newcastle-United',
            logo: '/images/teams/newcastle-united.png',
            color: '#241F20'
        },
        {
            name: 'Tottenham-Hotspur',
            logo: '/images/teams/tottenham-hotspur.png',
            color: '#132257'
        },
        {
            name: 'Manchester-United',
            logo: '/images/teams/manchester-united.png',
            color: '#DA291C'
        },
        {
            name: 'Liverpool',
            logo: '/images/teams/liverpool.png',
            color: '#C8102E'
        },
        {
            name: 'Brighton-and-Hove-Albion',
            logo: '/images/teams/brighton.png',
            color: '#0057B8'
        },
        {
            name: 'Chelsea',
            logo: '/images/teams/chelsea.png',
            color: '#034694'
        },
        {
            name: 'West-Ham-United',
            logo: '/images/teams/west-ham.png',
            color: '#7A263A'
        },
        {
            name: 'Aston-Villa',    
            logo: '/images/teams/aston-villa.png',
            color: '#67AAF0'
        },
        {
            name: 'Fulham',
            logo: '/images/teams/fulham.png',
            color: '#1B458F'
        },
        {
            name: 'Crystal-Palace',
            logo: '/images/teams/crystal-palace.png',
            color: '#1B458F'
        },
        {
            name: 'Brentford',
            logo: '/images/teams/brentford.png',
            color: '#780D23'
        },
        {
            name: 'Wolverhampton-Wanderers',
            logo: '/images/teams/wolves.png',
            color: '#FDB913'
        },
        {
            name: 'Nottingham-Forest',
            logo: '/images/teams/nottingham-forest.png',
            color: '#EB1C2D'
        },
        {
            name: 'Bournemouth',
            logo: '/images/teams/bournemouth.png',
            color: '#DA291C'
        },
        {
            name: 'Everton',
            logo: '/images/teams/everton.png',
            color: '#003399'
        },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Premier League Teams
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
                {teams.map((team) => (
                    <Grid item xs={12} sm={6} md={4} key={team.name}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 6
                                },
                                borderTop: `4px solid ${team.color}`
                            }}
                        >
                            <CardActionArea onClick={() => setSelectedTeam(team.name)}>
                                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                    <img 
                                        src={team.logo}
                                        alt={`${team.name} logo`}
                                        style={{ 
                                            width: '160px',
                                            height: 'auto',
                                            marginBottom: '16px'
                                        }}
                                    />
                                    <Typography variant="h5" component="h2">
                                        {team.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={!!selectedTeam}
                onClose={() => setSelectedTeam(null)}
                maxWidth="lg"
                fullWidth
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        {selectedTeam} Players
                    </Typography>
                    <PlayerList 
                        filterTeam={selectedTeam}
                        hideFilters={true}
                    />
                </Box>
            </Dialog>
        </Box>
    );
};

export default TeamsPage; 