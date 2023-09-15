// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
   return{
    update:true,
    userData:null
   }
  },
  mutations: {
    increment(state){
        state.update=!state.update;
    }, setUser(state, user) {
      state.user = user;
    }},actions: {
      login({ commit }, user) {
        // Realizar lógica de inicio de sesión...
        // Luego, llamar a la mutación para cambiar el estado
        commit('setUser', user); // Llama a la mutación setUser con los datos del usuario
      },
    }
});

export default store;