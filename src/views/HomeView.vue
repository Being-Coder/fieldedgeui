<template>
  <div class="customer-view">
    <div class="customer-div">
      <DataTable
        :value="products"
        stripedRows
        class="p-datatable-sm"
        tableStyle="min-width: 50rem"
      >
        <Column field="id" header="CustomerId"></Column>
        <Column field="firstname" header="Firstname"></Column>
        <Column field="lastname" header="Lastname"></Column>
        <Column field="email" header="Email"></Column>
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
            <a class="Edit" @click="editProduct(slotProps.data)">Edit</a> |
            <a class="Delete" @click="editProduct(slotProps.data)">Delete</a>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="btn-div">
      <button class="anc-btn">Add New Customer</button>
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
  created() {
    CustomerService.getAllCustomers()
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      edit: "Edit",
      products: [],
    };
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style lang="scss">
.customer-view {
  .customer-div {
    margin-bottom: 50px;
    .Edit,
    .Delete{
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
    }
    .anc-btn:hover{
      cursor: pointer;
      box-shadow: 2px 2px 0 0 grey;
    }
  }
}
</style>