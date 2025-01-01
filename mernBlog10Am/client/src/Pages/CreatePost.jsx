import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [title, settile] = useState("");
  const [content, setcontent] = useState("");
  const [category, setcategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let postdata = { title, content, category };
    axios
      .post(`${import.meta.env.VITE_BASEURL}/post/create`, postdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message || "post created successfully");
        settile("");
        setcontent("");
        setcategory("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.msg || "something went wrong");
      });
  };
  return (
    <div
      className="container p-3 max-w-3xl mx-auto min-vh-100"
      style={{ maxWidth: "60%" }}
    >
      <h1 className="text-center my-4">Create a Post</h1>
      <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <Form.Group className="d-flex flex-wrap gap-3">
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => settile(e.target.value)}
            className="flex-fill"
          />
          <Form.Select
            className="flex-fill"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Form.Select>
        </Form.Group>

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-4"
          style={{ height: "200px" }}
          value={content}
          onChange={setcontent}
        />

        <Button variant="primary" type="submit">
          Publish
        </Button>
      </Form>
    </div>
  );
}
