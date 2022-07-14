// Service is only for sending hhtp requests and saving things in local storage
// You get token and data from axios req.
//You pass that data in async function
//which then updates the state for the register/login page


import axios from 'axios'

//a proxy is added in package file which is added before
//this url

const API_URL = '/api/users/'


//register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))

    }
    return response.data
}

const authService = {
    register
}


export default authService
