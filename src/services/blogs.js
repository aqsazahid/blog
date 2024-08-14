import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async(formData) => {
  const token = window.localStorage.getItem('loggedUser')
    ? JSON.parse(window.localStorage.getItem('loggedUser')).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(baseUrl, formData, config);
  return response.data
}

export default { getAll,createBlog}