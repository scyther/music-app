import Carousel from "better-react-carousel";
import React from "react";
import { useSelector } from "react-redux";
import { Track } from "../interfaces/corousel";
import { RootState } from "../redux/store";
import TrackCard from "./TrackCard";

const SearchCarousel: React.FC<{
  name: string;
  data: Track[];
  icon?: React.ReactNode;
}> = ({ name, data, icon }) => {
  const { favourites } = useSelector((state: RootState) => state.favourites);
  return (
    <div className="container ">
      <h6 className="text-secondary text-sm-start">
        {icon && <span>{icon}</span>}
        {name}
      </h6>
      <hr />
      {data?.length === 0 ? (
        <div>Nothing to Display</div>
      ) : (
        <Carousel cols={7} rows={1} gap={10} loop>
          {data?.map((item: Track) => (
            <Carousel.Item
              key={item.key}
              style={{ height: "100px", zIndex: -1 }}
            >
              <TrackCard
                item={item}
                inFavourites={
                  favourites.find((fav) => fav.key === item.key)
                    ? true
                    : false
                }
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default SearchCarousel;
