import React, { useState } from 'react';

const AddAdminForm = ({ onSave }) => {
    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const adminDetails = {
            adminName,
            email,
            contactNumber,
            password,
        };

        onSave(adminDetails);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', backgroundColor: '#333', color: '#fff' }}>
            <h2>Add Admin Details</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>Admin Name</label>
                <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Contact Number</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Create Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => handleSubmit()} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Save</button>
                <button onClick={() => alert('Canceled')} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>Cancel</button>
            </div>
        </div>
    );
};

export default AddAdminForm;
