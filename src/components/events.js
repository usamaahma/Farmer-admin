import React, { useEffect, useState } from 'react';
import { event, users } from '../utils/axios';
import './events.css';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch events data and corresponding farmer data
    const fetchEvents = async () => {
        try {
            const res = await event.get('/');
            const allEvents = res.data.results;

            // Get unique farmer IDs
            const farmerIds = [...new Set(allEvents.map(e => e.farmerId))];

            // Fetch all farmers by IDs (in parallel)
            const farmerData = await Promise.all(
                farmerIds.map(async (id) => {
                    const res = await users.get(`/${id}`);
                    return { id, name: res.data.name };
                })
            );

            // Create a mapping of farmer IDs to their names
            const idToName = {};
            farmerData.forEach(f => {
                idToName[f.id] = f.name;
            });

            // Map events with their respective farmer names
            const eventsWithNames = allEvents.map(event => ({
                ...event,
                farmerName: idToName[event.farmerId] || 'Unknown',
            }));

            setEvents(eventsWithNames);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setLoading(false);
        }
    };

    // Call fetchEvents when the component is mounted
    useEffect(() => {
        fetchEvents();
    }, []);

    // Delete handler for events
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await event.delete(`/${id}`);
            setEvents(prev => prev.filter(e => e._id !== id)); // Remove the deleted event from state
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div className="events-table-container">
            <h2>All Events</h2>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Farmer</th>
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event._id}>
                            <td>{event.eventName}</td>
                            <td>{event.location}</td>
                            <td>{event.email}</td>
                            <td>{event.farmerName}</td>
                            <td>
                                {/* Delete button for each event */}
                                <button className="delete-btn" onClick={() => handleDelete(event._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Events;
