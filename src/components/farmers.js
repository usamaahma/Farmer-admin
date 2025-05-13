import React, { useEffect, useState } from 'react';
import { users } from '../utils/axios';
import './farmers.css';

function Farmers() {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await users.get('/');
            const allUsers = res.data.results;
            const onlyFarmers = allUsers.filter(user => user.role === 'farmer');
            setFarmers(onlyFarmers);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this farmer?")) return;

        try {
            await users.delete(`/${id}`);
            setFarmers(prev => prev.filter(farmer => farmer._id !== id));
        } catch (error) {
            console.error('Failed to delete farmer:', error);
        }
    };

    if (loading) return <p>Loading farmers...</p>;

    return (
        <div className="farmers-table-container">
            <h2>All Farmers</h2>
            <table className="farmers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Experience</th>
                        <th>Main Crops</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farmers.map(farmer => (
                        <tr key={farmer._id}>
                            <td>{farmer.name}</td>
                            <td>{farmer.email}</td>
                            <td>{farmer.farmer?.location || '-'}</td>
                            <td>{farmer.farmer?.experience || '-'} yrs</td>
                            <td>{farmer.farmer?.mainCrops?.join(', ') || '-'}</td>
                            <td>{farmer.farmer?.contact || '-'}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(farmer._id)}>
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

export default Farmers;
