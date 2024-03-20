import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";

function RecResult(){

    const history = useHistory();

    const handleRestart = (event) => {
        event.preventDefault();
        history.push('/recommend');
    }

    return(
        <div>
            <h2>Here are some great picks for you</h2>
            <p>Three games will be rendered here as cards.</p>
            <Button onClick={(event) => handleRestart(event)}>Back To Start</Button>
        </div>
    );
}

export default RecResult;