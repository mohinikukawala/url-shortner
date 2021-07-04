import {configureStore,createSlice} from '@reduxjs/toolkit';

const initialState = {
    urls : {}
}

export const shortUrlSlice = createSlice({
    name:'shortUrlSlice',
    initialState,
    reducers: {
        updateUrls(state,action) {
            const newUrl = action.payload;
            state.urls = {
                ...state.urls,
                ...newUrl
            }
        }
    }
})

const store = configureStore({
    reducer: {shortUrl : shortUrlSlice.reducer}
})

export default store;
export const shortUrlActions = shortUrlSlice.actions;