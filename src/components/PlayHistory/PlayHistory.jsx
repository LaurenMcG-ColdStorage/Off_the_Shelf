import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { PlayHistoryModal } from './PlayHistoryModal';

import './PlayHistory.css';

function PlayHistory(){

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.id);
    const gameHistory = useSelector((state) => state.gameHistory);
    const [modalActive, setModalActive] = useState(false);

    const handleClose = () => {
        setModalActive(false);
    };

    useEffect(() => {
        dispatch({type: 'GET_HISTORY', payload: user})
    }, [])

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
                    <th>Date</th>
                    <th>Players</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
               {gameHistory.map((session, sessionIndex) => {
                return(
                    <tr key={sessionIndex}>
                        <td>{session.title}</td>
                        <td>{(new Date(session.date)).toLocaleDateString()}</td>
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