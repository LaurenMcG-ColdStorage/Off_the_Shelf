import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Select } from '@mui/material';

function RecTheme(){

    const history = useHistory();

    const handleComplete = (event) => {
        event.preventDefault();
        history.push('/recresult');
    };

    return(
        <div>
            <h2>Ok, we've got the questions out of the way. Now for the big one. What kind of theme are you feeling?</h2>
            <p>Grab our themes from the database and map them into a select here.</p>
            <Button onClick={(event) => {handleComplete(event)}}>On To Results!</Button>
        </div>
    );
};

export default RecTheme;