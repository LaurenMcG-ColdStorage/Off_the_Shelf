import { HashRouter, Route } from "react-router-dom/cjs/react-router-dom.min";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { Slider, Box, Button } from "@mui/material";
import Link from "@mui/material";

function Recommend(){

    function valueText(value){
        return`${value}`;
    }
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
            <Link>
                <Button></Button>
            </Link>
        </div>
    )
};

export default Recommend;