import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable';
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [messageType, setMessageType] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setUsername(user.username)
    }
    // Fetch all blogs
    blogService.getAll().then(blogs => setBlogs(blogs));
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
    } catch (exception) {
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
  const blogForm = () => (
    <form onSubmit={handleBlogCreation}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>   
  )

  const handleBlogCreation = async(event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.createBlog({title,url,author})
      setBlogs(blogs.concat(newBlog))
      setMessageType('success');
      setErrorMessage(newBlog.title + 'Added');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')
    }catch (exception) {
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
            {blogForm()}
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App