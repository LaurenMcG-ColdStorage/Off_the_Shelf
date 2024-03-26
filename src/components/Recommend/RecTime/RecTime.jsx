import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Slider, Box, Button } from "@mui/material";

import './RecTime.css';

function RecTime(){

    const history = useHistory();
    
    const handleNext =(event) => {
        event.preventDefault();
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
                <Slider 
                marks
                min={30}
                max={390}
                step={30}
                defaultValue={120}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"></Slider>
            </Box>
            <Button onClick={(event) => handleNext(event)}>Next</Button>
            <Button onClick={(event) => handleSkip(event)}>Skip This One</Button>
        </div>
    );

};

export default RecTime;