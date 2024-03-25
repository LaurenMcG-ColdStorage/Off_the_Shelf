import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import './ManageAddModal.css';

export const ManageAddModal = ({onClose}) => {
    
    const user = useSelector((store) => store.user.collection_id);
    const mechanics = useSelector((store) => store.selectables.mechanicReducer);
    const themes = useSelector((store) => store.selectables.themeReducer);
    const dispatch = useDispatch();
    //This local state will store all of the data for a new game
    const [game, setGame] = useState({
        title: '', 
        player_count: 0, 
        play_time: 0,
        mech1_id: 0,
        mech2_id: 0,
        mech3_id: 0,
        theme_id: 0,
        image: '',
        collection_id: user})
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({type: 'ADD_GAME_COLLECTION', payload: game})
        onClose();
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
                            <td><label>Player Count</label></td>
                            <td><input value={game.player_count} onChange={(event) => setGame({...game, player_count: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>Play Time</label></td>
                            <td><input value={game.play_time} onChange={(event) => setGame({...game, play_time: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>First Mechanic</label></td>
                            <td><select value={game.mech1_id} onChange={(event) => setGame({...game, mech1_id: event.target.value})}>
                                {mechanics.map((mech1) => {
                                    return (
                                        <option value={mech1.id}>{mech1.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Second Mechanic</label></td>
                            <td><select value={game.mech2_id} onChange={(event) => setGame({...game, mech2_id: event.target.value})}>
                                {mechanics.map((mech2) => {
                                    return (
                                        <option value={mech2.id}>{mech2.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Third Mechanic</label></td>
                            <td><select value={game.mech3_id} onChange={(event) => setGame({...game, mech3_id: event.target.value})}>
                                {mechanics.map((mech3) => {
                                    return (
                                        <option value={mech3.id}>{mech3.name}</option>
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
                                        <option value={theme.id}>{theme.name}</option>
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
                    <button onClick={(event) => handleSubmit(event)}>Add To Collection</button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
    
    );

}