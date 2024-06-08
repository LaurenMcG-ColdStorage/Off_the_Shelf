import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import { Collapse } from "@mui/material";

import './CollectionPage.css';

function CollectionPage(){

    const user = useSelector((store) => store.user);
    const collection = useSelector((store) => store.collection);
    const [details, setDetails] = useState(false);
    //console.log('Collection is: ', collection);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'GRAB_COLLECTION', payload: user})
      },[])

    return (
        <div className='collection'>
            <h2>Care To Scroll Through Your Collection?</h2>
            {collection.map((game, gameIndex) => {
                return(
                    <Card key={gameIndex} className='cards'
                        sx={{width: '70%',
                            maxWidth: 900,
                            boxShadow: 4,
                            alignItems: 'inherit',
                            mx: 'auto',
                            my: '2rem',
                            border: 1,
                            backgroundColor: '#464366',
                            borderColor: '#575477',
                            color: '#f2f2f2',
                            textShadow: 'inherit'
                            }}>
                        <CardActionArea onClick={(event) => setDetails(!details)}>
                                <CardMedia 
                                component='img'
                                height='145'
                                image={game.image}
                                alt={game.title}/>
                                {details === true ? 
                                    <CardContent>
                                        <Typography sx={{fontSize: '2rem'}}>
                                            {game.title}
                                        </Typography>
                                        <Typography sx={{fontSize: '1rem'}}>
                                            Theme: {game.theme}
                                        </Typography>
                                        <Typography sx={{fontSize: '1rem'}}>
                                            Mechanics: {game.mechanic} 
                                        </Typography>
                                        <Typography sx={{fontSize: '1rem'}}>
                                            Players: {game.min_players} - {game.max_players}<br/>
                                        </Typography>
                                        <Typography sx={{fontSize: '1rem'}}>
                                            Play Time: {game.min_play_time} - {game.max_play_time}<br/>
                                        </Typography>
                                        <Typography sx={{fontSize: '1rem'}}>
                                            {game.description}
                                        </Typography>
                                    </CardContent>
                                            : 
                                    <CardContent>
                                        <Typography sx={{fontSize: '2rem'}}>
                                            {game.title} 
                                        </Typography>
                                         {/* This is where I'm trying to work on rendering a games details when it's clicked on. */}
                                </CardContent>
                                }  
                        </CardActionArea>
                    </Card>

                )
            })}
        </div>
    );
};

export default CollectionPage;