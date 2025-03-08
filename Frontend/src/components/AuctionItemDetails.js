import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Button, Form, Badge, Row, Col } from "react-bootstrap";

function AuctionItemDetails({ item, onBack }) {
    const [bidAmount, setBidAmount] = useState("");

    const handleBid = async () => {
        if (!bidAmount.trim()) {
            toast.error("Please enter a bid amount.");
            return;
        }

        const bidValue = Number(bidAmount);

        if (isNaN(bidValue) || bidValue <= item.currentBid) {
            toast.error("Enter a valid bid higher than the current bid!");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/bid/${item._id}`,
                { bid: bidValue },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }
            );

            toast.success(response.data.message || "Bid placed successfully!");
            setBidAmount(""); // Clear input field after success
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to place bid.";
            console.error("Error placing bid:", errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <Row className="justify-content-center mt-5">
            <Col md={6}>
                <Card className="shadow-lg p-4">
                    <Card.Body className="text-center">
                        <Card.Title className="mb-3">{item.itemName}</Card.Title>
                        <Badge bg={new Date(item.closingTime) < new Date() ? "danger" : "success"}>
                            {new Date(item.closingTime) < new Date() ? "Closed" : "Active"}
                        </Badge>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text><strong>Current Bid:</strong> ${item.currentBid}</Card.Text>
                        <Card.Text><strong>End Time:</strong> {new Date(item.closingTime).toLocaleString()}</Card.Text>

                        {new Date(item.closingTime) > new Date() ? (
                            <>
                                <Form className="mt-3">
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter bid amount"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                </Form>
                                <Button
                                    style={{ backgroundColor: "rgb(242, 7, 109)" }}
                                    className="mt-3 w-100"
                                    onClick={handleBid}
                                    disabled={!bidAmount.trim() || Number(bidAmount) <= item.currentBid}
                                >
                                    Place Bid
                                </Button>
                            </>
                        ) : (
                            <p className="text-danger mt-3">Bidding is closed for this item.</p>
                        )}

                        <Button variant="secondary" className="mt-3 w-100" onClick={onBack}>
                            Back to Auction Items
                        </Button>
                    </Card.Body>
                </Card>
                <ToastContainer />
            </Col>
        </Row>
    );
}

export default AuctionItemDetails;
