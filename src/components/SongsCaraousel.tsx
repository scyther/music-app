import React from "react";
import Carousel from "better-react-carousel";

import { useQuery } from "@tanstack/react-query";
import { RootObject, Track } from "../interfaces/corousel";

const SongsCaraousel: React.FC<{ listID: string; name: string }> = ({
  listID,
  name,
}) => {
  const getData = async (listID: string): Promise<RootObject> => {
    const url = `https://shazam.p.rapidapi.com/charts/track?locale=en-US&listId=${listID}&pageSize=20&startFrom=0`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bb4173c120msh87cb799569535a3p148898jsnc54327087f5d",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["tracks", listID],
    queryFn: () => getData(listID),
  });
  if (isLoading) {
    return <div className="container p-4">Loading..</div>;
  }
  return (
    <div className="container p-4 ">
      <h6 className="text-secondary text-sm-start">{name}</h6>
      <hr />
      <Carousel cols={7} rows={1} gap={10} loop >
        {data?.tracks.map((track: Track) => (
          <Carousel.Item key={track.key} style={{height: '100px'}}>
            <img width="100%" src={track.images.coverart} alt={track.key} />
            <p>{track.title}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SongsCaraousel;
