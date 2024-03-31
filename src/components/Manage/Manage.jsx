import { useState, useEffect } from "react";
import { ManageAddModal } from "./ManageAddModal";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";

import './Manage.css';

function Manage(){

    const user = useSelector((store) => store.user.collection_id);
    const collection = useSelector((store) => store.collection);
    const dispatch = useDispatch();
    const [manageModal, setManageModal] = useState(false);

    const handleRefresh = () => {
        dispatch({type: 'GRAB_COLLECTION', payload: {collection_id: user}});
    };
    
    const handleClose = () => {
        setManageModal(false);
        handleRefresh();
    };

    const handleRemoveFromCollection = (game) => {
        const removeData = {collection_id: user, game_id: game.game_id};
        dispatch({type: 'REMOVE_TITLE', payload: removeData});
        handleRefresh();
    }

    useEffect(() => {
        handleRefresh();
        dispatch({type: 'GET_MECHANICS'});
        dispatch({type: 'GET_GAME_THEMES'});
    }, [])

    return(
        <div className='page-container'>
            {manageModal && 
                <ManageAddModal onClose={handleClose}/>
            }
            <h2>Collection: View</h2>
            <Button variant='contained' sx={{
                    width: 150,
                    mx: 'auto',
                    my: 1,
                    border: 1,
                    borderColor: '#575477',
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'}}}
                    onClick={(event) => setManageModal(true)}>Add New Game
            </Button>
            <div className='card-container'>
                {collection.map((game, gameIndex) => {
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
                                        Viewed: {game.viewed}<br />
                                        Played: {game.played}
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
                })}
            </div>
        </div>

    );
};

export default Manage;