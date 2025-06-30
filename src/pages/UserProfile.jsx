// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Camera, 
  Save,
  Bell,
  Shield,
  Settings,
  CheckCircle,
  AlertCircle,
  Edit2
} from 'lucide-react';

const UserProfile = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    bio: user?.bio || "Software developer passionate about creating amazing user experiences.",
    newPassword: "",
    confirmPassword: "",
    currentPassword: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false
  });

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleUpdateProfile = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      showMessage("First name and last name are required.", "error");
      return;
    }
    
    showMessage("Profile updated successfully!", "success");
    setIsEditing(false);
  };

  const handleUpdatePassword = () => {
    if (!formData.currentPassword) {
      showMessage("Current password is required.", "error");
      return;
    }
    
    if (formData.newPassword.length < 8) {
      showMessage("New password must be at least 8 characters long.", "error");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      showMessage("New passwords do not match.", "error");
      return;
    }
    
    showMessage("Password updated successfully!", "success");
    setFormData(prev => ({
      ...prev,
      newPassword: "",
      confirmPassword: "",
      currentPassword: ""
    }));
  };

  const handleUpdatePreferences = () => {
    showMessage("Preferences saved successfully!", "success");
  };

  const MessageAlert = ({ message, type }) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5" />,
      error: <AlertCircle className="w-5 h-5" />,
      info: <AlertCircle className="w-5 h-5" />
    };

    const colors = {
      success: "bg-green-50 text-green-800 border-green-200",
      error: "bg-red-50 text-red-800 border-red-200",
      info: "bg-blue-50 text-blue-800 border-blue-200"
    };

    return (
      <div className={`flex items-center gap-2 p-4 rounded-lg border ${colors[type]} mb-6`}>
        {icons[type]}
        <span>{message}</span>
      </div>
    );
  };

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const InputField = ({ label, name, type = "text", value, onChange, required = false, disabled = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
          ${disabled ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-900 dark:text-white'}
        `}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  const PasswordField = ({ label, name, value, onChange, showPassword, toggleShow, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-900 dark:text-white"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{label}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className={`rounded-xl shadow-sm p-6 mb-6 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message && <MessageAlert message={message} type={messageType} />}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <TabButton
            id="profile"
            label="Profile"
            icon={User}
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <TabButton
            id="security"
            label="Security"
            icon={Shield}
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <TabButton
            id="preferences"
            label="Preferences"
            icon={Settings}
            active={activeTab === "preferences"}
            onClick={() => setActiveTab("preferences")}
          />
        </div>

        {/* Content */}
        <div className={`rounded-xl shadow-sm p-6 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
        }`}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {formData.firstName[0]}{formData.lastName[0]}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{formData.firstName} {formData.lastName}</h3>
                  <p className="text-gray-500">{formData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditing}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-900 dark:text-white'
                  }`}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </h2>

              <div className="space-y-4">
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  showPassword={showPassword}
                  toggleShow={() => setShowPassword(!showPassword)}
                  required
                />
                <PasswordField
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  showPassword={showPassword}
                  toggleShow={() => setShowPassword(!showPassword)}
                  required
                />
                <PasswordField
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  showPassword={showConfirmPassword}
                  toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Lock className="w-4 h-4" />
                Update Password
              </button>

              <div className="pt-6 border-t">
                <ToggleSwitch
                  enabled={preferences.twoFactorAuth}
                  onChange={() => handlePreferenceChange('twoFactorAuth')}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                <ToggleSwitch
                  enabled={preferences.emailNotifications}
                  onChange={() => handlePreferenceChange('emailNotifications')}
                  label="Email Notifications"
                  description="Receive important updates via email"
                />
                <ToggleSwitch
                  enabled={preferences.pushNotifications}
                  onChange={() => handlePreferenceChange('pushNotifications')}
                  label="Push Notifications"
                  description="Get real-time notifications in your browser"
                />
                <ToggleSwitch
                  enabled={preferences.marketingEmails}
                  onChange={() => handlePreferenceChange('marketingEmails')}
                  label="Marketing Emails"
                  description="Receive news and promotional content"
                />
              </div>

              <button
                onClick={handleUpdatePreferences}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;