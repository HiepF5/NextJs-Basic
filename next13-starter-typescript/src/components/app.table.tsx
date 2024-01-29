"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import { useState } from "react";
import EditModal from "./edit.modal";
import axios from "axios";
import { mutate } from "swr";
import Link from "next/link";
import { toast } from "react-toastify";
interface IProps {
  blogs: IBlog[];
}
function AppTable(props: IProps) {
  const { blogs } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [dataAuthor, setDataAuthor] = useState<IBlog | null>(null);
  console.log("check log:", blogs);
  const handleEdit = (user: IBlog) => {
    setShowModalEdit(true);
    setDataAuthor(user);
    console.log(user);
  };
  const handleDelete = async (id: number) => {
    if (confirm("Do you want delete")) {
      await axios.delete(`http://localhost:8000/blogs/${id}`);
      mutate("http://localhost:8000/blogs");
      toast.success("Delete success");
    }
  };
  return (
    <>
      <div className="d-flex mb-3 justify-content-between">
        <h3>Table Blogs</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add
        </Button>
      </div>

      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <EditModal
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
        setDataAuthor={setDataAuthor}
        dataAuthor={dataAuthor}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Link className="btn btn-primary" href={`/blogs/${blog.id}`}>
                    View
                  </Link>

                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default AppTable;
