import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  // Fetch blogs
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:5000/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Add blog
  const addBlog = async () => {
    await axios.post("http://localhost:5000/blogs", {
      title,
      content,
      comments: []
    });

    setTitle("");
    setContent("");
    fetchBlogs();
  };

  // Delete blog
  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:5000/blogs/${id}`);
    fetchBlogs();
  };

  // Add comment
  const addComment = async (id) => {
    await axios.put(`http://localhost:5000/blogs/${id}`, {
      comment
    });

    setComment("");
    fetchBlogs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Blog Platform</h1>

      <input
        type="text"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Blog content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={addBlog}>Add Blog</button>

      <hr />

      {blogs.map((blog) => (
        <div key={blog._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>

          <button onClick={() => deleteBlog(blog._id)}>
            Delete
          </button>

          <h4>Comments</h4>

          {blog.comments.map((c, index) => (
            <p key={index}>• {c}</p>
          ))}

          <input
            type="text"
            placeholder="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={() => addComment(blog._id)}>
            Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;