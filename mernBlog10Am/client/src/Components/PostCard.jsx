import { Link } from 'react-router-dom';

export default function PostCard({ blogImage,title ,category,_id}) {
    console.log(blogImage)
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card border-0 shadow-sm h-100">
        <Link to={`/singlepost/${_id}`}>
          <img
            src={blogImage[0]=="h" ? blogImage : `${import.meta.env.VITE_BASEURL}/blog/${blogImage}`}
            alt="post cover"
            className="card-img-top img-fluid"
            style={{ height: '260px', objectFit: 'cover' }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{title}</h5>
          <p className="card-text text-muted mb-2">{category}</p>
          <Link
            to={`/singlepost/${_id}`}
            className="btn btn-outline-primary mt-auto"
          >
            Read article
          </Link>
        </div>
      </div>
    </div>
  );
}
