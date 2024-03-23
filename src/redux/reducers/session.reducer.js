const sessionHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_SESSIONS':
            return action.payload;
        case 'UNSET_SESSIONS':
            return [];
        default:
            return state;
    };
};

export default sessionHistory;