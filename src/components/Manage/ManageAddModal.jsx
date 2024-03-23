import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './ManageAddModal.css';

export const ManageAddModal = ({onClose}) => {
    
    const user = useSelector((store) => store.user.collection_id)
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
                    <h2>Add A Game To Your Collection!</h2>
                    <section className="close" onClick={() => onClose()}>&times;</section>
                </div>
                <div className='content'>
                    <label>Title</label>
                    <input value={game.title} onChange={(event) => setGame({...game, title: event.target.value})}></input><br />
                    <label>Player Count</label>
                    <input value={game.player_count} onChange={(event) => setGame({...game, player_count: event.target.value})}></input><br />
                    <label>Play Time</label>
                    <input value={game.play_time} onChange={(event) => setGame({...game, play_time: event.target.value})}></input><br />
                    <label>First Mechanic</label>
                    <input value={game.mech1_id} onChange={(event) => setGame({...game, mech1_id: event.target.value})}></input><br />
                    <label>Second Mechanic</label>
                    <input value={game.mech2_id} onChange={(event) => setGame({...game, mech2_id: event.target.value})}></input><br />
                    <label>Third Mechanic</label>
                    <input value={game.mech3_id} onChange={(event) => setGame({...game, mech3_id: event.target.value})}></input><br />
                    <label>Theme</label>
                    <input value={game.theme_id} onChange={(event) => setGame({...game, theme_id: event.target.value})}></input><br />
                    <label>Image</label>
                    <input value={game.image} onChange={(event) => setGame({...game, image: event.target.value})}></input><br />
                </div>
                <div className='footer'>
                    <button onClick={(event) => handleSubmit(event)}>Add To Collection</button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
    
    );

}