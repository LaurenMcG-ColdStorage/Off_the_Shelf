import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import './UserModal.css';

export const UserModal = ({onSubmit, onCancel, onClose}) => {

    const user = useSelector((state) => state.user);
    //console.log(user);
    const [userUpdate, setUserUpdate] = useState({id: user.id, collection: '', role: 'Player'});
    const dispatch = useDispatch();

    const userSubmit = () => {
        //console.log(userUpdate);
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        onSubmit();
    }

    return(
        <div className="modal-container">
            <div className="modal">
                <div className="header">
                    <section className="close" onClick={() => onClose()}>&times;</section>
                </div>
                <div className="content">
                    <h2> Update Profile: </h2>
                    <table>
                        <tr>
                            <td><label>Collection: </label></td>
                            <td><input value={userUpdate.collection} onChange={(event) => setUserUpdate({...userUpdate, collection: event.target.value})}></input></td>
                        </tr>
                        <tr>
                            <td><label>Role: </label></td>
                            <td><select value={userUpdate.role} onChange={(event) => setUserUpdate({...userUpdate, role: event.target.value})}>
                                <option value='Player'>Player</option>
                                <option value='Collector'>Collector</option>
                            </select></td>
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
                        className="btn-submit" onClick={() => userSubmit()}>Make Changes</Button>
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