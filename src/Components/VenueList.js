import React, { useEffect, useState } from "react";
import { getAllVenues, deleteVenue } from "../api/venues";

export default function VenueList() {
  const [venues, setVenues] = useState([]);

  const load = () => getAllVenues().then(res => setVenues(res.data));
  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Venues</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Type</th><th>Capacity</th><th>Price/Day</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {venues.map(v => (
            <tr key={v.venueId}>
              <td>{v.venueId}</td>
              <td>{v.name}</td>
              <td>{v.type}</td>
              <td>{v.capacity}</td>
              <td>{v.pricePerDay}</td>
              <td>
                <button onClick={() => deleteVenue(v.venueId).then(load)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
