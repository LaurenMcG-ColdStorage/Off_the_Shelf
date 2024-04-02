import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";

import './RecResult.css';

function RecResult(){

    const history = useHistory();
    const dispatch = useDispatch();
    const recReturn = useSelector((store) => store.recs.recReturn);
    console.log(recReturn);

    const handleRestart = (event) => {
        event.preventDefault();
        history.push('/recommend');
    }

    // useEffect(() => {
    //     dispatch({type: 'UNSET_ALL_RECS'})
    // })
    
    return(
        <div className='page-container'>
            <h1>Here Are Some Great Picks For You!</h1>
            <div className='result-container'>
                {recReturn.map((game, gameIndex) => {
                        return(
                            <Card key={gameIndex}
                                sx={{width: 300,
                                    height: 400,
                                    boxShadow: 4,
                                    display: 'flex',
                                    mx: 2,
                                    my: 2,
                                    border:1,
                                    backgroundColor: '#464366',
                                    borderColor: '#575477',
                                    color: '#f2f2f2'}}>
                                <CardActionArea>
                                    <CardMedia 
                                        component='img'
                                        height='230'
                                        image={game.image}
                                        alt={game.title} />
                                    <CardContent sx={{
                                        height: 250,
                                        textAlign: 'center',
                                        }}>
                                        <Typography variant="h4">
                                            <b>{game.title}</b>
                                        </Typography>
                                        <Typography variant='subtitle2'>
                                            Players: Up to {game.player_count}<br />
                                            Mechanic: {game.mech1_id}<br />
                                            Theme: {game.theme_id}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })}
            </div>
            <div>
                <Button variant='contained' sx={{
                    width: 150,
                    mx: 'auto',
                    my: 1,
                    border: 1,
                    borderColor: '#575477',
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}}
                    onClick={(event) => handleRestart(event)}>Back To Start</Button>
            </div>

        </div>
    );
}

export default RecResult;