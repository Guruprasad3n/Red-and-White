import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AddProducts() {
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      const imageURL = await postDetails(image);
      console.log("imageURL", imageURL);
      console.log("image", image);
      const productData = {
        title,
        description,
        price,
        oldPrice,
        category,
        rating,
        inStock,
        image: imageURL,
      };

      const response = await fetch(`http://localhost:8000/api/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        console.log("Product created successfully:", data);
        toast.success("Product created successfully", { duration: 3000 });
        onClose();
      } else {
        console.error("Failed to create product:", data.message);
      }
    } catch (error) {
      toast.error("Error creating product");
      console.error("Error creating product:", error);
      setLoading(false);
    } finally {
      setLoading(false);
      toast.error("Error creating product");
    }
  };

  const postDetails = async (image) => {
    setLoading(false);
    if (!image) {
      return null; 
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "arba-dev");
      data.append("cloud_name", "dreyat4ae");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dreyat4ae/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setImage(responseData.url.toString());
          return responseData.url.toString();
        } else {
          console.error("Failed to upload image to Cloudinary");
          toast.error("Failed to upload image to Cloudinary");
          setLoading(false);
          return null;
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        toast.error("Error uploading image to Cloudinary");
        setLoading(false);
        return null;
      }
    } else {
      console.error("Image type must be either JPEG or PNG");
      toast.error("Image type must be either JPEG or PNG");
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div onClick={onOpen}>Add Product</div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Product price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Old Price</FormLabel>
              <Input
                placeholder="Old Price"
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>inStock</FormLabel>
              <Input
                placeholder="inStock"
                type="number"
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <Input
                placeholder="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleSave();
              }}
              isLoading={loading}
            >
              {loading ? <Spinner size="sm" color="white" /> : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
