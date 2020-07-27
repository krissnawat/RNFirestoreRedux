import { ITEM_FETCHING, ITEM_FAILED, ITEM_SUCCESS } from "../constant";
const initialState = {
    isFetching: false,
    isError: false,
    result: null,
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ITEM_FETCHING:
            return { ...state, isFetching: true, isError: false, result: null };
        case ITEM_FAILED:
            return { ...state, isFetching: false, isError: true, result: null };
        case ITEM_SUCCESS:
            return { ...state, isFetching: false, isError: false, result: payload };
        default:
            return state;
    }
};