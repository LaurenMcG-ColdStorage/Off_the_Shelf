import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/material';
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";

import './RecTheme.css';

function RecTheme(){

    const history = useHistory();
    const dispatch = useDispatch();

    const themes = useSelector((store) => store.selectables.themeReducer);
    const recRequest = useSelector((store) => store.recs.recRequest);
    const [pickTheme, setPickTheme] = useState('');

    const handleTheme = (event) => {
        dispatch({type: 'SET_THEME', payload: pickTheme});
    }
    
    const handleRec = (event) => {
        dispatch({type: 'FIND_RECS', payload: recRequest});
    }

    const handleComplete = (event) => {
        event.preventDefault();
        handleTheme();
        handleRec();
        history.push('/recresult');
    };

    return(
        <div className='rectheme-container'>
            <h2>Ok, we've got the questions out of the way. Now for the big one. What kind of theme are you feeling?</h2>
            <FormControl sx={{
                    m:2, 
                    width: 200,
                    display: 'inline-flex'}}>
                <InputLabel id='themeLabel'
                    sx={{color: '#f2f2f2',}}>Theme</InputLabel>
                    <Select labelId='themeLabel'
                        id='theme'
                        variant='outlined'
                        sx={{color: '#f2f2f2',
                            borderColor: '#464366',
                            backgroundColor: '#464366',
                            '&:selected': {backgroundColor: '#464366'} }}
                        value={pickTheme}
                        onChange={(event) => setPickTheme(event.target.value)}>
                            {themes.map((theme, themeIndex) => {
                                return(
                                    <MenuItem
                                    key={themeIndex}
                                    value={theme.id}
                                    sx={{color:'#f2f2f2',
                                        backgroundColor: '#464366',
                                        '&:selected': {backgroundColor: '#e7822b'}}}>{theme.name}</MenuItem>
                                )
                            })}
                    </Select>
            </FormControl>
            {/* <select value={pickTheme} onChange={(event) => setPickTheme(event.target.value)}>
                <option>---Select A Theme---</option>
                {themes.map((type) => {
                    return(
                        <option key={type.id} value={type.id} >{type.name}</option>
                    )
                })}
            </select> */}
            <div>
                <Button  
                    variant='contained' 
                    sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}}
                    onClick={(event) => {handleComplete(event)}}>On To Results!</Button>
            </div>
        </div>
    );
};

export default RecTheme;