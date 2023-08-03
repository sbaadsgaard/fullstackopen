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

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

export default {getAll, create, remove}