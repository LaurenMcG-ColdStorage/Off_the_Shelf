import { useState } from "react";
import { ManageAddModal } from "./ManageAddModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";

import './Manage.css';

function Manage(){

    const user = useSelector((store) => store.user.collection_id);
    const collection = useSelector((store) => store.collection);
    const dispatch = useDispatch();
    const [manageModal, setManageModal] = useState(false);

    const handleClose = () => {
        setManageModal(false);
    };

    const handleRemoveFromCollection = (game) => {
        const removeData = {collection_id: user, game_id: game.game_id};
        dispatch({type: 'REMOVE_TITLE', payload: removeData})
        dispatch({type: 'GRAB_COLLECTION', payload: removeData})
    }

    return(
        <div>
            {manageModal && 
                <ManageAddModal onClose={handleClose}/>
            }
            <h2>Collection: View</h2>
            <button onClick={(event) => setManageModal(true)}>Add New Game</button>
            {collection.map((game, gameIndex) => {
                return(
                    <div key={gameIndex}>
                        <h5>{game.title}</h5>
                        <img className='manage_img' src={game.image}></img>
                        <aside>Viewed: </aside>
                        <aside>Played: </aside>
                        <button onClick={(event) => handleRemoveFromCollection(game)}>Remove</button>
                    </div>
                )
            })}
        </div>

    );
};

export default Manage;