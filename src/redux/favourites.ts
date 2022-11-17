import { createSlice } from '@reduxjs/toolkit'
import { TrackObject } from '../interfaces/search'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Favourites {
    reload: Boolean,
    favourites: TrackObject[] | []
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
            console.log(state.reload)
            state.reload = !action.payload
        },
        setFavourites: (state, action: PayloadAction<TrackObject[]>) => {
            state.favourites = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleReload, setFavourites } = favouritesSlice.actions

export default favouritesSlice.reducer