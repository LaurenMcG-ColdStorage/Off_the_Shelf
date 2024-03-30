import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Slider, Box, Button } from "@mui/material";

import './RecTime.css';

function RecTime(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [sliderValue, setSliderValue] = useState({time: 120});
    
    const handleNext =(event) => {
        event.preventDefault();
        dispatch({type: 'SET_TIME', payload: sliderValue})
        history.push('/recmechanics')
    };

    const handleSkip =(event) => {
        event.preventDefault();
        history.push('/recmechanics')
    };

    function valueText(value){
        return`${value}`;
    };

    return(
        <div className='rectime-container'>
            <h2>Would you like your game to be short and sweet, an afternoon marathon, or something in between?</h2>
            <Box sx={{width: 300,
                 mx: 'auto'}}>
                <Slider sx={{
                '& .MuiSlider-thumb': { color: '#e7822b'},
                '& .MuiSlider-track': {color: '#e7822b'},
                '& .MuiSlider-rail': {color: '#d6711a'},
                '& .MuiSlider-active': {color: '#f8933c'},
                '& .MuiSlider-mark':  {color: '#f8933c'},
                '& .MuiSlider-valueLabel': {backgroundColor: '#e7822b'}}}
                marks
                min={30}
                max={390}
                step={30}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"
                onChange={(event) => setSliderValue(event.target.value)}></Slider>
            </Box>
            <Button variant='contained' sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    mx: 1,
                    my: 2}}
            onClick={(event) => handleNext(event)}>Next</Button>
            <Button variant='contained' sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    mx: 1,
                    my: 2}}
            onClick={(event) => handleSkip(event)}>Skip This One</Button>
        </div>
    );

};

export default RecTime;