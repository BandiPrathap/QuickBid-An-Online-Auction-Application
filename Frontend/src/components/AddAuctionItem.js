import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Card} from "react-bootstrap";

function AddAuctionItem() {
    const [item, setItem] = useState({
        itemName: "",
        description: "",
        startingBid: "",
        closingTime: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!item.itemName || !item.description || !item.startingBid || !item.closingTime) {
            toast.error("All fields are required!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/auctions", item, {
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type": "application/json"
                }
            });

            toast.success("Item added successfully!");
            setItem({ itemName: "", description: "", startingBid: "", closingTime: "" });

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            toast.error("Failed to add item.");
        }
    };

    return (
        <>
            <Card style={{ width: "40rem" }} className="shadow-lg p-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Add Auction Item</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter item name" 
                                value={item.itemName} 
                                onChange={(e) => setItem({ ...item, itemName: e.target.value })} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Enter item description" 
                                value={item.description} 
                                onChange={(e) => setItem({ ...item, description: e.target.value })} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Starting Bid</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter starting bid" 
                                value={item.startingBid} 
                                onChange={(e) => setItem({ ...item, startingBid: e.target.value })} 
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                value={item.closingTime} 
                                onChange={(e) => setItem({ ...item, closingTime: e.target.value })} 
                                required
                            />
                        </Form.Group>

                        <Button style={{backgroundColor:"rgb(242, 7, 109)"}} type="submit" className="w-100">
                            Add Item
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <ToastContainer />
        </>
    );
}

export default AddAuctionItem;
