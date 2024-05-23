import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState} from 'react';
import { Button } from '@mui/material';

import './ManageAddModal.css';

export const ManageAddModal = ({onClose}) => {
    
    const user = useSelector((store) => store.user);
    const mechanics = useSelector((store) => store.selectables.mechanicReducer);
    const themes = useSelector((store) => store.selectables.themeReducer);
    const dispatch = useDispatch();
    //This local state will store all of the data for a new game
    const [game, setGame] = useState({
        title: '', 
        min_players: 0, 
        max_players: 0,
        min_play_time: 0,
        max_play_time: 0,
        description: 0,
        theme_id: 0,
        image: '',
        active_collection: user.active_collection
    });
    const[mechanic, setMechanic] = useState([])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setGame({...game, mechs: mechanic})
        dispatch({type: 'ADD_GAME_COLLECTION', payload: game})
        onClose(event);
    }

    return(
        <div className="modal-container">
            <div className='modal'>
                <div className='header'>
                    <section className="close" onClick={() => onClose()}>&times;</section>
                    <h2>Add A Game To Your Collection!</h2>
                </div>
                <table className='content'>
                    <tbody>
                        <tr>
                            <td><label>Title</label></td>
                            <td><input value={game.title} onChange={(event) => setGame({...game, title: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>Min Players</label></td>
                            <td><input value={game.min_players} onChange={(event) => setGame({...game, min_players: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>Max Players</label></td>
                            <td><input value={game.max_players} onChange={(event) => setGame({...game, max_players: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>First Mechanic</label></td>
                            <td><select value={mechanic[0]} onChange={(event) => setMechanic(...mechanic, event.target.value)}>
                                {mechanics.map((mech1) => {
                                    return (
                                        <option key={mech1.id} value={mech1.id}>{mech1.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Second Mechanic</label></td>
                            <td><select value={mechanic[1]} onChange={(event) => setMechanic(...mechanic, event.target.value)}>
                                {mechanics.map((mech2) => {
                                    return (
                                        <option key={mech2.id} value={mech2.id}>{mech2.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Third Mechanic</label></td>
                            <td><select value={mechanic[2]} onChange={(event) => setMechanic(...mechanic, event.target.value)}>
                                {mechanics.map((mech3) => {
                                    return (
                                        <option key={mech3.id} value={mech3.id}>{mech3.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Theme</label></td>
                            <td><select value={game.theme_id} onChange={(event) => setGame({...game, theme_id: event.target.value})}>
                            {themes.map((theme) => {
                                    return (
                                        <option key={theme.id} value={theme.id}>{theme.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Image</label></td>
                            <td><input value={game.image} onChange={(event) => setGame({...game, image: event.target.value})}></input></td>
                        </tr>
                    </tbody>
                </table>
                <div className='footer'>
                    <Button variant='contained' sx={{
                        width: 160,
                        mx: 1,
                        my: 1,
                        border: 1,
                        borderColor: '#a34007',
                        backgroundColor: '#c56009',
                        '&:hover':{backgroundColor: '#e7822b'}}}
                        onClick={(event) => handleSubmit(event)}>Add Game</Button>
                    <Button variant='contained' sx={{
                        width: 160,
                        mx: 1,
                        my: 1,
                        border: 1,
                        borderColor: '#a34007',
                        backgroundColor: '#c56009',
                        '&:hover':{backgroundColor: '#e7822b'}}}
                        onClick={() => onClose()}>Cancel</Button>
                </div>
            </div>
        </div>
    
    );

}