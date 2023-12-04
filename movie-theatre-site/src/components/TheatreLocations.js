import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

const TheatreLocations = () => {
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    fetch("/theatres")
      .then((res) => res.json())
      .then((data) => setTheatres(data))
      .catch((error) =>
        console.error("There was an error fetching theatres: ", error)
      );
  }, []);

  const handleDelete = async (theatreId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        const response = await fetch(`/theatres/${theatreId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTheatres(theatres.filter((theatre) => theatre._id !== theatreId));
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error("There was an error deleting the movie:", error);
        alert("There was an error deleting the movie.");
      }
    }
  };

  const handleUpdate = (theatreId) => {
    navigate(`/update-theatre/${theatreId}`);
  };

  const handleShowScreens = (theatreId) => {
    navigate(`/screens/${theatreId}`);
  };

  return (
    <div>
      <div className="hero"><h1>Locations</h1></div>
      <ul>
        {theatres.map((location) => (
          <div className="theatre-tile">
            <li key={location._id}>
              <Link to={`/theatrelocations/${location._id}`}>
                {location.theatreName} - <i>{location.city}</i>
              </Link>
              {auth.isAuthenticated && auth.role === 'admin' && (
              <div className="admin-controls">
              <button onClick={() => handleShowScreens(location._id)}>Show Screens</button>
              <button onClick={() => handleUpdate(location._id)}>Update</button>
              <button onClick={() => handleDelete(location._id)}>Delete</button>
              </div>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TheatreLocations;
