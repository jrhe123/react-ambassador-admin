import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Product } from "../../models/product";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

const perPage = 10;

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const response = await axios.get("products");
      setProducts(response.data);
    })();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * perPage, (page + 1) * perPage)
            .map((product, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Box component="img" src={product.image} />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            page={page}
            count={products.length}
            onPageChange={(e, newPage) => {
              setPage(newPage);
            }}
            rowsPerPage={perPage}
            rowsPerPageOptions={[]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
}

export default Products;
