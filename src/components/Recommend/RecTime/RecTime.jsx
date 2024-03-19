import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Slider, Box, Button } from "@mui/material";

function RecTime(){

    const history = useHistory();
    
    const handleNext =(event) => {
        event.preventDefault();
        history.push('/recmechanics')
    };

    function valueText(value){
        return`${value}`;
    };
    
    return(
        <div>
            <h2>Would you like your game to be short and sweet, an afternoon marathon, or something in between?</h2>
            <Box sx={{width: 300}}>
                <Slider 
                marks
                min={30}
                max={400}
                step={30}
                defaultValue={120}
                getAriaValueText={valueText}
                valueLabelDisplay="auto"></Slider>
            </Box>
            <Button onClick={(event) => handleNext}>Next</Button>
        </div>
    );

};

export default RecTime;