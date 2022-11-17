import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { autoComplete, search } from "../api/search";
import SearchCarousel from "../components/SearchCarousel";

export interface hint {
  id?: number;
  term: string;
}

export interface hints {
  hints: hint[];
}
const Search: React.FC = () => {
  const [hints, setHints] = useState<hint[]>([]);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [searchedArtists, setsearchedArtists] = useState([]);
  console.log(searchedTracks);
  console.log(searchedArtists);
  console.log(hints);
  const handleOnSearch = async (string: string) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setHints(await autoComplete(string));
    // console.log(string, results);
  };

  const handleOnSelect = async (item: hint) => {
    let { tracks, artists } = await search(item.term);
    // the item selected
    setSearchedTracks(tracks);
    setsearchedArtists(artists);
  };

  return (
    <div
      className="container"
      style={{
        overflow: "auto",
        minHeight: "-webkit-fill-available",
        maxHeight: "100%",
        paddingTop: "30px",
        paddingRight: "auto",
      }}
    >
      <div style={{ width: 400, display: "block", margin: "0px auto" }}>
        <ReactSearchAutocomplete
          items={hints}
          fuseOptions={{ keys: ["term"] }}
          resultStringKeyName="term"
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          autoFocus
          styling={{ zIndex: 9 }}
        />
      </div>
      {searchedTracks.length !== 0 && (
        <>
          <h4 className="mt-10">Search Results: </h4>
          <div>
            <SearchCarousel name="Tracks" data={searchedTracks} />
          </div>

          {!searchedArtists && (
            <SearchCarousel name="Artists" data={searchedTracks} />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
