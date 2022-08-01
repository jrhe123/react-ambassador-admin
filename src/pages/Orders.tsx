import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Order } from "../models/order";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`orders`);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Layout>
      {orders.map((order, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary>
              {order.name} ${order.total}
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item, indexx) => {
                    return (
                      <TableRow key={indexx}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.product_title}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Layout>
  );
}

export default Orders;
