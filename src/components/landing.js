import { useState, useEffect } from "react";
import "./landing.css";
import Farmers from "./farmers";
import Crops from "./crops";
import Events from "./events";
import { users, crop, event, orders } from "../utils/axios";
import Orders from "./orders";

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalFarmers: 0,
    activeProducts: 0,
    upcomingEvents: 0,
    pendingOrders: 0,
  });

  const navItems = [
    { id: "home", label: "Dashboard", icon: "🏠" },
    { id: "farmers", label: "Farmers", icon: "👨‍🌾" },
    { id: "products", label: "Products", icon: "🌽" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "orders", label: "Orders", icon: "📦" },
  ];

  // Fetch data for dashboard
  const fetchDashboardData = async () => {
    try {
      const farmersRes = await users.get("/");
      const productsRes = await crop.get("/");
      const eventsRes = await event.get("/");
      const ordersRes = await orders.get("/");

      const totalFarmers = farmersRes.data.results.filter(
        (farmer) => farmer.role === "farmer"
      ).length;

      // Simply get the total count of orders
      const totalOrders = ordersRes.data.length;

      setDashboardData({
        totalFarmers: totalFarmers,
        activeProducts: productsRes.data.results.length,
        upcomingEvents: eventsRes.data.results.length,
        totalOrders: totalOrders, // Store the total number of orders
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Call the function when component mounts
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="tab-content">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Farmers</h3>
                <p>{dashboardData.totalFarmers}</p>
              </div>
              <div className="stat-card">
                <h3>Active Products</h3>
                <p>{dashboardData.activeProducts}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{dashboardData.totalOrders}</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <p>{dashboardData.upcomingEvents}</p>
              </div>
            </div>
          </div>
        );
      case "farmers":
        return (
          <div className="tab-content">
            <h2>Farmers Management</h2>
            <Farmers />
          </div>
        );
      case "products":
        return (
          <div className="tab-content">
            <h2>Products Management</h2>
            <Crops />
          </div>
        );
      case "events":
        return (
          <div className="tab-content">
            <h2>Events Calendar</h2>
            <Events />
          </div>
        );
      case "orders":
        return (
          <div className="tab-content">
            <h2>Order Management</h2>
            <Orders />
          </div>
        );
      default:
        return <div className="tab-content">Select a section to begin</div>;
    }
  };

  return (
    <div
      className={`admin-portal ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Earn Kisan Admin</h2>
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
            <button className="profile-btn">👤</button>
          </div>
        </header>

        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPortal;
