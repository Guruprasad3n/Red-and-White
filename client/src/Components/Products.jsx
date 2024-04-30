import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Categories from "./Catrgories";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(selectedCategory);
  const fetchData = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:8000/api/products?category=${selectedCategory}`
        : "http://localhost:8000/api/products";
      const res = await axios.get(url);
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const renderRating = (rating) => {
    const starIcons = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<BsStarFill key={i} />);
    }

    if (halfStar) {
      starIcons.push(<BsStarHalf key={fullStars} />);
    }

    const remainingStars = 5 - starIcons.length;

    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<BsStar key={fullStars + i} />);
    }

    return (
      <div className="d-flex align-items-center">
        {starIcons.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  console.log("filteredProducts", filteredProducts);
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
        ) : (
          <>
            <Categories setSelectedCategory={setSelectedCategory} />
            <Row className="justify-content-start mb-4">
              {filteredProducts.map((product) => (
                <Col key={product._id} xs={12} md={6} lg={3}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        {product.description.length > 100
                          ? `${product.description.slice(0, 100)}...`
                          : product.description}
                      </Card.Text>
                      <Card.Text>${product.price}</Card.Text>
                      <Card.Text>{renderRating(product.rating)}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary">Add To Cart</Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Products;
