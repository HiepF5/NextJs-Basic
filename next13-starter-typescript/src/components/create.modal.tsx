"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";
interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}
interface IData {
  title: string;
  author: string;
  content: string;
}
function CreateModal({ showModalCreate, setShowModalCreate }: IProps) {
  const [newData, setNewData] = useState<IData>({
    title: "",
    author: "",
    content: "",
  });
  const handleChangeDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddSubmit = async () => {
    if (!newData.title || !newData.author || !newData.content) {
      toast.error("Not Empty!");
      return;
    }
    console.log(newData);
    toast.success("Create Success!");

    await axios.post("http://localhost:8000/blogs", newData);
    mutate("http://localhost:8000/blogs");
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setNewData({
      title: "",
      author: "",
      content: "",
    });
    setShowModalCreate(false);
  };
  return (
    <>
      <Modal
        show={showModalCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                name="title"
                value={newData?.title}
                onChange={handleChangeDate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                name="author"
                value={newData?.author}
                onChange={handleChangeDate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={newData?.content}
                onChange={handleChangeDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
