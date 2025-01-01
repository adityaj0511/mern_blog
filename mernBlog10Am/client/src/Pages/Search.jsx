import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";
import { useSearchParams } from "react-router-dom";
export default function Search() {
  const [posts, setposts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchData, setsearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "Uncategorized",
  });
  const searchTerm = searchParams.get("searchTerm") || "";
  const sort = searchParams.get("sort") || "desc";
  const category = searchParams.get("category") || "Uncategorized";

  const getAllBlogData = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/post/getpost`, {
        params: {
          limit: 10,
          q: searchTerm.toLowerCase(),
          sort,
          category,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setposts(res.data.posts);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  const handleChange = (e) => {
    setsearchData({ ...searchData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchData);
    setSearchParams(searchData);
  };

  useEffect(() => {
    getAllBlogData();
  }, [searchTerm, sort, category]);
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column flex-md-row"
    >
      <div className="p-4 border-end border-bottom md:min-vh-100 border-gray-500">
        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center">
            <label className="me-2">Search Term:</label>
            <input
              className="form-control"
              placeholder="Search..."
              id="searchTerm"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Sort:</label>
            <select className="form-select" onChange={handleChange} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Category:</label>
            <select
              onChange={handleChange}
              className="form-select"
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <Button variant="outline-primary" type="submit">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-100">
        <h1 className="text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-4 d-flex flex-wrap gap-4">
          {posts ? (
            posts.length > 0 &&
            posts.map((el) => <PostCard key={el._id} {...el} />)
          ) : (
            <h1 className="text-3xl font-semibold border-bottom border-gray-500 p-3 mt-5">
              No posts found
            </h1>
          )}

          <button className="btn btn-link text-teal-500 p-3">Show More</button>
        </div>
      </div>
    </div>
  );
}
