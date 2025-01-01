import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';

export default function DashboardComp() {
  const [users] = useState([
    { _id: '1', profilePicture: 'https://via.placeholder.com/40', username: 'User1' },
    { _id: '2', profilePicture: 'https://via.placeholder.com/40', username: 'User2' },
  ]);
  const [comments] = useState([
    { _id: '1', content: 'Great post!', numberOfLikes: 12 },
    { _id: '2', content: 'I found this helpful', numberOfLikes: 8 },
  ]);
  const [posts] = useState([
    { _id: '1', image: 'https://via.placeholder.com/70', title: 'Post Title 1', category: 'Tech' },
    { _id: '2', image: 'https://via.placeholder.com/70', title: 'Post Title 2', category: 'Lifestyle' },
  ]);

  const totalUsers = 150;
  const totalPosts = 75;
  const totalComments = 120;


  return (
    <div className='container py-3' style={{ maxWidth: "60%", position: "absolute", top: "10%", left: "25%" }}>
      <div className='row justify-content-center'>
        <div className='col-md-4 mb-4'>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title text-muted'>Total Users</h5>
              <p className='display-6'>{totalUsers}</p>
              <HiOutlineUserGroup className='text-primary display-1' />
           
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title text-muted'>Total Comments</h5>
              <p className='display-6'>{totalComments}</p>
              <HiAnnotation className='text-info display-1' />
           
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='card text-center'>
            <div className='card-body'>
              <h5 className='card-title text-muted'>Total Posts</h5>
              <p className='display-6'>{totalPosts}</p>
              <HiDocumentText className='text-warning display-1' />
            
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4 mb-4'>
          <h5 className='text-center mb-3'>Recent Users</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img src={user.profilePicture} alt='Profile' className='rounded-circle' width={40} />
                  </td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='outline-primary' className='w-100 mt-2'>See All</Button>
        </div>
        
        <div className='col-md-4 mb-4'>
          <h5 className='text-center mb-3'>Recent Comments</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Content</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id}>
                  <td>{comment.content}</td>
                  <td>{comment.numberOfLikes}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='outline-primary' className='w-100 mt-2'>See All</Button>
        </div>
        
        <div className='col-md-4 mb-4'>
          <h5 className='text-center mb-3'>Recent Posts</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <img src={post.image} alt='Post' width={70} />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant='outline-primary' className='w-100 mt-2'>See All</Button>
        </div>
      </div>
    </div>
  );
}
