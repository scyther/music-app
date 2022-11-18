import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Track } from '../interfaces/corousel'

export interface Favourites {
    reload: Boolean,
    favourites: Track[] | []
}

const initialState: Favourites = {
    reload: false,
    favourites: []
}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleReload: (state, action: PayloadAction<Boolean>) => {
            state.reload = !action.payload
        },
        setFavourites: (state, action: PayloadAction<Track[]>) => {
            state.favourites = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleReload, setFavourites } = favouritesSlice.actions

export default favouritesSlice.reducer