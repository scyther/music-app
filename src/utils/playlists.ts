// import { TrackObject } from "../interfaces/search";

import { TrackObject } from "../interfaces/search";

export const updatePlaylistName = (pName: string, next: Function) => {
	let playlists = [];
	let tempPlaylists = []
	if (typeof window !== "undefined") {
		if (localStorage.getItem("playlists")) {
			tempPlaylists = JSON.parse(localStorage.getItem("playlists") || "{}");
		}
		tempPlaylists.push(pName)
		playlists = Array.from(new Set(tempPlaylists))
		localStorage.setItem("playlists", JSON.stringify(playlists));
		next();
	}
}

export const loadPlaylistNames = () => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("playlists")) {
			return JSON.parse(localStorage.getItem("playlists") || "{}");
		}
	}
};

export const loadPlaylist = (pName: string) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem(pName)) {
			return JSON.parse(localStorage.getItem(pName) || "[]");
		}
	}
};

export const deletePlaylist = (pName: string, next: Function) => {
	let playlists: string[] = [];
	if (typeof window !== "undefined") {
		if (localStorage.getItem("playlists")) {
			playlists = JSON.parse(localStorage.getItem("playlists") || "{}");
			playlists.map((playlistName: string, index: number) => {
				if (playlistName === pName) {
					playlists.splice(index, 1);
				}
				return playlists;
			});
			localStorage.setItem("playlists", JSON.stringify(playlists));
		}

		next();
	}
};

export const addToPlaylist = (pName: string, track: TrackObject | {}, next: Function) => {
	let playlist = [];
	let tempPlaylist = []
	if (typeof window !== "undefined") {
		if (localStorage.getItem(pName)) {
			tempPlaylist = JSON.parse(localStorage.getItem(pName) || "[]");
		}
		tempPlaylist.push(track)
		playlist = Array.from(new Set(tempPlaylist))
		localStorage.setItem(pName, JSON.stringify(playlist));
		next();
	}
}
