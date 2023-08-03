import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"
const getCountryNames = () => {
    const request = axios.get(`${baseURL}/all`)
    return request.then(response => response.data)
}

export default {getCountryNames}