import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TrackObject } from '../interfaces/search'

export interface Playlists {
    reload: Boolean
    selectedTrack: TrackObject | {}
    pNames: string[]
}

const initialState: Playlists = {
    reload: false,
    selectedTrack: {},
    pNames: []

}

export const PlaylistsSlice = createSlice({
    name: 'Playlists',
    initialState,
    reducers: {
        toggleReload: (state, action: PayloadAction<Boolean>) => {
            state.reload = !action.payload
        },
        setSelectedTrack: (state, action: PayloadAction<TrackObject
            | {}>) => {
            state.selectedTrack = action.payload
        },
        setPNames: (state, action: PayloadAction<string[]>) => {
            state.pNames = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleReload, setSelectedTrack, setPNames } = PlaylistsSlice.actions

export default PlaylistsSlice.reducer