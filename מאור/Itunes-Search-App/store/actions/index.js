export const GET_FAVORITES_ARTIST_FROM_ASYNC_STORAGE = "GET_FAVORITES_ARTIST_FROM_ASYNC_STORAGE";
export const GET_FAVORITES_SONGS_FROM_ASYNC_STORAGE = "GET_FAVORITES_SONGS_FROM_ASYNC_STORAGE";


export const getAllFavoriteArtistDispatch = (data) => {
    return dispatch => {
        dispatch({ type: GET_FAVORITES_ARTIST_FROM_ASYNC_STORAGE, data: data });
    }
}

export const getAllFavoriteArtistAction = (artists) => {
    return dispatch => {
        dispatch(getAllFavoriteArtistDispatch(artists));
    }
}


export const getAllFavoriteSongsDispatch = (data) => {
    return dispatch => {
        dispatch({ type: GET_FAVORITES_SONGS_FROM_ASYNC_STORAGE, data: data });
    }
}

export const getAllFavoriteSongsAction = (songs) => {
    return dispatch => {
        dispatch(getAllFavoriteSongsDispatch(songs));
    }
}