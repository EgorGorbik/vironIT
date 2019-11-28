export interface isLoadingAction {
    type: string;
}

export default (state: boolean = false, action: isLoadingAction) => {
    switch (action.type) {
        case 'CHANGE_TO_TRUE':
            console.log('loading ...');
            return true;
        case 'CHANGE_TO_FALSE':
            console.log('loading change to false')
            return false;
        default:
            return state;
    }
};
