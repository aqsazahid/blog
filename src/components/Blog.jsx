import React, {useState} from 'react';
import blogService from '../services/blogs'
const Blog = ({blog,updateBlogs, user,deleteBlogs}) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const toggleDetails = () => {
      setDetailsVisible(!detailsVisible);
    };
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLike = async () => {
        try {
          const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
          };
            updateBlogs(updatedBlog)
            await blogService.updateBlog(blog.id, updatedBlog);
        } catch (error) {
          console.error('Error liking blog:', error);
        }
    };

    const handleDelete = async() => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`);
        if (confirmDelete) {
            try {
                const res = await blogService.deleteBlog(blog.id)
                deleteBlogs(blog.id)
            }catch (error) {
                console.error('Error deleting blog:', error);
              }
        }
    }
    return (
        <>
            <div style={blogStyle}>
                {blog.title}  {blog.author}
                <button onClick={toggleDetails}>
                    {detailsVisible ? 'hide' : 'view'}
                </button>
            </div>
            {
                detailsVisible && 
                <div style={blogStyle}>
                    <p>{blog.author}</p>
                    <a href="#"><p>{blog.url}</p></a>
                    <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
                    <p>{blog.user && blog.user.username}</p>
                    {user.username === blog.user.username && 
                        <button onClick={handleDelete}>delete</button>
                    }
                </div>
            }
        </>
    )
}

export default Blog