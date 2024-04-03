import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* getRecommendations(action){

    try {
        const findRecs = action.payload;
        let fullCollection = [];
        console.log('GET RECS PAYLOAD: ', findRecs);

        const recsResponse = yield axios.get(`/api/recommend/${findRecs.collection_id}`);
        console.log('RECS RESPONSE: ', recsResponse.data);
        fullCollection = recsResponse.data
        
        let filteredRecs = fullCollection.filter(game => (game.player_count >= findRecs.players && 
            (game.mech1_id == findRecs.mech1 || game.mech2_id == findRecs.mech1 || game.mech3_id == findRecs.mech1)));
        console.log('FILTERED RECS BASIC: ', filteredRecs);
        
        if (findRecs.time != undefined) {
            filteredRecs = filteredRecs.filter(game => game.play_time <= findRecs.time);
            console.log("FILTERED RECS TIME: ", filteredRecs);
        };

        if (findRecs.mech2 != undefined) {
            filteredRecs = filteredRecs.filter(game => 
                (game.mech1_id == findRecs.mech2 || game.mech2_id == findRecs.mech2 || game.mech3_id == findRecs.mech2));
            console.log("FILTERED RECS MECH2: ", filteredRecs);
        };

        if (findRecs.mech3 != undefined) {
            filteredRecs = filteredRecs.filter(game => 
                (game.mech1_id == findRecs.mech3 || game.mech2_id == findRecs.mech3 || game.mech3_id == findRecs.mech3));
                console.log("FILTERED RECS MECH3: ", filteredRecs);
        };

        if (findRecs.theme != undefined) {
            filteredRecs = filteredRecs.filter(game => game.theme_id == findRecs.theme);
            console.log("FILTERED RECS THEME: ", filteredRecs);
        };

        if (filteredRecs.length < 1) {
            filteredRecs = fullCollection.filter(game => (game.player_count >= findRecs.players && 
                (game.mech1_id == findRecs.mech1 || game.mech2_id == findRecs.mech1 || game.mech3_id == findRecs.mech1)));
                console.log('FILTERED RECS BASIC: ', filteredRecs);
            
            if (findRecs.time != undefined) {
                filteredRecs = filteredRecs.filter(game => game.play_time <= findRecs.time);
                console.log("FILTERED RECS TIME: ", filteredRecs);
            };
    
            if (findRecs.mech2 != undefined) {
                filteredRecs = filteredRecs.filter(game => 
                    (game.mech1_id == findRecs.mech2 || game.mech2_id == findRecs.mech2 || game.mech3_id == findRecs.mech2));
                    console.log("FILTERED RECS MECH2: ", filteredRecs);
            };
            if (findRecs.theme != undefined) {
                filteredRecs = filteredRecs.filter(game => game.theme_id == findRecs.theme);
                console.log("FILTERED RECS THEME: ", filteredRecs);
            };

            if (filteredRecs.length < 1) {
                filteredRecs = fullCollection.filter(game => (game.player_count >= findRecs.players && 
                    (game.mech1_id == findRecs.mech1 || game.mech2_id == findRecs.mech1 || game.mech3_id == findRecs.mech1)));
                    console.log('FILTERED RECS BASIC: ', filteredRecs);
                
                if (findRecs.time != undefined) {
                    filteredRecs = filteredRecs.filter(game => game.play_time <= findRecs.time);
                    console.log("FILTERED RECS TIME: ", filteredRecs);
                };
        
                if (findRecs.theme != undefined) {
                    filteredRecs = filteredRecs.filter(game => game.theme_id == findRecs.theme);
                    console.log("FILTERED RECS THEME: ", filteredRecs);
                };

                    if (filteredRecs.length < 1) {
                        filteredRecs = fullCollection.filter(game => (game.player_count >= findRecs.players && 
                            (game.mech1_id == findRecs.mech1 || game.mech2_id == findRecs.mech1 || game.mech3_id == findRecs.mech1)));
                            console.log('FILTERED RECS BASIC: ', filteredRecs);
                        
                        if (findRecs.time != undefined) {
                            filteredRecs = filteredRecs.filter(game => game.play_time <= findRecs.time);
                            console.log("FILTERED RECS TIME: ", filteredRecs);
                        };
                        
                            if (filteredRecs.length < 1) {
                                filteredRecs = fullCollection.filter(game => (game.player_count >= findRecs.players && 
                                    (game.mech1_id == findRecs.mech1 || game.mech2_id == findRecs.mech1 || game.mech3_id == findRecs.mech1)));
                                    console.log('FILTERED RECS BASIC: ', filteredRecs);
                            };
                    };
            };
        };

        if (filteredRecs.length > 3) {
            filteredRecs = filteredRecs.slice(0,2);
        };

        yield put({ type: 'SET_RECOMMENDATION', payload: filteredRecs});
        yield put({type: 'UPDATE_VIEWS', payload: filteredRecs})
    } catch (error) {
        console.log("Can't get recs")
    }
}

function* updateSaga(action){
    try{
    const updateViews = action.payload;
    console.log('UPDATE CANDIDATES: ', updateViews);
    yield axios.put('/api/collection', updateViews)
    } catch (error) {
        console.log('Error updating game views')
    }
}

function* recSaga(){
    yield takeEvery('FIND_RECS', getRecommendations);
    yield takeEvery('UPDATE_VIEWS', updateSaga);
};

export default recSaga;