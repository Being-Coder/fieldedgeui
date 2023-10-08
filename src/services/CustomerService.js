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
    },
    deleteCustomer(id){
        return apiClient.delete('/Customer/'+id)
    },
    getCustomersById(id){
        return apiClient.get('/Customer/'+id)
    },    
    addNewCustomer(newCustomer){
        return apiClient.post('/Customer',
        {
            id: 0,
            salutation: "",
            initials: "",
            firstname: newCustomer.firstname,
            firstname_ascii: "",
            gender: newCustomer.gender,
            firstname_Country_Rank: "",
            firstname_Country_Frequency: "",
            lastname: newCustomer.lastname,
            lastname_ascii: "",
            lastname_Country_Rank: "",
            lastname_Country_Frequency: "",
            email: newCustomer.email,
            password: "",
            country_Code: newCustomer.country_code,
            country_Code_Alpha: "",
            country_Name: "",
            primary_Language_Code: "",
            primary_Language: "",
            balance: newCustomer.balance == '' ? 0 : parseInt(newCustomer.balance),
            phone_Number: newCustomer.phone_number,
            currency: ""
          }          
        )
    },
    updateCustomer(editCustomer,id){
        return apiClient.put('/Customer',
        {
            id: id,
            salutation: "",
            initials: "",
            firstname: editCustomer.firstname,
            firstname_ascii: "",
            gender: editCustomer.gender,
            firstname_Country_Rank: "",
            firstname_Country_Frequency: "",
            lastname: editCustomer.lastname,
            lastname_ascii: "",
            lastname_Country_Rank: "",
            lastname_Country_Frequency: "",
            email: editCustomer.email,
            password: "",
            country_Code: editCustomer.country_Code,
            country_Code_Alpha: "",
            country_Name: "",
            primary_Language_Code: "",
            primary_Language: "",
            balance: editCustomer.balance == '' ? 0 : parseInt(editCustomer.balance),
            phone_Number: editCustomer.phone_Number,
            currency: ""
          }          
        )
    }    
}
