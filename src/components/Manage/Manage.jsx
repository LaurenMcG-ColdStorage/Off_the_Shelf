import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

function Manage(){

    const dispatch = useDispatch();
    //This local state will store all of the data for a new game
    const [game, setGame] = useState({
        title: '', 
        player_count: '', 
        play_time: '',
        mech1_id: '',
        mech2_id: '',
        mech3_id: '',
        theme_id: '',
        image: ''})

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({type: 'ADD_GAME_COLLECTION', payload: game})
    }

    return(
        <div>
            <h2>Add A Game To Your Collection!</h2>
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
            <button onClick={(event) => handleSubmit(event)}>Add To Collection</button>
        </div>

    );
};

export default Manage;