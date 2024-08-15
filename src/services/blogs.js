import axios from 'axios'
const baseUrl = '/api/blogs'
const token = window.localStorage.getItem('loggedUser')
    ? JSON.parse(window.localStorage.getItem('loggedUser')).token
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
const getAll = async() => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; // Optionally rethrow or handle the error as needed
  }
}

const createBlog = async(formData) => {
  const response = await axios.post(baseUrl, formData, config);
  return response.data
}

const updateBlog = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export default { getAll,createBlog,  updateBlog}