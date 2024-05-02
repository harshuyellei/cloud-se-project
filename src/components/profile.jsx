import React, { useState } from "react";
import profImg from "./profilePic.jpeg";

const ProfilePage = () => {
  // State variables to manage user input for name and description
  const [name, setName] = useState("Y. Harshini");
  const [description, setDescription] = useState("Meet Harshini, a tech enthusiast whose love for solving puzzles led her to a career in technology. With a background in Computer Science, she's not just any software developer; she's a creator who sees potential where others see problems. Harshini's journey in tech has been marked by her curiosity and drive to make things better, one code line at a time.");
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Function to handle input change for name
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle input change for description
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  return (
    <div
      className=""
      style={{ height: "100vh", width: "100vw" }}
    >
      

      <div className="container h-auto mt-5 d-flex justify-content-center align-items-center">
        <div className="col-9 border border-1 rounded shadow-lg py-5 bg-white">
          <h1 className="text-center mb-4">Profile</h1>
          <div className="justify-content-center mx-4 d-flex flex-row align-items-center justify-content-evenly">
            <div>
              <label htmlFor="profile-photo">
                {profilePhoto ? (
                  <img src={URL.createObjectURL(profilePhoto)} alt={profImg} style={{width: "130px", height: "130px", borderRadius:"10px"}}/>
                  ) : (
                    <img src={profImg} alt="{profImg}" style={{width: "130px", height: "130px", borderRadius:"10px"}}/>
                    )}
              </label><br />
              <input
                type="file"
                placeholder="Profile"
                className="btn btn-sm btn-primary col-10 mt-3"
                id="profile-photo"
                accept="image/*"
                // style={{ display: 'none' }}
                onChange={handleFileChange}
                />
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control border border-black"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control border border-black"
                  id="description"
                  rows="6"
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
