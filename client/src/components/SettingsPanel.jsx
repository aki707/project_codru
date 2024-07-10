import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPanel.css";
import { Dialog, DialogContent, Alert, Snackbar } from "@mui/material";

const navigate = useNavigate();
const username = localStorage.getItem("Username");
const [alertMessage, setAlertMessage] = useState("");
const [alertSeverity, setAlertSeverity] = useState("info");
  const [showAlert, setShowAlert] = useState(false);
const role = localStorage.getItem("Role");

const GeneralSettings = () => (
  <div>
    <h3>General Settings</h3>
    <div className="form-group">
      <label htmlFor="theme">Theme</label>
      <select id="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
);

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username:username,
          currentPassword:currentPassword,
          newPassword:newPassword
        })
      });

      if (response.ok) {
        setMessage('Password changed successfully');
      } else {
        setMessage('Error changing password');
      }
    } catch (error) {
      setMessage('Error changing password');
    }
  };

  const handleDeleteAccount = async (id, username, role) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/user/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAlertMessage("User deleted successfully");
      setAlertSeverity("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlertMessage("Failed to delete user");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <h3>Account Settings</h3>
      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
      {message && <p>{message}</p>}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={waitingAlert}
        autoHideDuration={6000}
        onClose={() => setWaitingAlert(false)}
      >
        <Alert
          onClose={() => setWaitingAlert(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Please wait...
        </Alert>
      </Snackbar>
    </div>
  );
};

const NotificationSettings = () => (
  <div>
    <h3>Notification Settings</h3>
    <div className="form-group">
      <label htmlFor="notifications">Enable Notifications</label>
      <input type="checkbox" id="notifications" />
    </div>
  </div>
);

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'account':
        return <AccountSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="settings-panel">
      <h2>Settings</h2>
      <ul className="tabs">
        <li className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
          General
        </li>
        <li className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>
          Account
        </li>
        <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
          Notifications
        </li>
      </ul>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPanel;
