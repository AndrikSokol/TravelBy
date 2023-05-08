import React from "react";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = React.useState([]);
  React.useEffect(() => {
    async function fetchPlaces() {
      try {
        const { data } = await axios.get("/places-all");
        setPlaces(data);
      } catch (error) {}
    }
    fetchPlaces();
  }, []);

  return (
    <div className="w-[90%] my-5 mx-auto grid  gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div
            className="shadow-xl cursor-pointer hover:shadow-2xl transition-shadow hover:scale-[101%] "
            key={place._id}
          >
            <div>
              {place.photos.length > 0 && (
                <div>
                  <img
                    className="object-cover w-full h-64 rounded-t-lg"
                    src={"http://localhost:4500/uploads/" + place.photos[0]}
                    alt=""
                  />
                </div>
              )}

              <div className="p-2">
                <div className="text-xl font-bold">{place.title}</div>
                <div className="text-sm text-gray-500">{place.address}</div>
                <div className="text-md">
                  <span className="font-bold">{place.price}</span>$ per night
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
