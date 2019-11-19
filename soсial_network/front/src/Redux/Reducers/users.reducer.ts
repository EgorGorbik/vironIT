export default (state = [], action: any) => {
    switch (action.type) {
        case 'SET_USERS':
            console.log('action.users ', action.users)
            return action.users;
        default:
            return state;
    }
};
