import * as actions from '../action/movieAction/actionTypes';

const initialState = {
    dataInfo: "",
    searchTerm: ''
}

export default function movieReducer(state=initialState, action) {
    const {type, payload}= action;
    switch(type) {
        case actions.UPDATE_SEARCH_TERM: return {...state, searchTerm: payload};
        case actions.SEARCH_MOVIE: return {...state, dataInfo: payload};
        default: return state;
    }
}