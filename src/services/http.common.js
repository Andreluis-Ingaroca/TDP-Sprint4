import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    //baseURL: 'https://jsonplaceholder.typicode.com/',
    //baseURL: 'https://roomiesapi20220418164342.azurewebsites.net/api',
    headers: {
        'Content-type':'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});