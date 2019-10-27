const CHANGE_TO_TRUE = "CHANGE_TO_TRUE";
const CHANGE_TO_FALSE = "CHANGE_TO_FALSE";

export default (state = false, action: { type: string; }) => {
    switch (action.type) {
        case CHANGE_TO_TRUE:
            return true;
        case CHANGE_TO_FALSE:
            return false;
        default:
            return state;
    }
};
