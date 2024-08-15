import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageType, setMessageType] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setUsername(user.username)
    }
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };

    fetchBlogs();
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user);
      setUsername(user.username);
      setPassword('');
    } catch {
      setMessageType('error');
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const logOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const updateBlogs = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog));
  };

  const updateDeleteBlogs= () => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const addBlog = async (noteObject) => {
    try {
      const newBlog = await blogService.createBlog(noteObject)
      setBlogs(blogs.concat(newBlog))
      setMessageType('success');
      setErrorMessage(newBlog.title + 'Added');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }catch {
      setMessageType('error');
      setErrorMessage('Wrong entries');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  return (
    <div>
      <Notification message={errorMessage} type={messageType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {username} logged-in{' '}
            <button onClick={logOut} style={{ backgroundColor: 'grey' }}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel="create new blog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} deleteBlogs= {updateDeleteBlogs} user = {user}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default App