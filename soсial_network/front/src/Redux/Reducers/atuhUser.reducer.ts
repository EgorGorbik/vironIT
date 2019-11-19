export default (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_AUTH_USER':
            console.log(action.user)
            return action.user;
        case 'SET_ERROR_AUTH_USER':
            return action.error;
        default:
            return state;
    }
};
