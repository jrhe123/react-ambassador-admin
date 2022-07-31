import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "../models/link";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";

const perPage = 10;

function Links() {
  const params = useParams();
  const [page, setPage] = useState<number>(0);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    (async () => {
      if (params.id) {
        try {
          const response = await axios.get(`users/${params.id}/links`);
          setLinks(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [params.id]);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links
            .slice(page * perPage, (page + 1) * perPage)
            .map((link, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{link.id}</TableCell>
                  <TableCell>{link.code}</TableCell>
                  <TableCell>{link.orders.length}</TableCell>
                  <TableCell>
                    {link.orders.reduce((s, o) => s + o.total, 0)}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            page={page}
            count={links.length}
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

export default Links;
