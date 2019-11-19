export default (state = {}, action: any) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            console.log(action.messages)
            return action.messages;
        case 'SET_ERROR_MESSAGES':
            return action.error;
        default:
            return state;
    }
};
