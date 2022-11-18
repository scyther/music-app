import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Track } from '../interfaces/corousel'

export interface Playlists {
    reloader: Boolean
    selectedTrack: Track | undefined
    pNames: string[]
    playlistData : {string : Track[] | undefined} | undefined
}

const initialState: Playlists = {
    reloader: false,
    selectedTrack: undefined,
    pNames: [""],
    playlistData : undefined
}

export const PlaylistsSlice = createSlice({
    name: 'Playlists',
    initialState,
    reducers: {
        toggleReload: (state, action: PayloadAction<Boolean>) => {
            state.reloader = !action.payload
        },
        setSelectedTrack: (state, action: PayloadAction<Track | undefined>) => {
            state.selectedTrack = action.payload
        },
        setPNames: (state, action: PayloadAction<string[]>) => {
            state.pNames = action.payload
        },
        setPlaylistsData: (state, action: PayloadAction<{string : Track[] | undefined}>) => {
            state.playlistData = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleReload, setSelectedTrack, setPNames,setPlaylistsData } = PlaylistsSlice.actions

export default PlaylistsSlice.reducer