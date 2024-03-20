import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@mui/material";

function RecMech(){

    const history = useHistory();

    const handleNext =(event) => {
        event.preventDefault();
        history.push('/rectheme')
    };

    return(
        <div>
            <h2>Now on to the gameplay. Are you looking for Dice Rolling? Card Play? Diplomacy?</h2>
            <h6>We'd love it if you could pick three, but one will do if you're not really sure</h6>
            <p>This needs to be a whole mess of checkboxes, grab the mechanics from the server.</p>
            <Button onClick={(event) => handleNext(event)}>Next</Button>
        </div>
    );
};

export default RecMech;