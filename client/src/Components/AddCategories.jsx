import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

function AddCategories() {
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/create-category",
        {
          name: category,
        }
      );

      toast.success(res.data.message, { duration: 3000 });
      handleClose();
    } catch (error) {
      console.error("Error occurred while adding category:", error);
      toast.error("Failed to create category", { duration: 3000 });
    }
  };


  return (
    <>
      <div variant="primary" onClick={handleShow}>
        Add Category
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategories;
