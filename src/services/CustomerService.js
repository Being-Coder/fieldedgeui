import axios from "axios";

const apiClient = axios.create({
    baseURL:'https://localhost:7052/api', 
    withCredentials: false,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    }
})

export default {
    getAllCustomers(){
        return apiClient.get('/Customers')
    }
}
