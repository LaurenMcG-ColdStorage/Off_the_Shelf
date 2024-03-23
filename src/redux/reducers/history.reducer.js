const gameHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_HISTORY':
            return action.payload;
        case 'UNSET_HISTORY':
            return [];
        default:
            return state;
    };
};

export default gameHistory;