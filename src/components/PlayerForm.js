import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Alert
} from '@mui/material';
import playerService from '../services/playerService';
import { toast } from 'react-toastify';
import { getFullCountryName } from '../utils/countryMapping';

const PlayerForm = ({ open, onClose, player }) => {
    const initialState = {
        name: '',
        country: '',
        position: '',
        age: '',
        mp: '',
        starts: '',
        min: '',
        goals: '',
        assists: '',
        penaltyKicks: '',
        yellowCards: '',
        redCards: '',
        expectedGoals: '',
        expectedAssists: '',
        team: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [localSearchName, setLocalSearchName] = useState('');

    useEffect(() => {
        if (player) {
            setFormData(player);
        } else {
            setFormData(initialState);
        }
        setError('');
    }, [player]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        // Only update if the value has actually changed
        if (value !== localSearchName) {
            setLocalSearchName(value);
        }
    };

    const checkForDuplicateName = async (name) => {
        try {
            const players = await playerService.getPlayersByName(name);
            // If we're adding a new player, any match is a duplicate
            // If we're editing, only consider it a duplicate if it's a different player
            if (!player && players.length > 0) {
                return true;
            }
            if (player && players.some(p => p.name === name && p.name !== player.name)) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking for duplicate name:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Check for duplicate name
            const isDuplicate = await checkForDuplicateName(formData.name);
            if (isDuplicate) {
                setError('A player with this name already exists');
                setLoading(false);
                return;
            }

            if (player) {
                await playerService.updatePlayer(formData);
                toast.success('Player updated successfully');
            } else {
                await playerService.addPlayer(formData);
                toast.success('Player added successfully');
            }
            onClose(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                               (player ? 'Error updating player' : 'Error adding player');
            setError(errorMessage);
            toast.error(errorMessage);
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
            <DialogTitle>{player ? 'Edit Player' : 'Add New Player'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                label="Name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled={!!player}
                                error={!!error && error.includes('name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="team"
                                label="Team"
                                value={formData.team}
                                onChange={handleChange}
                                fullWidth
                                required
                                select
                            >
                                <MenuItem value="Arsenal">Arsenal</MenuItem>
                                <MenuItem value="Chelsea">Chelsea</MenuItem>
                                <MenuItem value="Liverpool">Liverpool</MenuItem>
                                <MenuItem value="Manchester City">Manchester City</MenuItem>
                                <MenuItem value="Manchester United">Manchester United</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="position"
                                label="Position"
                                value={formData.position}
                                onChange={handleChange}
                                fullWidth
                                required
                                select
                            >
                                <MenuItem value="FW">Forward</MenuItem>
                                <MenuItem value="MF">Midfielder</MenuItem>
                                <MenuItem value="DF">Defender</MenuItem>
                                <MenuItem value="GK">Goalkeeper</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="country"
                                label="Country"
                                value={formData.country ? getFullCountryName(formData.country) : ''}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="age"
                                label="Age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="mp"
                                label="Matches Played"
                                type="number"
                                value={formData.mp}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="goals"
                                label="Goals"
                                type="number"
                                value={formData.goals}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="assists"
                                label="Assists"
                                type="number"
                                value={formData.assists}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)}>Cancel</Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading || !!error}
                    >
                        {player ? 'Update' : 'Add'} Player
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default PlayerForm; 