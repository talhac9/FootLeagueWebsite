import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { 
    Box, 
    TextField, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    IconButton,
    Button,
    Stack,
    Typography
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import playerService from '../services/playerService';
import { toast } from 'react-toastify';
import { getFullCountryName } from '../utils/countryMapping';


const PlayerList = ({ 
    onEdit,
    filterTeam,
    filterPosition,
    filterCountry,
    searchName,
    hideFilters = false
}) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [localFilterTeam, setLocalFilterTeam] = useState('');
    const [localFilterPosition, setLocalFilterPosition] = useState('');
    const [localSearchName, setLocalSearchName] = useState('');

    const loadPlayers = async () => {
        setLoading(true);
        try {
            let data;
            // Check for external filters first (from parent components)
            if (filterTeam) {
                data = await playerService.getPlayersByTeam(filterTeam);
            } else if (filterPosition) {
                data = await playerService.getPlayersByPosition(filterPosition);
            } else if (filterCountry) {
                data = await playerService.getPlayersByCountry(filterCountry);
            } 
            // Then check for local filters and search
            else if ((searchName && searchName.trim()) || (localSearchName && localSearchName.trim())) {
                const searchTerm = searchName || localSearchName;
                if (searchTerm.trim()) {
                    data = await playerService.getPlayersByName(searchTerm);
                } else {
                    data = await playerService.getAllPlayers();
                }
            } else if (localFilterTeam) {
                data = await playerService.getPlayersByTeam(localFilterTeam);
            } else if (localFilterPosition) {
                data = await playerService.getPlayersByPosition(localFilterPosition);
            } else {
                data = await playerService.getAllPlayers();
            }

            // Filter out 'Squad Total' entries
            const filteredData = data.filter(player => player.name.toLowerCase() !== 'squad total');
            setPlayers(filteredData);
        } catch (error) {
            toast.error('Error loading players');
            setPlayers([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPlayers();
    }, [filterTeam, filterPosition, filterCountry, searchName, localFilterTeam, localFilterPosition]);

    const handleDelete = async (name) => {
        try {
            await playerService.deletePlayer(name);
            toast.success('Player deleted successfully');
            loadPlayers();
        } catch (error) {
            toast.error('Error deleting player');
        }
    };

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 1 },
        { field: 'position', headerName: 'Position', flex: 1 },
        { 
            field: 'country', 
            headerName: 'Country', 
            flex: 1,
            renderCell: (params) => {
                return getFullCountryName(params.value);
            }
        },
        { field: 'age', headerName: 'Age', width: 90 },
        { field: 'goals', headerName: 'Goals', width: 90 },
        { field: 'assists', headerName: 'Assists', width: 90 },
        { field: 'mp', headerName: 'Matches', width: 90 },
    ];

    const handleSearch = async () => {
        try {
            setLoading(true);
            let data;
            if (localSearchName.trim()) {
                data = await playerService.getPlayersByName(localSearchName);
            } else {
                data = await playerService.getAllPlayers();
            }
            const filteredData = data.filter(player => player.name.toLowerCase() !== 'squad total');
            setPlayers(filteredData);
        } catch (error) {
            toast.error('Error searching players');
            setPlayers([]);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            {!hideFilters && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Premier League Players
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                label="Search by Name"
                                variant="outlined"
                                value={localSearchName}
                                onChange={(e) => setLocalSearchName(e.target.value)}
                                sx={{ width: 200 }}
                                placeholder="Type to search..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                startIcon={<Search />}
                            >
                                Search
                            </Button>
                        </Stack>
                        
                        <FormControl sx={{ width: 200 }}>
                            <InputLabel>Filter by Team</InputLabel>
                            <Select
                                value={localFilterTeam}
                                label="Filter by Team"
                                onChange={(e) => setLocalFilterTeam(e.target.value)}
                            >
                                <MenuItem value="">All Teams</MenuItem>
                                <MenuItem value="Arsenal">Arsenal</MenuItem>
                                <MenuItem value="Chelsea">Chelsea</MenuItem>
                                <MenuItem value="Liverpool">Liverpool</MenuItem>
                                <MenuItem value="Manchester City">Manchester City</MenuItem>
                                <MenuItem value="Manchester United">Manchester United</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 200 }}>
                            <InputLabel>Filter by Position</InputLabel>
                            <Select
                                value={localFilterPosition}
                                label="Filter by Position"
                                onChange={(e) => setLocalFilterPosition(e.target.value)}
                            >
                                <MenuItem value="">All Positions</MenuItem>
                                <MenuItem value="FW">Forward</MenuItem>
                                <MenuItem value="MF">Midfielder</MenuItem>
                                <MenuItem value="DF">Defender</MenuItem>
                                <MenuItem value="GK">Goalkeeper</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </>
            )}

            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={players}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.name}
                    loading={loading}
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default PlayerList; 