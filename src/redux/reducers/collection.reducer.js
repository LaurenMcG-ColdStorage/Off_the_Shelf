const collectionReducer = (state = [], action) => {
   //console.log('Payload data: ', action.payload);
    switch (action.type) {
        case 'SET_COLLECTION':
            return action.payload;
        case 'UNSET_COLLECTION':
            return [];
        default:
            return state;
    }
}

export default collectionReducer;