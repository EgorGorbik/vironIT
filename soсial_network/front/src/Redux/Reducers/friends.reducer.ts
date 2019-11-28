export default (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_FRIENDS':
            console.log(action.friends)
            return action.friends;
        case 'SET_ERROR_FRIENDS':
            return action.error;
        default:
            return state;
    }
};
