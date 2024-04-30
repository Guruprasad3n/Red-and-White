import { Button, Stack } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Categories({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data.categories);
      toast.success("Category Created", { duration: 3000 });
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Category Creation Failed", { duration: 3000 });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-2 mb-3">
      <Stack gap={1} direction="horizontal">
        <Button variant="primary" onClick={() => setSelectedCategory(null)}>
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant="primary"
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
}

export default Categories;
