import {Box, Button, Slider} from '@mui/material';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RecPlayers(){
    
    const history = useHistory();
    
    const handleNext = (event) => {
        event.preventDefault()
        history.push('/reclength');
    }

    function valueText(value){
        return`${value}`;
    };

    return(
        <div>
            <h2>Let's start with an easy question, how many players are in your game today?</h2>
            <Box sx={{width: 300}}>
                <Slider 
                marks
                min={1}
                max={8}
                step={1}
                defaultValue={3}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"></Slider>
            </Box>
            <Button onClick={(event) => handleNext(event)}>Next!</Button>
        </div>
    );
};

export default RecPlayers;