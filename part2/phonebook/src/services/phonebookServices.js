import axios from "axios";

const baseURL = 'http://localhost:3001/persons'


const create = (personObject) =>
{
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

export default {getAll, create, update, remove}