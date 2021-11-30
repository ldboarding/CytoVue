import Vue from 'vue';
import Vuex from 'vuex';
//import json from '../test_data/data_lowes.json';

//const node = json.nodes[0].data
const amount = '100'

Vue.use(Vuex);

export const selectedNode = new Vuex.Store({
  state: {
    node: [
    ],
    amount
  },
  getters: {
    getNode: state => {
      return state.node
    }
  },
  mutations: {
    changeNode (state, payload) {
        console.log(state)
        console.log(payload)
        
        state.node = payload
    }, 
    changeGen (state, payload) {
      console.log(state)
      console.log(payload)
      
      state.amount = payload
  }
  }
})