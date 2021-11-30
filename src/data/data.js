import Vue from 'vue';
import Vuex from 'vuex';
//import json from '../test_data/data_lowes.json';
//import json from '../test_data/data_Big.json';
import jsonTestTest from '../test_data/data_test.json'
import { selectedNode } from "../data/selected"
var file = null

Vue.use(Vuex);

export const jsonData = new Vuex.Store({
  state: {
    json: {
      nodes: [

      ],
      edges: [

      ]
    }, 
    fileName: file,
  },
  getters: {
    getNode: state => {
      return state.json
    }
  },
  mutations: {
    changeName (state, payload) {
      console.log(payload)
      state.json.nodes[payload.key2].data.name = payload.key1;
    }, 
    saveData (state) {
      console.log("-------")
      console.log(state.json.nodes)
      //state.json.nodes[payload.key2].data.name = payload.key1;
    }, 
    searchNode(state, name) {
      console.log("Name: ")
      console.log(name)
      console.log(state.json.nodes[0].selected)
      var search
      state.json.nodes.forEach((element, index) => {
        if(element.data.name == name) {
          state.json.nodes[index].selected = true
          //state.json.nodes[index].data.name = "Selected";
          console.log("SELECTED: ")
          console.log(state.json.nodes[index])
          
          search = element.data
          selectedNode.commit('changeNode', search );
        }
      })
      //state.json.nodes.push("payload");
    }, 
    addNode (state, payload) {
      state.json.nodes.push(payload);
    },
    removeNode (state, payload) {
      var num;
      state.json.nodes.forEach((element, index) => {
        if(element.data.id == payload) {num = index}
      })

      if(num == 0) {
        state.json.nodes.shift()
      } else if (num == state.json.nodes.length){
        state.json.nodes.pop()
      } else {
        state.json.nodes.splice(num, 1)
      }

    },
    addData(state, payload){
      console.log(payload)
      console.log(state)
    },
    getData (state, payload) {
      console.log(payload)
      console.log(state)
    }, 
    async changeJSON (state, payload) {
      console.log("PAYLOAD: ")
      console.log(payload.name)
      console.log("STATE: ")
      console.log(state)

      var imp = await import('../test_data/' + payload.name)
      var jsonTest = { nodes: imp.nodes, edges: imp.edges }

      console.log("STATE: ")
      console.log(jsonTestTest)
      console.log("STATE: ")
      console.log(jsonTest)

      state.fileName = payload.name
      state.json = jsonTest
    }
  }
  })