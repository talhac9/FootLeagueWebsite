import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TeamsPage from './pages/TeamsPage';
import NationsPage from './pages/NationsPage';
import PositionsPage from './pages/PositionsPage';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <CssBaseline />
                <Navbar />
                
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/nations" element={<NationsPage />} />
                        <Route path="/positions" element={<PositionsPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </Box>

                <ToastContainer position="bottom-right" />
            </Box>
        </Router>
    );
}

export default App;