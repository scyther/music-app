import { TrackObject } from "../interfaces/search";

export const addToFavourites = (item: TrackObject, next: Function) => {
    let favourites: TrackObject[] = [];
    let tempfavourites : TrackObject[]= []
    if (typeof window !== "undefined") {
        if (localStorage.getItem("favourites")) {
            tempfavourites = JSON.parse(localStorage.getItem("favourites") || "{}");
        }
        tempfavourites.push({ ...item });
        favourites = Array.from(new Set(tempfavourites))
        localStorage.setItem("favourites", JSON.stringify(favourites));
        next();
    }
}


export const removeFromFavourites = (key : string, next: Function) => {
	let favourites : TrackObject[]= [];
	if (typeof window !== "undefined") {
		if (localStorage.getItem("favourites")) {
			favourites = JSON.parse(localStorage.getItem("favourites") || "{}");
			favourites.map((product : TrackObject, index : number) => {
				if (product.track.key === key) {
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
			return JSON.parse(localStorage.getItem("favourites") || "{}");
		}
	}
};