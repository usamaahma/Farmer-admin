import { useState } from "react";
import "./landing.css";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: "home", label: "Dashboard", icon: "🏠" },
    { id: "farmers", label: "Farmers", icon: "👨‍🌾" },
    { id: "products", label: "Products", icon: "🌽" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="tab-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Farmers</h3>
                <p>1,245</p>
              </div>
              <div className="stat-card">
                <h3>Active Products</h3>
                <p>568</p>
              </div>
              <div className="stat-card">
                <h3>Pending Orders</h3>
                <p>42</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <p>7</p>
              </div>
            </div>
          </div>
        );
      case "farmers":
        return (
          <div className="tab-content">
            <h2>Farmers Management</h2>
            <p>List of all registered farmers will appear here</p>
          </div>
        );
      case "products":
        return (
          <div className="tab-content">
            <h2>Products Management</h2>
            <p>All agricultural products will be listed here</p>
          </div>
        );
      case "events":
        return (
          <div className="tab-content">
            <h2>Events Calendar</h2>
            <p>Upcoming farming events and workshops</p>
          </div>
        );
      case "orders":
        return (
          <div className="tab-content">
            <h2>Order Management</h2>
            <p>Recent orders from customers</p>
          </div>
        );
      case "analytics":
        return (
          <div className="tab-content">
            <h2>System Analytics</h2>
            <p>Charts and statistics about platform usage</p>
          </div>
        );
      case "settings":
        return (
          <div className="tab-content">
            <h2>System Settings</h2>
            <p>Configuration options for the admin portal</p>
          </div>
        );
      default:
        return <div className="tab-content">Select a section to begin</div>;
    }
  };

  return (
    <div
      className={`admin-portal ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>FarmConnect</h2>
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <span className="user-avatar">👤</span>
            {sidebarOpen && (
              <>
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="content-header">
          <h1>
            {navItems.find((item) => item.id === activeTab)?.label ||
              "Dashboard"}
          </h1>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="profile-btn">👤</button>
          </div>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;