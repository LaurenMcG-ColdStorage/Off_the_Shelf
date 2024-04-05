import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";

import './RecMech.css';

function RecMech(){

    const history = useHistory();
    const dispatch = useDispatch();
    const mechanics = useSelector((store) => store.selectables.mechanicReducer);
    const [mechBoxOne, setMechBoxOne] = useState('');
    const [mechBoxTwo, setMechBoxTwo] = useState('');
    const [mechBoxThree, setMechBoxThree] = useState('');

    const handleNext =(event) => {
        event.preventDefault();
        if (mechBoxOne != '') {
            dispatch({type: 'SET_MECH1', payload: mechBoxOne});
            dispatch({type: 'SET_MECH2', payload: mechBoxTwo});
            dispatch({type: 'SET_MECH3', payload: mechBoxThree});
            history.push('/rectheme')
        }
    };

    return(
        <div className='recmech-container'>
            <h2>Now, on to gameplay. Are you looking for Dice Rolling? Card Play? Diplomacy?</h2>
                <FormControl sx={{
                    m:2, 
                    width: 200,
                    display: 'inline-flex'}}>
                    <InputLabel id='mech1Label'
                    sx={{color: '#f2f2f2',}}>First Mechanic - Required</InputLabel>
                    <Select labelId='mech1Label'
                        id='mech1'
                        variant='outlined'
                        sx={{color: '#f2f2f2',
                            borderColor: '#464366',
                            backgroundColor: '#464366',
                            '&:selected': {backgroundColor: '#464366'} }}
                        value={mechBoxOne}
                        onChange={(event) => setMechBoxOne(event.target.value)}>
                            {mechanics.map((mech, mechIndex) => {
                                return(
                                    <MenuItem
                                    key={mechIndex}
                                    value={mech.id}
                                    sx={{color:'#f2f2f2',
                                        backgroundColor: '#464366',
                                        '&:selected': {backgroundColor: '#e7822b'}}}>{mech.name}</MenuItem>
                                )
                            })}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    m:2, 
                    width: 200,
                    display: 'inline-flex'}}>
                    <InputLabel id='mech2Label'
                    sx={{color: '#f2f2f2',}}>Second Mechanic</InputLabel>
                    <Select labelId='mech2Label'
                        id='mech2'
                        sx={{color: '#f2f2f2',
                            borderColor: '#464366',
                            backgroundColor: '#464366'}}
                        value={mechBoxTwo}
                        onChange={(event) => setMechBoxTwo(event.target.value)}>
                            {mechanics.map((mech, mechIndex) => {
                                return(
                                    <MenuItem
                                    key={mechIndex}
                                    value={mech.id}
                                    sx={{color:'#f2f2f2',
                                        backgroundColor: '#464366'}}>{mech.name}</MenuItem>
                                )
                            })}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    m:2, 
                    width: 200,
                    color: '#f2f2f2',
                    display: 'inline-flex'}}>
                    <InputLabel id='mech3Label'
                    sx={{color: '#f2f2f2',}}>Third Mechanic</InputLabel>
                    <Select labelId='mech3Label'
                        id='mech3'
                        sx={{color: '#f2f2f2',
                            borderColor: '#464366',
                            backgroundColor: '#464366'}}
                        value={mechBoxThree}
                        onChange={(event) => setMechBoxThree(event.target.value)}>
                            {mechanics.map((mech, mechIndex) => {
                                return(
                                    <MenuItem
                                    key={mechIndex}
                                    value={mech.id}
                                    sx={{color:'#f2f2f2',
                                        backgroundColor: '#464366'}}>{mech.name}</MenuItem>
                                )
                            })}
                    </Select>
                </FormControl>
            
            <div>
                <Button 
                    variant='contained' 
                    sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}}
                    onClick={(event) => handleNext(event)}>Next</Button>
            </div>
        </div>
    );
};

export default RecMech;