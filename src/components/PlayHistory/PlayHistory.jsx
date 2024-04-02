import React from 'react';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { PlayHistoryModal } from './PlayHistoryModal';
import { Table } from '@mui/material';
import { TableHead }from '@mui/material';
import { TableBody }from '@mui/material';
import { TableRow }from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';

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
        <div className='history-container'>
            {modalActive && 
                <PlayHistoryModal onClose={handleClose} />
            }
            <h2>This Is Your Play History</h2>
            <p>Log your games here! </p>
            <Button variant='contained' sx={{
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'},
                    my: 2}}
                    onClick={(event) => setModalActive(true)}>Add New Play Session</Button>
        <TableContainer component={Paper} 
                        sx={{ 
                        width: '80%',
                        maxWidth: 900, 
                        mx: 'auto',
                        backgroundColor: '#686588',
                         }}>
            <Table sx={{minWidth: 600, 
                        maxWidth: 900,
                        border: 2,
                        borderColor: '#797699' }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={{color: '#f2f2f2'}}>Title</TableCell>
                        <TableCell align='center' sx={{color: '#f2f2f2'}}>Date</TableCell>
                        <TableCell align='center' sx={{color: '#f2f2f2'}}>Players</TableCell>
                        <TableCell align='center' sx={{color: '#f2f2f2'}}>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {gameHistory.map((session, sessionIndex) => {
                    return(
                        <TableRow key={sessionIndex} >
                            <TableCell align='center' sx={{color: '#f2f2f2'}}>{session.title}</TableCell>
                            <TableCell align='center' sx={{color: '#f2f2f2'}}>{(new Date(session.date)).toLocaleDateString()}</TableCell>
                            <TableCell align='center' sx={{color: '#f2f2f2'}}>{session.players}</TableCell>
                            <TableCell align='center' sx={{color: '#f2f2f2'}}>{session.notes}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>

    )
}

export default PlayHistory;