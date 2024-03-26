import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { Box }from "@mui/material";
import { FormLabel }from "@mui/material";
import { FormControl }from "@mui/material";
import { FormGroup }from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Checkbox } from "@mui/material";

import './RecMech.css';

function RecMech(){

    const history = useHistory();

    const handleNext =(event) => {
        event.preventDefault();
        history.push('/rectheme')
    };

    return(
        <div className='recmech-container'>
            <h2>Now, on to gameplay. Are you looking for Dice Rolling? Card Play? Diplomacy?</h2>
            <h6>We'd love it if you could pick three, but one will do if you're not really sure</h6>
            <p>This needs to be a whole mess of checkboxes, grab the mechanics from the server.</p>

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