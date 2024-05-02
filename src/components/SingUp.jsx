import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};
        let hasErrors = false;

        if (!formData.name) {
            errors.name = "Name is required";
            hasErrors = true;
        }

        if (!formData.username) {
            errors.username = "Username is required";
            hasErrors = true;
        }

        if (!formData.email) {
            errors.email = "Email is required";
            hasErrors = true;
        }

        if (!formData.password) {
            errors.password = "Password is required";
            hasErrors = true;
        }

        if (!formData.address) {
            errors.address = "Address is required"; // Address validation
            hasErrors = true;
        }

        if (hasErrors) {
            setFormErrors(errors);
            return;
        }

        // If no errors, submit the form
        try {
            const response = await fetch("http://localhost:5000/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            console.log("reponse: ", response);

            if (response.ok) {
                // If signup is successful, navigate to login page
                navigate("/login");
            } else {
                // Handle error responses
                const data = await response.json();
                // You can handle errors here, e.g., display error message
                console.error("Signup failed:", data.error);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {formErrors.name && (
                        <span className="error">{formErrors.name}</span>
                    )}
                </div>
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email && (
                        <span className="error">{formErrors.email}</span>
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
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {formErrors.address && (
                        <span className="error">{formErrors.address}</span>
                    )}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
