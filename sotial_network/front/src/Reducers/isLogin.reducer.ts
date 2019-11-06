export default (state: boolean = false, action: any) => {
    switch (action.type) {
        case 'CHANGE_ISLOGIN_TO_TRUE':
            return true;
        case 'CHANGE_ISLOGIN_TO_FALSE':
            return false;
        default:
            return state;
    }
};
