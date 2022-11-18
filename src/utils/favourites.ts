import { Track } from "../interfaces/corousel";
import { TrackObject } from "../interfaces/search";

export const addToFavourites = (item: Track, next: Function) => {
    let favourites: Track[] = [];
    let tempfavourites : Track[]= []
    if (typeof window !== "undefined") {
        if (localStorage.getItem("favourites")) {
            tempfavourites = JSON.parse(localStorage.getItem("favourites") || "{}");
        }
        tempfavourites.push(item);
        favourites = Array.from(new Set(tempfavourites))
        localStorage.setItem("favourites", JSON.stringify(favourites));
        next();
    }
}


export const removeFromFavourites = (key : string, next: Function) => {
	let favourites : Track[]= [];
	if (typeof window !== "undefined") {
		if (localStorage.getItem("favourites")) {
			favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
			favourites.map((product : Track, index : number) => {
				if (product.key === key) {
					favourites.splice(index, 1);
				}
				return favourites;
			});
			localStorage.setItem("favourites", JSON.stringify(favourites));
		}

		next();
	}
};

export const loadFavourites = () => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("favourites")) {
			return JSON.parse(localStorage.getItem("favourites") || "[]");
		}
		return []
	}
};