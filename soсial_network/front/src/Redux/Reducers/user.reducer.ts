export default (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            console.log(action.user)
            return action.user;
        default:
            return state;
    }
};
