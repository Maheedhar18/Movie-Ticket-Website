import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const TheatreLocations = () => {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    fetch("/theatres")
      .then((res) => res.json())
      .then((data) => setTheatres(data))
      .catch((error) =>
        console.error("There was an error fetching theatres: ", error)
      );
  }, []);

  return (
    <div>
      <Header />
      <div className="title">Choose from one of our locations!</div>
      <ul>
        {theatres.map((location) => (
          <div className="theatre-tile">
            <li key={location._id}>
              <Link to={`/theatrelocations/${location._id}`}>
                {location.theatreName} - {location.city}
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TheatreLocations;
