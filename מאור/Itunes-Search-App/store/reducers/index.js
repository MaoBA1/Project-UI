import { GET_FAVORITES_ARTIST_FROM_ASYNC_STORAGE, GET_FAVORITES_SONGS_FROM_ASYNC_STORAGE } from '../actions/index';


const intialState = {
    Artists: null,
    Songs: null
}

export default (state = intialState, action) => {
    switch(action.type) {
        case GET_FAVORITES_ARTIST_FROM_ASYNC_STORAGE:
            return {
                ...state,
                Artists: action.data
            }
        case GET_FAVORITES_SONGS_FROM_ASYNC_STORAGE:
            return {
                ...state,
                Songs: action.data
            }
        default:
            return state;
    }
}