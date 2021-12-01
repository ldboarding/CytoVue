<template>
<div id="App">
  <!-- <p> {{ info }} </p> -->
  <v-app>
    <v-app-bar 
      app
      clipped-left
      color="indigo accent-4"
      dark
    >
    <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
    <v-toolbar-title>CytoVue</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    
    <b-col sm="2">
      <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="text"></b-form-input>
    </b-col>
    <b-col sm=".5">
      <b-button size="sm" class="my-2 my-sm-0" v-on:click="search(text)">Search</b-button>
    </b-col>

    </v-app-bar>
<!--
        <v-app-bar app clipped-left color="blue">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"> = </v-app-bar-nav-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <Header :menu="menu" /> 
        </v-app-bar>
      
      <v-navigation-drawer 
      app 
      clipped 
      v-model="drawer"
      
      >
    
    <button> JSON </button>
    <b-button  v-on:click="test()" variant="primary"> Change JSON </b-button>
      </v-navigation-drawer>
-->
      <v-navigation-drawer
        app
        clipped
        permanent
        expand-on-hover
        :mini-variant.sync="mini"
      >

      <v-list>

      <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Current File
              </v-list-item-title>
              <v-list-item-subtitle>{{ selected.file }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list>

      <v-divider></v-divider>
        <v-list
          dense
        >
          <v-list-item-group
          link
        >
          <v-list-item @click="upload(); drawer = false">
            <v-list-item-icon>
              <v-icon>mdi-cloud-upload</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Upload Graph</v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Download Graph</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-code-json</v-icon>
            </v-list-item-icon>
          

          <v-dialog
      v-model="dialog"
      width="550"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title 
        v-bind="attrs"
          v-on="on"
        >Generate Data</v-list-item-title>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Generate Data From Graph
        </v-card-title>

        <v-card-text>
          <b-form-input id="range-2" v-model="value"  type="range" min="50" max="500" step="50" debounce="500"></b-form-input>
          <div class="mt-2">Amount: {{ value }}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false; generateData(value)"
          >
            Generate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-list-item>

        </v-list-item-group>

        <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Selected Node
              </v-list-item-title>
              </v-list-item-content>
          </v-list-item>

          <v-list-item @click="drawer = false">
            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
            <b-form-input
                id="inline-form-input-name"
                v-model="selected.sel[0].name"
                :placeholder="selected.sel[0].name"
              ></b-form-input>
              </v-list-item-title>
          </v-list-item>

          <v-list-item @click="drawer = false; deleteNode(selected.sel[0])">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Delete Node</v-list-item-title>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
  
  <v-main app>
  <v-container app absolute>
    <CytoscapeGraph :test="test"/>
  </v-container>
  </v-main>

    </v-app>
  </div>
</template>

<script>
import CytoscapeGraph from "./components/CytoscapeGraph";
import { jsonData } from "./data/data"
import { selectedNode } from "./data/selected"
var test
const axios = require('axios').default

export default {
  name: "App",
  components: {
    CytoscapeGraph
  },
  
  data() {
    return {
      test,
      text: '',
      dialog: false,
      info: null,
      showGraph: false,
      drawer: false,
      mini: true,
      sheet: false,
      value: selectedNode.state.amount,
      items: [
        { title: 'Upload Graph', icon: 'mdi-view-dashboard' },
        { title: 'Save Current Graph', icon: 'mdi-forum' },
        { title: 'Generate Data', icon: 'mdi-forum' },
      ],
      nodeS: [
        selectedNode.state.node,
      ]
    };
  }, 

  computed: {
    selected() {
      return {
        sel: [
          selectedNode.state.node
        ], 
        value: selectedNode.state.amount,
        file: jsonData.state.fileName
      }
    }
  },
  methods: {
    graph() {
      console.log("GRAPH")
      this.showGraph = !this.showGraph
    },
    upload() {
      getTheFile()
    }, 
    search(name) {
      console.log(name)
      //selectedNode.commit('changeNode', name );
      jsonData.commit('searchNode', name );
    },
    generateData(value){
      console.log(value)
      console.log("-------------------------------------")
      console.log(jsonData.getters.getNode)
      
      axios
      .post('https://cytofastapi.herokuapp.com/getData?no_samples=' + value, jsonData.getters.getNode)
      .then(response => {
        console.log("-----------------*******--------------------")
        console.log(response)

        saveJSON(response.data, 'genData-' + value + '.json')
      })
      .catch(error => {
        console.log(error)
      })
      
    },
    deleteNode(node) {
      //selectedNode.commit('changeNode', node );
      console.log("DELETE")
      console.log(node.id)
      //this.nodeS = null
      //ur.do("remove", selectedNode.state.node);
      jsonData.commit('removeNode', node.id)
    },
  }
};

const pickerOpts = {
  types: [
    {
      description: 'JSON',
      accept: {
        'JSON/*': ['.json']
      }
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false
};

async function getTheFile() {
  // open file picker
  var fileHandle = null;
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  console.log(fileHandle);

  // get file contents
  const fileData = await fileHandle.getFile();
  console.log("FILE DATA: " + fileData.name);

  jsonData.commit('changeJSON', fileData)
  //loadFile("test_data/" + fileData.name);
}

function saveJSON(data, filename){
    if(!data) {
        console.error('No data')
        return;
    }
    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

/*
<v-btn @click="graph()"> SHOW </v-btn>
        <div v-if="showGraph">
*/
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style>
  @import './assets/styles/cytoscape.js-navigator.css';
</style>

<style>
  @import './assets/styles/cytoscape.js-panzoom.css';
</style>

<style src="ciao-vue-popup/dist/ciao-vue-popup.css"></style>


// <div class="json">
//             <v-btn block v-on:click="load()"> Load File </v-btn>
//           </div>

