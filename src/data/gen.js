import Vue from 'vue';
import Vuex from 'vuex';
//import json from '../test_data/data_lowes.json';

//const start = '100'

Vue.use(Vuex);

export const generation = new Vuex.Store({
  amount: '100',
  getters: {
    getNode: amount => {
      return amount
    }
  },
  mutations: {
    changeNode (state, payload) {
        console.log(state)
        console.log(payload)
        
        //amount = payload
    }
  }
})