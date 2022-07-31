import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { TextField, Button } from "@mui/material";
import axios from "axios";

interface formProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

function ProductForm() {
  const params = useParams();
  const [form, setForm] = useState<formProps>({
    id: 0,
    title: "",
    description: "",
    image: "",
    price: 0,
  });
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (params.id) {
        const productId = params.id;
        const response = await axios.get(`products/${productId}`);
        const data = response.data;
        setForm({
          id: data.id,
          title: data.title,
          description: data.description,
          image: data.image,
          price: data.price,
        });
      }
    })();
  }, [params.id]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!form.id) {
        // create
        const response = await axios.post("products", {
          title: form.title.trim(),
          description: form.description,
          image: form.image.trim(),
          price: form.price,
        });
        if (response) {
          setRedirect(true);
        }
      } else {
        // update
        const response = await axios.put(`products/${form.id}`, {
          title: form.title.trim(),
          description: form.description,
          image: form.image.trim(),
          price: form.price,
        });
        if (response) {
          setRedirect(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/products" replace />;
  }

  return (
    <Layout>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Description"
            name="description"
            rows={4}
            multiline
            value={form.description}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Image"
            name="image"
            value={form.image}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Price"
            name="price"
            type={"number"}
            value={form.price}
            onChange={handleFormChange}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
}

export default ProductForm;
