import * as actions from './actionTypes';
import axios from 'axios';
export const updateSearchTerm = (term) => {
    return{
        type: actions.UPDATE_SEARCH_TERM,
        payload: term,
    }
}

export const searchMovie = (term,page) => async dispatch => {
    const res = await axios({
        method:"GET",
        url:`https://api.themoviedb.org/3/search/movie?api_key=3da21d2780465f7079ade604a6669044&language=en-US&page=${page}&include_adult=false&query=${term}`,

    })
    await dispatch({
        type: actions.SEARCH_MOVIE,
        payload: res.data,
    })
}