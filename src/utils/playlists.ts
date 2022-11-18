// import { TrackObject } from "../interfaces/search";

import { Track } from "../interfaces/corousel";

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
			const pNames = JSON.parse(localStorage.getItem("playlists") || "[]");
			return [...pNames,]
		}
	}
	return []
};

export const loadPlaylist = (pName: string) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem(pName)) {
			let playlist = JSON.parse(localStorage.getItem(pName) || "[]");
			return playlist
		}
	}
};

export const deletePlaylist = (pName: string, next: Function) => {
	let playlists: string[] = [];
	if (typeof window !== "undefined") {
		if (localStorage.getItem(pName)) {
			localStorage.removeItem(pName)
		}
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

export const addToPlaylist = (pName: string, track: Track | undefined, next: Function) => {
	let playlist = [];
	let tempPlaylist = []
	if (typeof window !== "undefined") {
		if (localStorage.getItem(pName)) {
			tempPlaylist = JSON.parse(localStorage.getItem(pName) || "[]");
		}
		console.log((tempPlaylist.find((item: Track) => (item.key === track?.key)) === undefined) ? tempPlaylist.push(track) : tempPlaylist)
		playlist = (tempPlaylist.find((item: Track) => (item.key === track?.key)) === undefined) ? tempPlaylist.push(track) : tempPlaylist
		localStorage.setItem(pName, JSON.stringify(playlist));
		next();
	}
}
