import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import './PlayHistory.css';
import { PlayHistoryModal } from './PlayHistoryModal';

function PlayHistory(){

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.id);
    const sessionHistory = useSelector((state) => state.sessionHistory);
    const [modalActive, setModalActive] = useState(false);

    const handleClose = () => {
        setModalActive(false);
    };

    useEffect(() => {
        dispatch({type: 'GET_SESSIONS', payload: {user_id: user}})
    })
    return(
        <div>
            {modalActive && 
                <PlayHistoryModal onClose={handleClose} />
            }
            <h2>This is the Play History Page</h2>
            <button onClick={(event) => setModalActive(true)}>Add New Play Session</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Players</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
               {sessionHistory.map((session, sessionIndex) => {
                return(
                    <tr key={sessionIndex}>
                        <td>{session.title}</td>
                        <td>{session.players}</td>
                        <td>{session.notes}</td>
                    </tr>
                )
               })}
            </tbody>
        </table>
        </div>

    )
}

export default PlayHistory;