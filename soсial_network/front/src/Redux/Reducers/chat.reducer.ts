export default (state = [], action: any) => {
    console.log('chat reducer!!! ', action)
    switch (action.type) {
        case 'SET_MESSAGES':
            console.log(action.messages)
            return [...action.messages, ...state];
        case 'SET_MESSAGE':
            console.log(action.message)
            return [...state, action.message];
        case 'SET_ERROR_MESSAGES':
            return action.error;
        case 'DEL_MESSAGES':
            console.log('dele')
            return state;
        default:
            return state;
    }
};
