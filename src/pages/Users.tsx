import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
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

function Users() {
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("ambassadors");
      console.log("response: ", response);
      setUsers(response.data);
    })();
  }, []);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * perPage, (page + 1) * perPage)
            .map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            page={page}
            count={users.length}
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

export default Users;
