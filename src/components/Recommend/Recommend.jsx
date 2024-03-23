import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Slider, Box, Button } from "@mui/material";

//import Link from "@mui/material/Link";

function Recommend(){

    const dispatch = useDispatch();
    const history = useHistory();

    const handleNext = (event) => {
        event.preventDefault()
        history.push('/recplayers');
    }

    return(
        <div>
            <h2>Hey There! Wondering what to play? Let us help you!</h2>
            <Button onClick={(event) => handleNext(event)}>Get Started!</Button>
        </div>

    )

};

export default Recommend;