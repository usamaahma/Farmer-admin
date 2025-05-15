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
      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    try {
      await event.delete(`/${id}`);
      alert("Event deleted!");
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete.");
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((eventItem) => (
              <tr key={eventItem._id}>
                <td>{eventItem.eventName}</td>
                <td>{eventItem.location}</td>
                <td>{eventItem.email}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(eventItem.id)}
                  >
                    Delete
                  </button>
                </td>
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
