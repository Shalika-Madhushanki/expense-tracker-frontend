import React from "react";
import PageHeader from "../components/PageHeader";
import user from "./../assets/profile.png";

const ProfilePage: React.FC = () => {
  return (
    <>
      <PageHeader headerText="Profile" />
      <div className="profile-card">
        <div className="profile-header">
          <img src={user} alt="Profile" className="profile-image" />
          <h2 className="profile-name">John Doe</h2>
        </div>
        <div className="contact-info">
          <p>
            <strong>Phone: </strong> +5999-661-6161
          </p>
          <p>
            <strong>Mail: </strong> john@gmail.com
          </p>
        </div>
        <div className="settings">
          <div className="setting-option">
            <span>🌙 Color theme</span>
          </div>
          <div className="setting-option">
            <span>💳 Cards</span>
          </div>
          <div className="setting-option">
            <span>👤 Profile details</span>
          </div>
          <div className="setting-option">
            <span>⚙️ Settings</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
