import { HashRouter, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { Slider, Box, Button } from "@mui/material";

import RecPlayers from './RecPlayers/RecPlayers';
import RecTime from "./RecTime/RecTime";
import RecMech from "./RecMech/RecMech";
import RecTheme from "./RecTheme/RecTheme";

//import Link from "@mui/material/Link";

function Recommend(){
    
    const history = useHistory()
    const handleNext = (event) => {
        event.preventDefault()
        history.push('/players')
    }

    return(
        <div>
            <h2>Hey There! Wondering what to play? Let us help you!</h2>
            <Button onClick={(event) => handleNext(event)}>Get Started!</Button>
            <HashRouter>
                <Route path='/players'>
                    <RecPlayers />
                </Route>
                <Route path='/length'>
                    <RecTime />
                </Route>
                <Route path='/mechanics'>
                    <RecMech />
                </Route>
                <Route path='/theme'>
                    <RecTheme />
                </Route>
            </HashRouter>

        </div>

    )

};

export default Recommend;