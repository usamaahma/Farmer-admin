import React, { useEffect, useState } from 'react';
import { crop, users } from '../utils/axios';
import './crops.css';

function Crops() {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch crops data and corresponding farmer data
    const fetchCrops = async () => {
        try {
            const res = await crop.get('/');
            const allCrops = res.data.results;

            // Get unique farmer IDs
            const farmerIds = [...new Set(allCrops.map(c => c.postedBy))];

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

            // Map crops with their respective farmer names
            const cropsWithNames = allCrops.map(crop => ({
                ...crop,
                farmerName: idToName[crop.postedBy] || 'Unknown',
            }));

            setCrops(cropsWithNames);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch crops:', error);
            setLoading(false);
        }
    };

    // Call fetchCrops when the component is mounted
    useEffect(() => {
        fetchCrops();
    }, []);

    // Delete handler for crops
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this crop?")) return;

        try {
            await crop.delete(`/${id}`);
            setCrops(prev => prev.filter(c => c._id !== id)); // Remove the deleted crop from state
        } catch (error) {
            console.error("Failed to delete crop:", error);
        }
    };

    if (loading) return <p>Loading crops...</p>;

    return (
        <div className="crops-table-container">
            <h2>All Crops</h2>
            <table className="crops-table">
                <thead>
                    <tr>
                        <th>Crop Name</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Details</th>
                        <th>Farmer</th>
                        <th>Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {crops.map(crop => (
                        <tr key={crop._id}>
                            <td>{crop.name}</td>
                            <td>{crop.price}</td>
                            <td>{crop.inStock ? 'Yes' : 'No'}</td>
                            <td>{crop.details || '-'}</td>
                            <td>{crop.farmerName}</td>
                            <td>
                                {/* Delete button for each crop */}
                                <button className="delete-btn" onClick={() => handleDelete(crop._id)}>
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

export default Crops;
