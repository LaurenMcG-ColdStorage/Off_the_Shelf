import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

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
                    <table>
                        <tr>
                            <td><label>Game Title: </label></td>
                            <td><input value={sessionUpdate.title} onChange={(event) => setSessionUpdate({...sessionUpdate, title: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>How Many Players: </label></td>
                            <td><input defaultValue={sessionUpdate.players} onChange={(event) => setSessionUpdate({...sessionUpdate, players: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>Notes: </label></td>
                            <td><input value={sessionUpdate.notes} onChange={(event) => setSessionUpdate({...sessionUpdate, notes: event.target.value})}></input></td>
                        </tr>    
                    </table>
                </div>
                <div className="footer">
                    <Button variant='contained' sx={{
                        width: 160,
                        mx: 1,
                        my: 1,
                        border: 1,
                        borderColor: '#a34007',
                        backgroundColor: '#c56009',
                        '&:hover':{backgroundColor: '#e7822b'}}}
                        className="btn-submit" onClick={(event) => sessionSubmit(event)}>Add Session</Button>
                    <Button variant='contained' sx={{
                        width: 160,
                        mx: 1,
                        my: 1,
                        border: 1,
                        borderColor: '#a34007',
                        backgroundColor: '#c56009',
                        '&:hover':{backgroundColor: '#e7822b'}}}
                        className="btn-cancel" onClick={() => onCancel()}>Cancel</Button>
                </div> 
            </div>
        </div>
    )
}