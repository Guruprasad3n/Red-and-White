import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/cart");

      setCart(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const handleIncrement = async (productId, incrementBy) => {
    try {
      const newQuantity = getProductQuantity(productId) + incrementBy;
      if (newQuantity <= 0) {
        handleRemove(productId);
      } else {
        await axios.post("http://localhost:8000/api/cart/increment", {
          productId,
          incrementBy,
        });
        fetchCart();
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };


  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${productId._id}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  const getProductQuantity = (productId) => {
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };
  return (
    <div className="py-4">
      <Container>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : cart ? (
          <>
            <Row>
              <Col xs={12} md={8}>
                {cart.map((item, index) => (
                  <div
                    key={item._id}
                    className="mb-4"
                    style={{
                      border: "1.3px solid grey",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="me-3"
                        style={{ width: "15%", height: "100%" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.productId.image}
                            alt={item.productId.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "84%", height: "100%" }}>
                        <h5>{item.productId.title}</h5>
                        <p
                          className="fw-bold text-truncate"
                          style={{
                            width: "80%",
                            maxHeight: "3em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.5",
                          }}
                        >
                          {item.productId.description}
                        </p>
                        <div className="d-flex">
                          <p
                            style={{
                              textDecoration: "line-through",
                              color: "grey",
                              marginRight: "40px",
                            }}
                          >
                            ${item.productId.oldPrice}
                          </p>
                          {item.productId.price < item.productId.oldPrice ? (
                            <p>
                              ${item.productId.price}{" "}
                              <span
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                --{" "}
                                {(
                                  (1 -
                                    item.productId.price /
                                      item.productId.oldPrice) *
                                  100
                                ).toFixed(2)}
                                % off
                              </span>
                            </p>
                          ) : (
                            <>
                              <p>${item.productId.price}</p>
                              <p
                                style={{
                                  marginLeft: "20px",
                                  color: "green",
                                  fontWeight: "bold",
                                }}
                              >
                                No Offer
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="outline-primary"
                        onClick={() => handleIncrement(item.productId, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleIncrement(item.productId, 1)}
                      >
                        +
                      </Button>
                      <Button variant="primary" className="ms-2">
                        Save Later
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </Col>
              <Col xs={12} md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Payment Details</Card.Title>
                    <Card.Text>Total Items: {cart.length}</Card.Text>
                    <Card.Text>
                      Total Price: $
                      {cart.reduce(
                        (acc, item) =>
                          acc + item.productId.price * item.quantity,
                        0
                      )}
                    </Card.Text>
                    <Button variant="primary">Proceed to Checkout</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <div className="text-center">Cart is empty</div>
        )}
      </Container>
    </div>
  );
}

export default Cart;
