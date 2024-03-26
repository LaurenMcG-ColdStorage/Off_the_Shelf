import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";

import './Recommend.css';

function Recommend(){

    const history = useHistory();

    const handleNext = (event) => {
        event.preventDefault()
        history.push('/recplayers');
    }

    return(
        <div className='recstart-page'>
            <h2>Hey there, wondering what to play? Let us help!</h2>
            <Button variant='contained' sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}} 
            onClick={(event) => handleNext(event)}>Get Started!</Button>
        </div>

    )

};

export default Recommend;