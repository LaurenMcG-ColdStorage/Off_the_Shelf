import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState} from 'react';
import { Button } from '@mui/material';
import { Slider } from '@mui/material';


import './ManageAddModal.css';

export const ManageAddModal = ({onClose}) => {
    
    const user = useSelector((store) => store.user);
    const mechanicsList = useSelector((store) => store.selectables.mechanicReducer);
    const themes = useSelector((store) => store.selectables.themeReducer);
    const dispatch = useDispatch();
    //This local state will store all of the data for a new game
    const [game, setGame] = useState({
        title: '', 
        players: [],
        play_time: [],
        description: '',
        theme_id: 0,
        image: '',
        mechs: [],
        active_collection: user.active_collection
    });
    const[mechanic, setMechanic] = useState([0, 0, 0]);

    function valueText(value){
        return`${value}`;
    };

    const handleChangeMechanic = (event, index) => {
        const nextMechanics = mechanic.map((mech, ind) => {
            if (ind === index) {
                return mech = event.target.value;
            } else {
                return mech;
            }
        });
        setMechanic(nextMechanics);
    };
    
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
                        <tr className='row'>
                            <td className='column'><label>Title</label></td>
                            <td className='column'><input value={game.title} onChange={(event) => setGame({...game, title: event.target.value})}></input></td>
                            <td className='column'><label>Theme</label></td>
                            <td className='column'><select value={game.theme_id} onChange={(event) => setGame({...game, theme_id: event.target.value})}>
                            {themes.map((theme) => {
                                    return (
                                        <option key={theme.id} value={theme.id}>{theme.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr className='row'>
                            <td className='column'><label>Players</label></td>
                            <td className='column'>
                                <Slider sx={{
                                    '& .MuiSlider-thumb': { color: '#e7822b'},
                                    '& .MuiSlider-track': {color: '#e7822b'},
                                    '& .MuiSlider-rail': {color: '#d6711a'},
                                    '& .MuiSlider-active': {color: '#f8933c'},
                                    '& .MuiSlider-mark':  {color: '#f8933c'},
                                    '& .MuiSlider-valueLabel': {backgroundColor: '#e7822b'}}}
                                    marks
                                    min={1}
                                    max={10}
                                    step={1}
                                    defaultValue={[1, 5]}
                                    getAriaValueText={valueText}
                                    valueLabelDisplay="auto"
                                    onChange={(event) => setGame({...game, players: event.target.value})}
                                    >
                                </Slider>
                            </td>
                            <td className='column'><label>First Mechanic</label></td>
                            <td className='column'><select value={mechanic[0]} onChange={(event) => handleChangeMechanic(event.target.value, 0)}>
                                {mechanicsList.map((mech1) => {
                                    return (
                                        <option key={mech1.id} value={mech1.id}>{mech1.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr className='row'>
                            <td className='column'><label>Play Time</label></td>
                            <td className='column'>
                                <Slider sx={{
                                    '& .MuiSlider-thumb': { color: '#e7822b'},
                                    '& .MuiSlider-track': {color: '#e7822b'},
                                    '& .MuiSlider-rail': {color: '#d6711a'},
                                    '& .MuiSlider-active': {color: '#f8933c'},
                                    '& .MuiSlider-mark':  {color: '#f8933c'},
                                    '& .MuiSlider-valueLabel': {backgroundColor: '#e7822b'}}}
                                    marks
                                    min={30}
                                    max={300}
                                    step={30}
                                    defaultValue={[30, 120]}
                                    getAriaValueText={valueText}
                                    valueLabelDisplay="auto"
                                    onChange={(event) => setGame({...game, play_time: event.target.value})}
                                    >
                                </Slider>
                            </td>
                            <td className='column'><label>Second Mechanic</label></td>
                            <td className='column'><select value={mechanic[1]} onChange={(event) => handleChangeMechanic(event.target.value, 1)}>
                                {mechanicsList.map((mech2) => {
                                    return (
                                        <option key={mech2.id} value={mech2.id}>{mech2.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr className='row'>
                            <td className='column'><label>Description</label></td>
                            <td className='column'><input value={game.description} onChange={(event) => setGame({...game, description: event.target.value})}></input></td>
                            <td className='column'><label>Third Mechanic</label></td>
                            <td className='column'><select value={mechanic[2]} onChange={(event) => handleChangeMechanic(event.target.value, 2)}>
                                {mechanicsList.map((mech3) => {
                                    return (
                                        <option key={mech3.id} value={mech3.id}>{mech3.name}</option>
                                    )
                                })}
                                </select>
                            </td>
                        </tr>
                        <tr className='row'>
                            <td className='column'><label>Image</label></td>
                            <td className='column'><input value={game.image} onChange={(event) => setGame({...game, image: event.target.value})}></input></td>
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