import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayAuctionItems from "../components/DisplayAuctionItems";
import AddAuctionItem from "../components/AddAuctionItem";
import { FaGavel, FaPlus, FaSignOutAlt, FaBars,FaClipboardList } from "react-icons/fa";
import { Navbar, Button } from "react-bootstrap";

function Dashboard() {
    const navigate = useNavigate();
    const [isItems, setIsItems] = useState(true);
    const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);
    const [activeTab, setActiveTab] = useState("items");

    // Check if user is authenticated
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    // Handle Sidebar Navigation
    const handleTabChange = (tab) => {
        setIsItems(tab === "items");
        setActiveTab(tab);
        if (window.innerWidth <= 768) setShowSidebar(false); // Close sidebar on mobile
    };

    return (
        <section className="d-flex flex-column">
            {/* Top Navbar for Mobile */}
            <Navbar bg="dark" variant="dark" expand="lg" className="p-2 d-md-none">
                <Button variant="outline-light" onClick={() => setShowSidebar(!showSidebar)}>
                    <FaBars />
                </Button>
                <Navbar.Brand className="ms-3">Auction Dashboard</Navbar.Brand>
            </Navbar>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    {showSidebar && (
                        <div className="col-md-2 vh-100 p-3 position-fixed " style={{ width: "250px", transition: "0.3s", backgroundColor:"rgba(0, 255, 47, 1)" }}>
                            <h2 className="text-center" style={{color:"rgb(16, 8, 129)"}}>
                                Auction Dashboard
                            </h2>
                            <ul className="list-unstyled">
                                <li 
                                    className={`p-2 d-flex align-items-center ${activeTab === "items" ? "bg-dark text-white rounded" : ""}`} 
                                    style={{ cursor: "pointer", marginTop: "20px" }} 
                                    onClick={() => handleTabChange("items")}
                                >
                                    <FaClipboardList className="me-2"/> Items
                                </li>
                                <li 
                                    className={`p-2 ${activeTab === "add" ? "bg-dark text-white rounded" : ""}`} 
                                    style={{ cursor: "pointer" }} 
                                    onClick={() => handleTabChange("add")}
                                >
                                    <FaPlus className="me-2" /> Create New Auction
                                </li>
                                <li 
                                    className="p-2 text-danger fw-bold mt-5" 
                                    style={{ cursor: "pointer" }} 
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt /> Log out
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="bg-light col-md-10 offset-md-2 p-4 vh-100" style={{ marginLeft: showSidebar ? "250px" : "0", transition: "0.3s" }}>
                        {isItems ? <DisplayAuctionItems /> : <AddAuctionItem />}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
