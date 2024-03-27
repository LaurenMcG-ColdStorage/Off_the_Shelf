import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

import './RecMech.css';

function RecMech(){

    const history = useHistory();
    const dispatch = useDispatch();
    const mechanics = useSelector((store) => store.selectables.mechanicReducer);
    const [mechBoxOne, setMechBoxOne] = useState({});
    const [mechBoxTwo, setMechBoxTwo] = useState({});
    const [mechBoxThree, setMechBoxThree] = useState({});

    const handleNext =(event) => {
        event.preventDefault();
        history.push('/rectheme')
    };

    return(
        <div className='recmech-container'>
            <h2>Now, on to gameplay. Are you looking for Dice Rolling? Card Play? Diplomacy?</h2>
            <select value={mechBoxOne} onChange={(event) => setMechBoxOne(event.target.value)} required>
                {mechanics.map((mech) => {
                    return(
                        <option key={mech.id} value={mech.id} >{mech.name}</option>
                    )
                })}
            </select>
            <select value={mechBoxTwo} onChange={(event) => setMechBoxTwo(event.target.value)}>
                {mechanics.map((mech) => {
                        return(
                            <option key={mech.id} value={mech.id} >{mech.name}</option>
                        )
                    })}
            </select>
            <select value={mechBoxThree} onChange={(event) => setMechBoxThree(event.target.value)}>
                {mechanics.map((mech) => {
                        return(
                            <option key={mech.id} value={mech.id} >{mech.name}</option>
                        )
                    })}
            </select>
            <Button 
            variant='contained' sx={{
                backgroundColor: '#464366',
                '&:hover':{backgroundColor: '#e7822b'},
                my: 2}}
                onClick={(event) => handleNext(event)}>Next</Button>
        </div>
    );
};

export default RecMech;