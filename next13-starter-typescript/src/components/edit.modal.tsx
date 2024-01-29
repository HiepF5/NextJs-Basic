"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  showModalEdit: boolean;
  setShowModalEdit: (value: boolean) => void;
  dataAuthor: IBlog | null;
  setDataAuthor: (value: IBlog | null) => void;
}
function EditModal(props: IProps) {
  const { showModalEdit, setShowModalEdit, dataAuthor, setDataAuthor } = props;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    if (dataAuthor && dataAuthor.id) {
      setId(dataAuthor.id);
      setTitle(dataAuthor.title);
      setContent(dataAuthor.content);
      setAuthor(dataAuthor.author);
    }
  }, [dataAuthor]);
  console.log(dataAuthor);
  const handleAddSubmit = async () => {
    if (!title || !author || !content) {
      toast.error("Not Empty!");
      return;
    }
    toast.success("Create Success!");
    await axios.put(`http://localhost:8000/blogs/${id}`, {
      id,
      title,
      content,
      author,
    });
    mutate("http://localhost:8000/blogs");
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setShowModalEdit(false);
  };
  return (
    <>
      <Modal
        show={showModalEdit}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
