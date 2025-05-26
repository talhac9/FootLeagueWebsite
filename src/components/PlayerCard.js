import React from "react";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

const PlayerCard = ({ player }) => {
    return (
        <Card sx={{ minWidth: 275, m: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5">{player.name}</Typography>
                    <Typography><strong>Age:</strong> {player.age}</Typography>
                    <Typography><strong>Team:</strong> {player.team}</Typography>
                    <Typography><strong>Position:</strong> {player.position}</Typography>
                </CardContent>
                </CardActionArea>
        </Card>
    );
};

export default PlayerCard;