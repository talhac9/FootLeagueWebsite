import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, Dialog } from '@mui/material';
import PlayerList from '../components/PlayerList';

const TeamsPage = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = [
        {
            name: 'Arsenal',
            logo: 'https://resources.premierleague.com/premierleague/badges/t3.png',
            color: '#EF0107'
        },
        {
            name: 'Manchester-City',
            logo: 'https://resources.premierleague.com/premierleague/badges/t43.png',
            color: '#6CABDD'
        },
        {
            name: 'Newcastle-United',
            logo: 'https://resources.premierleague.com/premierleague/badges/t4.png',
            color: '#241F20'
        },
        {
            name: 'Tottenham-Hotspur',
            logo: 'https://resources.premierleague.com/premierleague/badges/t6.png',
            color: '#132257'
        },
        {
            name: 'Manchester-United',
            logo: 'https://resources.premierleague.com/premierleague/badges/t1.png',
            color: '#DA291C'
        },
        {
            name: 'Liverpool',
            logo: 'https://images.seeklogo.com/logo-png/22/1/liverpool-fc-logo-png_seeklogo-225180.png',
            color: '#C8102E'
        },
        {
            name: 'Brighton-and-Hove-Albion',
            logo: 'https://resources.premierleague.com/premierleague/badges/t36.png',
            color: '#0057B8'
        },
        {
            name: 'Chelsea',
            logo: 'https://resources.premierleague.com/premierleague/badges/t8.png',
            color: '#034694'
        },
        {
            name: 'West-Ham-United',
            logo: 'https://resources.premierleague.com/premierleague/badges/t11.png',
            color: '#7A263A'
        },
        {
            name: 'Aston-Villa',    
            logo: 'https://brandlogos.net/wp-content/uploads/2025/02/aston_villa_fc-logo_brandlogos.net_9duqy.png',
            color: '#67AAF0'
        },
        {
            name: 'Fulham',
            logo: 'https://brandlogos.net/wp-content/uploads/2014/10/fulham-fc-logo-512x512.png',
            color: '#1B458F'
        },
        {
            name: 'Crystal-Palace',
            logo: 'https://resources.premierleague.com/premierleague/badges/t13.png',
            color: '#1B458F'
        },
        {
            name: 'Brentford',
            logo: 'https://brandlogos.net/wp-content/uploads/2021/08/Brentford-FC-512x512.png',
            color: '#780D23'
        },
        {
            name: 'Wolverhampton-Wanderers',
            logo: 'https://brandlogos.net/wp-content/uploads/2014/11/Wolverhampton-Wanderers-FC-crest-512x442.png',
            color: '#FDB913'
        },
        {
            name: 'Nottingham-Forest',
            logo: 'https://images.seeklogo.com/logo-png/23/1/nottingham-forest-logo-png_seeklogo-237390.png',
            color: '#EB1C2D'
        },
        {
            name: 'Bournemouth',
            logo: 'https://brandlogos.net/wp-content/uploads/2016/02/AFC-Bournemouth-crest-512x676.png',
            color: '#DA291C'
        },
        {
            name: 'Everton',
            logo: 'https://brandlogos.net/wp-content/uploads/2016/11/everton_fc-logo_brandlogos.net_wuxl3-512x523.png',
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