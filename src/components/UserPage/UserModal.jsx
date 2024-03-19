import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserModal.css';

export const UserModal = ({onSubmit, onCancel, onClose}) => {

    const user = useSelector((state) => state.user);
    //console.log(user);
    let [userUpdate, setUserUpdate] = useState({id: user.id, collection: '', role: ''});
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
                    <label>Collection: </label>
                    <input value={userUpdate.collection} onChange={(event) => setUserUpdate({...userUpdate, collection: event.target.value})}></input>
                    <label>Role: </label>
                    <select defaultValue={'Player'} onChange={(event) => setUserUpdate({...userUpdate, role: event.target.value})}>
                        <option value='Player'>Player</option>
                        <option value='Collector'>Collector</option>
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