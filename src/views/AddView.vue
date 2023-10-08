<template>
  <div class="addnew-parent">
    <h1>Add New Customer</h1>
    <form @submit.prevent="onSubmit">
      <div class="add-customer">
        <div class="field">
          <label class="label" for="firstname">Firstname :</label>
          <input class="input" type="text" v-model="newCustomer.firstname" />
        </div>
        <div class="field">
          <label class="label" for="lastname">Lastname :</label>
          <input class="input" type="text" v-model="newCustomer.lastname" />
        </div>
        <div class="field">
          <label class="label" for="email">Email :</label>
          <input class="input" type="text" v-model="newCustomer.email" />
        </div>
        <div class="field">
          <label class="label" for="phone">Phone_Number :</label>
          <input class="input" type="text" v-model="newCustomer.phone_number"/>
        </div>
        <div class="field">
          <label class="label" for="countrycode">Country_code :</label>
          <input class="input" type="text" v-model="newCustomer.country_code"/>
        </div>
        <div class="field">
          <label class="label" for="gender">Gender :</label>
          <input class="input" type="text" v-model="newCustomer.gender"/>
        </div>
        <div class="field">
          <label class="label" for="balance">Balance :</label>
          <input class="input" type="text" v-model="newCustomer.balance"/>
        </div>
      </div>
      <button type="submit" value="submit" class="button" @click="addNewCustomer">Add</button>
    </form>
  </div>
</template>
<script>
import CustomerService from "../services/CustomerService.js";
export default {
  name: "AddView",
  components: {},
  data(){
    return{
        newCustomer:{
          firstname:"",
          lastname:"",
          email:"",
          phone_number:"",
          country_code:"",
          gender:"",
          balance:""
        },
        allCustomersList:[],
    }
  },
  methods:{
    addNewCustomer(){
        if(this.newCustomer.email == '')
        {
          return false;
        }
      
        CustomerService.addNewCustomer(this.newCustomer)
          .then((response) => {
            this.deleteRespMsg = response.data;
            this.allCustomersList = response.data.customers.result
            this.$store.commit('ALL_CUST_LIST',this.allCustomersList)
          })
          .catch((error) => {
            console.log(error);
          });
        
        this.newCustomer={
          firstname:"",
          lastname:"",
          email:"",
          phone_number:"",
          country_code:"",
          gender:"",
          balance:0
        }
        this.$router.push("/")          
    }
  }
};
</script>
<style lang="scss">
.addnew-parent {
  width: 100%;
  margin: auto;
  .add-customer {
    width: 40%;
    margin: auto;
    margin-top: 3%;
    .field {
      display: flex;
      justify-content: space-between;
      margin-top: 2%;
      .label {
        font-family: "Courier New", Courier, monospace;
        font-weight: 700;
        font-size: 20px;
      }
      .input {
        width: 350px;
        border: 1px solid grey;
        border-radius: 5px;
        height: 30px;
      }
    }
  }

  .button {
    height: 40px;
    width: 100px;
    background-color: #93c3e9;
    border: 1px solid gray;
    border-radius: 5px;
    margin-top: 3%;
    margin-left: 30%;
  }
}
</style>
