import Carousel from "better-react-carousel";
import React from "react";
import { TrackObject } from "../interfaces/search";
import TrackCard from "./TrackCard";

const SearchCarousel: React.FC<{
  name: string;
  data: TrackObject[];
  icon?: React.ReactNode;
}> = ({ name, data, icon }) => {
  return (
    <div className="container p-4 ">
      <h6 className="text-secondary text-sm-start">
        {icon && <span>{icon}</span>}
        {name}
      </h6>
      <hr />
      <Carousel cols={7} rows={1} gap={10} loop mobileBreakpoint={10}>
        {data?.map((item: TrackObject) => (
          <Carousel.Item
            key={item.track.key}
            style={{ height: "100px", zIndex: -1 }}
          >
            <TrackCard item={item} inFavourites={name === 'Favourites'} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SearchCarousel;
