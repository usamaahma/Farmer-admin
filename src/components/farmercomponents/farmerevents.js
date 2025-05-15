import React, { useState } from "react";
import "./farmerevents.css";
import { event } from "../../utils/axios";

function Farmerevents({ events }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    email: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddEvent = async () => {
    try {
      const newEvent = {
        ...formData,
        farmerId: user.id,
      };
      await event.post("/", newEvent);
      alert("Event added successfully!");
      setShowModal(false);
      window.location.reload(); // or use state to refresh
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="farmer-events-container">
      <div className="events-header">
        <h2>Events</h2>
        <button className="add-event-btn" onClick={() => setShowModal(true)}>
          + Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.eventName}</td>
                <td>{event.location}</td>
                <td>{event.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Event</h3>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button onClick={handleAddEvent}>Submit</button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Farmerevents;
