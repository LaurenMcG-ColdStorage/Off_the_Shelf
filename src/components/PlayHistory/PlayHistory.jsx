import React from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import './PlayHistory.css';
import { PlayHistoryModal } from './PlayHistoryModal';

function PlayHistory(){

    const dispatch = useDispatch();
    const sessionHistory = useSelector((store) => store.sessionHistory);
    const [modalActive, setModalActive] = useState(false);

    const handleClose = () => {
        setModalActive(false);
    };

    const handleAdd = () => {
        setModalActive(true);
    }

    return(
        <div>
            {modalActive && 
                <PlayHistoryModal onClose={handleClose()} />
            }
            <h2>This is the Play History Page</h2>
            <button onClick={() => handleAdd()}>Enter Play Session</button>
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
               })};
            </tbody>
        </table>
        </div>

    )
}

export default PlayHistory;