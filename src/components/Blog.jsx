import React, {useState} from 'react';
import blogService from '../services/blogs'
const Blog = ({blog,updateBlogs}) => {
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
                    <p>{blog.url}</p>
                    <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
                </div>
            }
        </>
    )
}

export default Blog