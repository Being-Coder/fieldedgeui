<template>
  <div class="customer-view">
    <div class="customer-div">
      <DataTable
        :value="allCustomersList"
        stripedRows
        class="p-datatable-sm"
        tableStyle="min-width: 50rem"
      >
        <Column field="id" header="CustomerId"></Column>
        <Column field="firstname" header="Firstname"></Column>
        <Column field="lastname" header="Lastname"></Column>
        <Column field="email" header="Email">
        <template #body="slotProps">
          <a :href="slotProps.data.email" v-text="slotProps.data.email" />
        </template>
        </Column>   
        <Column field="phone_Number" header="Phone_Number"></Column>
        <Column field="country_Code" header="Country_code"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="balance" header="Balance">
          <template #body="{ data }">
            {{ formatCurrency(data.balance) }}
          </template>
        </Column>
        <Column header="Actions" :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <a class="Edit" @click="editCustomer(slotProps)">Edit</a> |
            <a class="Delete" @click="deleteCustomer(slotProps)">Delete</a>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="btn-div">
      <button class="anc-btn" @click="addNewCustomer()">Add New Customer</button>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CustomerService from "../services/CustomerService.js";
export default {
  name: "HomeView",
  components: {
    DataTable,
    Column,
  },
  mounted() {
    CustomerService.getAllCustomers()
      .then((response) => {
        this.allCustomersList = response.data;
        this.$store.commit('ALL_CUST_LIST',this.allCustomersList)        
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      edit: "Edit",
      allCustomersList: this.$store.state.AllCustomersList,
      customer: {},
      deleteRespMsg: [],
    };
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    deleteCustomer(custToDelete) {
      var response = confirm(
        "Are you sure ? you want to delete customer with id = " +
          custToDelete.data.id
      );
      if (response) {
        CustomerService.deleteCustomer(custToDelete.data.id)
          .then((response) => {
            this.deleteRespMsg = response.data;
            this.allCustomersList = response.data.customers.result
            this.$store.commit('ALL_CUST_LIST',this.allCustomersList)        
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return false;
      }
    },
    editCustomer(custToEdit) {
      this.customer = custToEdit.data;
      var id = custToEdit.data.id;
      this.$router.push({ name: 'edit', params: { id } });
    },
    addNewCustomer(){
        this.$router.push("add");
    } 
  },
};
</script>

<style lang="scss">
.customer-view {
  .customer-div {
    margin-bottom: 50px;
    .Edit,
    .Delete {
      cursor: pointer;
    }
  }
  .btn-div {
    margin-right: 50px;
    float: right;
    .anc-btn {
      height: 40px;
      width: 175px;
      background-color: #93c3e9;
      border: 1px solid grey;
      font-size: 14px;
      font-weight: 700;
      border-radius: 5px;
    }
    .anc-btn:hover {
      cursor: pointer;
      box-shadow: 2px 2px 0 0 grey;
    }
  }
}
</style>