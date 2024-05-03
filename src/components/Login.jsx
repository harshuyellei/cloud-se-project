import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // State for form errors
    const [formErrors, setFormErrors] = useState({
        username: "",
        password: "",
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple form validation
        let errors = {};
        let hasErrors = false;

        if (!formData.username) {
            errors.username = "Username is required";
            hasErrors = true;
        }

        if (!formData.password) {
            errors.password = "Password is required";
            hasErrors = true;
        }

        if (hasErrors) {
            setFormErrors(errors);
            return;
        }

        // If no errors, submit the form
        try {
            const response = await fetch(
                "http://ec2-34-207-208-240.compute-1.amazonaws.com:5000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                // If login is successful, parse response and navigate to info page with id
                const data = await response.json();
                // const userId = data.userId;
                const userObj = data.user;
                console.log("userObj: ", userObj);
                // navigate("/info", { state: { userObj } });
                navigate("/info", { state: { userObj: userObj } });
                // navigate("/info");
            } else {
                // Handle error responses
                const data = await response.json();
                // You can handle errors here, e.g., display error message
                console.error("Login failed:", data.error);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    {formErrors.username && (
                        <span className="error">{formErrors.username}</span>
                    )}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formErrors.password && (
                        <span className="error">{formErrors.password}</span>
                    )}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
