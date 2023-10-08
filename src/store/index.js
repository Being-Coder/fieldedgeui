import { createStore } from 'vuex'

export default createStore({
  state: {
    AllCustomersList : []
  },
  getters: {
  },
  mutations: {
    ALL_CUST_LIST(state,allCustomersList){
      state.AllCustomersList = allCustomersList
    }
  },
  actions: {
  },
  modules: {
  }
})
