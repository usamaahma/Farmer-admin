import { useState, useEffect } from "react";
import "./farmerlanding.css";

import { crop, event, orders } from "../utils/axios";
import Farmerproducts from "./farmercomponents/farmerproducts";
import Farmerorders from "./farmercomponents/farmerorders";
import Farmerevents from "./farmercomponents/farmerevents";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    activeProducts: 0,
    upcomingEvents: 0,
    totalOrders: 0,
  });

  const [products, setProducts] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  const navItems = [
    { id: "products", label: "My Products", icon: "🌽" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "orders", label: "My Orders", icon: "📦" },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDashboardData = async () => {
    try {
      const [productsRes, eventsRes, ordersRes] = await Promise.all([
        crop.get("/user", { params: { postedBy: user.id } }),
        event.get("/"), // Get all events, filter locally
        orders.get(`/farmer/${user.id}`),
      ]);
      const filteredEvents =
        eventsRes.data.results?.filter((evt) => evt.farmerId === user.id) || [];
      setProducts(productsRes.data.results || []);
      setOrdersList(ordersRes.data || []);
      setEventsList(filteredEvents);
      setDashboardData({
        activeProducts: productsRes.data.results?.length || 0,
        upcomingEvents: filteredEvents.length,
        totalOrders: ordersRes.data?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div className="tab-content">
            <h2>My Products</h2>
            <Farmerproducts products={products} />
          </div>
        );
      case "events":
        return (
          <div className="tab-content">
            <h2>Events</h2>
            <Farmerevents events={eventsList} />
          </div>
        );
      case "orders":
        return (
          <div className="tab-content">
            <h2>My Orders</h2>
            <Farmerorders orders={ordersList} />
          </div>
        );
      default:
        return <div className="tab-content">Select a section to begin</div>;
    }
  };

  return (
    <div
      className={`farmer-dashboard ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Earn Kisan Farmer</h2>
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
                <span className="user-name">{user.name || "Farmer User"}</span>
                <span className="user-role">Farmer</span>
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

export default FarmerDashboard;
