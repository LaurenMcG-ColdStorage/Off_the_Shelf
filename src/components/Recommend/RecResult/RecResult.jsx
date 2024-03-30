import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";

import './RecResult.css';

function RecResult(){

    const history = useHistory();
    const dispatch = useDispatch();
    const recReturn = useSelector((store) => store.recReturn);
    
    const handleRestart = (event) => {
        event.preventDefault();
        history.push('/recommend');
    }

    // useEffect(() => {
    //     dispatch({type: 'UNSET_ALL_RECS'})
    // })
    
    return(
        <div>
            <h2>Here are some great picks for you</h2>
            <p>Three games will be rendered here as cards.</p>
            {/* {recReturn.map((game, gameIndex) => {
                    return(
                        <Card key={gameIndex}
                            sx={{width: 200,
                                height: 270,
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
                                    height='155'
                                    image={game.image}
                                    alt={game.title} />
                                <CardContent sx={{
                                            textAlign: 'center'
                                            }}>
                                    <Typography variant="body1">
                                        {game.title}
                                    </Typography>
                                    <Typography variant='subtitle2'>
                                        Players: Up to {game.player_count}
                                        Mechanic: {game.mech1}
                                        Theme: {game.theme}
                                    </Typography>
                                    <Button sx={{
                                        color:'#f2f2f2',
                                        fontSize: '0.7rem',
                                        backgroundColor: 'rgb(0,0,0,0)',
                                        '&:hover':{backgroundColor: '#e7822b'}
                                    }}
                                    onClick={(event) => handleRemoveFromCollection(game)}>Remove</Button>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })} */}
            <Button onClick={(event) => handleRestart(event)}>Back To Start</Button>
        </div>
    );
}

export default RecResult;