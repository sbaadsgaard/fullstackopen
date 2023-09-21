import axios from 'axios'

const baseURL = '/api/blogs'
let token = ''

const config = () => ({
	headers: {
		Authorization: `Bearer ${token}`
	}
})

const setToken = (newToken) => {
	token = newToken
}


const getAll = async () => {
	const response = await axios.get(baseURL)
	return response.data
}

const create = async (blog) => {
	const response = await axios.post(baseURL, blog, config())
	return response.data
}

const update = async (id, blog) => {
	const response = await axios.put(`${baseURL}/${id}`, blog, config())
	return response.data
}

const remove = async (id) => {
	const response = await axios.delete(`${baseURL}/${id}`, config())
	return response.data
}

const services = {
	setToken,
	getAll,
	create,
	update,
	remove
}

export default services