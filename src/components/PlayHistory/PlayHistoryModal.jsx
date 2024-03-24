import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './PlayHistoryModal.css';

export const PlayHistoryModal = ({onClose}) => {

    const user = useSelector((state) => state.user);
    //console.log(user);
    const [sessionUpdate, setSessionUpdate] = useState({user_id: user.id, collection_id: user.collection_id, title: '', date: '', players: 1, notes: ''});
    const dispatch = useDispatch();

    const sessionSubmit = (event) => {
        event.preventDefault();
        //console.log(sessionUpdate)
        dispatch({type: 'NEW_HISTORY', payload: sessionUpdate})
        onClose();
    }

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setSessionUpdate({...sessionUpdate, date: `${today}`})
    }, [])

    return(
        <div className="modal-container">
            <div className="modal">
                <div className="header">
                    <section className="close" onClick={() => onClose()}>&times;</section>
                </div>
                <div className="content">
                    <h2> Log Your Session: </h2>
                    <label>Game Title: </label>
                    <input value={sessionUpdate.title} onChange={(event) => setSessionUpdate({...sessionUpdate, title: event.target.value})}></input><br />
                    <label>How Many Players: </label>
                    <input defaultValue={sessionUpdate.players} onChange={(event) => setSessionUpdate({...sessionUpdate, players: event.target.value})}></input><br />
                    <label>Notes: </label>
                    <input value={sessionUpdate.notes} onChange={(event) => setSessionUpdate({...sessionUpdate, notes: event.target.value})}></input>
                </div>
                <div className="footer">
                    <button className="btn-submit" onClick={(event) => sessionSubmit(event)}>Add Session</button>
                    <button className="btn-cancel" onClick={() => onCancel()}>Cancel</button>
                </div> 
            </div>
        </div>
    )
}