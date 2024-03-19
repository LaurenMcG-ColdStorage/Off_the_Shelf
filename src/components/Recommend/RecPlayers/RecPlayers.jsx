import {Box, Button, Slider} from '@mui/material';

function RecPlayers(){
    
    function valueText(value){
        return`${value}`;
    };

    return(
        <div>
            <h2>This is the Recommend Page</h2><br />
            <h3>Let's start with an easy question, how many players are in your game today?</h3>
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
        </div>
    );
};

export default RecPlayers;