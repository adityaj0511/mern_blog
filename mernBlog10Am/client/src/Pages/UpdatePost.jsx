import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function UpdatePost() {
  return (
    <div className="container my-5" style={{ maxWidth: "60%" }}>
      <h1 className="text-center">Update Post</h1>
      <Form className="mt-4">
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            defaultValue="Sample Post Title"
          />
        </Form.Group>

        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue="reactjs">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="file" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" accept="image/*" />
        </Form.Group>

        <Form.Group controlId="content" className="mb-3">
          <Form.Label>Content</Form.Label>
          <ReactQuill
            theme="snow"
            defaultValue="<p>Sample content...</p>"
            style={{ height: "200px" }}
            placeholder="Write something..."
          />
        </Form.Group>

        <Button variant="primary" className="mt-5 w-100" type="button">
          Update Post
        </Button>
      </Form>
    </div>
  );
}
