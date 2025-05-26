import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    InputAdornment,
    Paper
} from '@mui/material';
import { Search } from '@mui/icons-material';
import PlayerList from '../components/PlayerList';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Player Search
            </Typography>

            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    maxWidth: 600, 
                    mx: 'auto', 
                    mb: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ 
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    }}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Enter a player's name to search
                </Typography>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <PlayerList 
                    searchName={searchQuery}
                    hideFilters={true}
                />
            </Box>
        </Box>
    );
};

export default SearchPage; 