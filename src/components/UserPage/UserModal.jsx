import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserModal.css';

export const UserModal = ({onSubmit, onCancel, onClose}) => {

    const user = useSelector((state) => state.user);
    const [userUpdate, setUserUpdate] = useState(user);
    const dispatch = useDispatch();

    const userSubmit = (event) => {
        console.log(userUpdate);
        dispatch({type: 'UPDATE_USER', payload: userUpdate})
        onClose()
    }

    return(
        <div className="modal-container">
            <div className="modal">
                <div className="header">
                    <section className="close" onClick={() => onClose()}>&times;</section>
                </div>
                <div className="content">
                    <h2> Update Profile: </h2>
                    <label>Collection: </label>
                    <input value={userUpdate.collection_id} onChange={(event) => setUserUpdate({...userUpdate, collection_id: event.target.value})}></input>
                    <label>Role: </label>
                    <select value={userUpdate.role} onChange={(event) => setUserUpdate({...userUpdate, role: event.target.value})}>
                        <option value={'Player'}>Player</option>
                        <option value={'Collector'}>Collector</option>
                    </select>
                </div>
                <div className="footer">
                    <button className="btn-submit" onClick={() => userSubmit()}>Make Changes</button>
                    <button className="btn-cancel" onClick={() => onCancel()}>Cancel</button>
                </div> 
            </div>
        </div>
    )
}