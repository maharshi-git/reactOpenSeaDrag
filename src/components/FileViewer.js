import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FileViewer = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [people] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ]);

  const handleItemClick = () => {
    // Navigate to /about when a list item is clicked
    // You need to set up React Router for this navigation to work
    // Example: <Link to="/about">About</Link>
    // This assumes you have React Router set up in your application
  };

  return (
    <div className="container">
      <div className="mt-3">
        <h2>Select a Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
        />
      </div>
      <h2>People</h2>
      <ul className="list-group">
        {people.map((person) => (
          <Link to={`/about/${person.id}`}>
            
            <li
              key={person.id}
              className="list-group-item"
              onClick={handleItemClick}
            >
                <p>{person.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FileViewer;
