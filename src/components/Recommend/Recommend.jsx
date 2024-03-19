import { HashRouter, Route } from "react-router-dom/cjs/react-router-dom.min";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { Slider, Box, Button } from "@mui/material";

import RecPlayers from './RecPlayers/RecPlayers';
import RecTime from "./RecTime/RecTime";
import RecMech from "./RecMech/RecMech";

//import Link from "@mui/material/Link";

function Recommend(){
    return(
        <div>
            <h2>Hey There! Wondering what to play? Let us help you!</h2>
            <HashRouter>
                <Route>
                    <RecPlayers />
                </Route>
                <Route>
                    <RecTime />
                </Route>
                <Route>
                    <RecMech />
                </Route>
            </HashRouter>

        </div>

    )

};

export default Recommend;