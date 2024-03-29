import { Box, Button, Slider } from '@mui/material';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import './RecPlayers.css';

function RecPlayers(){
    
    const history = useHistory();
    const dispatch = useDispatch();
    const [sliderValue, setSliderValue] = useState({players:''});
    
    const handleNext = (event) => {
        event.preventDefault();
        dispatch({type: 'SET_PLAYERS', payload: sliderValue});
        history.push('/reclength');
    }

    function valueText(value){
        return`${value}`;
    };

    return(
        <div className='recplayers-container'>
            <h2>Let's start with an easy question, how many players are in your game today?</h2>
            <Box sx={{width: 300,
                    mx: 'auto'
                    }}>
                <Slider sx={{
                '& .MuiSlider-thumb': { color: '#e7822b'},
                '& .MuiSlider-track': {color: '#e7822b'},
                '& .MuiSlider-rail': {color: '#d6711a'},
                '& .MuiSlider-active': {color: '#f8933c'},
                '& .MuiSlider-mark':  {color: '#f8933c'},
                '& .MuiSlider-valueLabel': {backgroundColor: '#e7822b'}}}
                marks
                min={1}
                max={8}
                step={1}
                defaultValue={3}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"
                onChange={(event) => setSliderValue(event.target.value)}
                ></Slider>
            </Box>
            <Button variant='contained' sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}}
            onClick={(event) => handleNext(event)}>Next!</Button>
        </div>
    );
};

export default RecPlayers;