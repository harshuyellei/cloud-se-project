import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation
import "./Info.css";

const Info = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.userObj) {
            console.log("User info: ", location.state.userObj);
            setUser(location.state.userObj);
        }
    }, [location.state]);

    return (
        <div className="info-page">
            <h1>User Information</h1>
            {user ? (
                <div className="info-card">
                    <div className="info-item">
                        <strong>Name:</strong> {user.name}
                    </div>
                    <div className="info-item">
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div className="info-item">
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div className="info-item">
                        <strong>Address:</strong> {user.address}
                    </div>
                </div>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
};

export default Info;
