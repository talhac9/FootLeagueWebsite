import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/player';

const playerService = {
    getAllPlayers: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getPlayersByTeam: async (team) => {
        const response = await axios.get(`${API_BASE_URL}?team=${team}`);
        return response.data;
    },

    getPlayersByName: async (name) => {
        const response = await axios.get(`${API_BASE_URL}?name=${name}`);
        return response.data;
    },

    getPlayersByPosition: async (position) => {
        const response = await axios.get(`${API_BASE_URL}?position=${position}`);
        return response.data;
    },

    getPlayersByCountry: async (country) => {
        const response = await axios.get(`${API_BASE_URL}?country=${country}`);
        return response.data;
    },

    addPlayer: async (player) => {
        const response = await axios.post(API_BASE_URL, player);
        return response.data;
    },

    updatePlayer: async (player) => {
        const response = await axios.put(API_BASE_URL, player);
        return response.data;
    },

    deletePlayer: async (name) => {
        const response = await axios.delete(`${API_BASE_URL}/${name}`);
        return response.data;
    }
};

export default playerService; 