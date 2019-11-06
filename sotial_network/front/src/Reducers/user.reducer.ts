export default (state = {}, action: any) => {
    switch (action.type) {
        case 'GET_USER':
            console.log(action.user)
            return action.user;
        default:
            return state;
    }
};
