<template>
<div class="graph-container">

<p v-if="elements == null"> No File Selected. Please Upload JSON File. </p> 

      <cytoscape
      ref="cy"
      class="cy-graph"
      :preConfig="preConfig"
      :config="config"
      :afterCreated="afterCreated"
      v-on:cxttapend="addNode"
      >
      <cy-element
        v-for="element in elements"
        :definition="element"
        :key="`${element.data.id}`"
        :sync="true"
        v-on:mousedown="selectNode(element.data)"
      > 
      </cy-element>
    </cytoscape>

<!--
<div>
        <b-button block v-b-toggle.collapse-1 variant="primary">Toggle Edit Menu</b-button>
          <b-collapse id="collapse-1" class="mt-2" visible>
            <b-form @submit="onSubmit">
            <label class="sr-only" for="inline-form-input-name">Node Name </label>

    <b-form-input
      id="inline-form-input-name"
      v-model="data.nodeS[0].name"
      class="mb-2 mr-sm-2 mb-sm-0"
      :placeholder="data.nodeS[0].name.toString()"
    ></b-form-input>

    <b-form-group label="Node Type" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-2"
        v-model="data.nodeS[0].type" 
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component"
      >
        <b-form-radio v-model="data.nodeS[0].type" :aria-describedby="ariaDescribedby" :name=" data.nodeS[0].type" value="Discrete"> Discrete</b-form-radio>
        <b-form-radio v-model="data.nodeS[0].type" :aria-describedby="ariaDescribedby" :name=" data.nodeS[0].type" value="Continuous"> Continuous</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <div v-if="data.nodeS[0].type == 'Continuous'">
      <label class="sr-only" for="inline-form-input-name">Min</label>
      <b-form-input
        id="inline-form-input-name"
        v-model="data.nodeS[0].min"
        class="mb-2 mr-sm-2 mb-sm-0"
        :placeholder="data.nodeS[0].min.toString()"
      ></b-form-input>

      <label class="sr-only" for="inline-form-input-name">Max</label>
      <b-form-input
        id="inline-form-input-name"
        v-model="data.nodeS[0].max"
        class="mb-2 mr-sm-2 mb-sm-0"
        :placeholder="data.nodeS[0].max.toString()"
      ></b-form-input>
    </div>

    <div v-else> 
      <label class="sr-only" for="inline-form-input-name">Level</label>
      <b-form-input
        id="inline-form-input-name"
        v-model="data.nodeS[0].min"
        class="mb-2 mr-sm-2 mb-sm-0"
        :placeholder="data.nodeS[0].min.toString()"
      ></b-form-input>
    </div>

          </b-form>

          <p></p>

          <b-button variant="danger" v-on:click="deleteNode(data.nodeS[0])">Delete Node</b-button>
          
        </b-collapse>
      </div>
      -->
<!--

    <label for="range-2">Generate Data From Graph</label>
    <b-form-input id="range-2" v-model="data.value" v-on:click="changeGen(data.value)" type="range" min="50" max="500" step="50" debounce="500"></b-form-input>
    <div class="mt-2">Amount: {{ data.value }}</div>
    
    <b-button variant="success"  v-on:click="generateData(data.value)">Generate Data</b-button>
<p></p>
<b-button  v-on:click="test()" variant="primary"> Change JSON </b-button>
-->

</div>
</template>

<script>
import dagre from "cytoscape-dagre"
import cxtmenu from "cytoscape-cxtmenu"
import edgehandles from "cytoscape-edgehandles"
import navigator from "cytoscape-navigator"
import panzoom from "cytoscape-panzoom"
import MY_JSON from '../test_data/data_lowes.json'
import { jsonData } from "../data/data"
import { selectedNode } from "../data/selected"
import JSONVUE from './JSON.vue'
import undoRedo from "cytoscape-undo-redo";

import dataGen from '../test_data/data_lowes.json'
const axios = require('axios').default

export default {
  name: "CytoscapeGraph",
  myJson: MY_JSON,
  jsonVue: JSONVUE,
  props: {
    msg: String,
  },
  computed: {
    cyInstance() {
      return this.$refs.cy.instance;
    },
    // data() {
    //   const nodeS = selectedNode.state.node
    //   return [nodeS]
    // },
    data() {
      return{
        nodeS: [
          selectedNode.state.node,
        ],
        gen: {Store: "1"},
        value: selectedNode.state.amount
      }
    },
    elements() {
      console.log("ELES");
      console.log(jsonData.state.json.nodes.length);
      if (jsonData.state.json.nodes.length > 0) {
      const nodes = jsonData.state.json.nodes;
      
      const edges = jsonData.state.json.edges;
      return [...nodes, ...edges];
      } else {
        return null
      }
    },
    config() {
      return {
        edit: '',
        boxSelectionEnabled: false,
        style: [
          {
            selector: "node[name]",
            style: {
              'content': 'data(name)',
              'text-valign': 'center',
              'text-halign': 'center'
              
            }
          },
          {
            selector: ':parent',
            css: {
              'text-valign': 'center',
              'text-halign': 'center',
            }
          },

          {
            selector: ':selected',
            style: {
              'background-color': 'blue',
            }
          },

          {
            selector: 'edge',
            css: {
              'curve-style': 'bezier',
              'target-arrow-shape': 'triangle-tee'
            }
          },
          {
            selector: '.eh-handle',
            style: {
              'background-color': 'red',
              'width': 12,
              'height': 12,
              'shape': 'ellipse',
              'overlay-opacity': 0,
              'border-width': 12, // makes handle easier to hit
              'border-opacity': 0
            }
          },
          {
            selector: '.eh-hover',
            style: {
              'background-color': 'blue'
            }
          },
          {
            selector: '.eh-source',
            style: {
              'border-width': 2,
              'border-color': 'blue'
            }
          },
          {
            selector: '.eh-target',
            style: {
              'border-width': 2,
              'border-color': 'blue'
            }
          },
          {
            selector: '.eh-preview, .eh-ghost-edge',
            style: {
              'line-color': 'blue',
              'target-arrow-color': 'blue',
              'source-arrow-color': 'blue'
            }
          },
          {
            selector: '.eh-ghost-edge.eh-preview-active',
            style: {
              'opacity': 0
          }
        }
        ],
        layout: {
          name: "dagre",
        },
      };
    },
  },
  methods: {
    preConfig(cytoscape) {
      cytoscape.use(dagre);
      cytoscape.use(cxtmenu);
      cytoscape.use(edgehandles);
      cytoscape.use(navigator);
      cytoscape.use(panzoom);
      cytoscape.use(undoRedo);
    },
    onSubmit(event) {
        event.preventDefault()
        console.log(this.data)
        alert(JSON.stringify(this.form))
    },
    editBox(element) {
      const h = this.$createElement
      const messageNode = h('div', { class: ['foobar'] }, [
        h('b-form', 'Hello')
      ])
      console.log(element)
      this.edit = ''
      this.$bvModal.msgBoxConfirm([messageNode])
        .then(value => {
          this.edit = value
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectNode(node) {
      //console.log(node);
      selectedNode.commit('changeNode', node );
    },
    changeGen(val) {
      //console.log(val);
      selectedNode.commit('changeGen', val );
    },
    test() {
      getTheFile()
    },
    redraw(cy) {
      var my_layout = cy.makeLayout({name: 'dagre'})
      my_layout.run()
    },
    generateData(value){
      console.log(value)
      console.log("-------------------------------------")
      console.log(dataGen)
      console.log("-------------------------------------")
      console.log(jsonData.getters.getNode)
      //jsonData.commit('saveData')
      
      
      axios
      .post('https://cytofastapi.herokuapp.com/getData?no_samples=' + value, jsonData.getters.getNode)
      .then(response => {
        console.log("-----------------*******--------------------")
        console.log(response)
        //console.log(response.data)
        saveJSON(response.data, 'genData-' + value + '.json')
        //jsonData.commit('addData', response)
        //this.gen = response.data
        //console.log(this.gen)
        
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
    addNode(event) {
      console.log(event.target, this.$refs.cy.instance);
      console.log(event.position);
    
      if (event.target === this.$refs.cy.instance) {
        console.log("adding node", event.target);
      }

      var nodeid = 0
      nodeid = makeid(5);

      var obj = {
        data: {"id": "x_" + nodeid, "name": "New Node", "type": "nodeType", "min": 0, "max": 0},
        position: event.position
      }

      jsonData.commit('addNode', obj );
      selectedNode.commit('changeNode', obj.data);
    },
    editNode(event, id) {
      const ele = this.elements.some((ele, index) => {
        console.log(ele.data.id)
        console.log(id)
        const match = ele.data.id == id
        if (match) {
          console.log("Index" + index)
          //jsonData.commit('removeNode', ele.id())
        }
        return match
      })
      console.log(event)
    console.log(ele)
    },
    updateNode(event) {
      console.log(event.target.data().label)
      let label = event.target.data().label
      label += label[0]
      event.target.data({ label })
    },
    afterCreated(cy) {

      //cy.makeLayout({name: 'dagre'}).run()

      console.log("selectedNode")
      //var sel = selectedNode.getters.getNode 
      cy.pan({x: 300, y: 160})
      cy.zoom(2)

      var ur = cy.undoRedo({
                    isDebug: true
                });

      //console.log("NEW JSON: " + jsonData.state.json.nodes)
      //console.log("NEW VUE: ")
      //console.log(jsonVue)
      //console.log("VUEX CALL ____ : " + this.$jsonData)
      //console.log("OLD JSON: " + MY_JSON)

      //var jsonFile = JSON.stringify(jsonData.state);
      //var jsonFile = JSON.stringify(jsonData.state.json);
      //var list = JSON.parse(jsonFile);
      // cy.json({ elements: list });
      // var my_layout = cy.makeLayout({name: 'dagre'});
      // my_layout.run();

      // cy.cxtmenu({
      //     selector: 'node',
      //     commands: [
      //       {
      //         content: 'Edit [N/A]',
      //         select: function(ele){
      //           var num 
      //           var currentName = ele._private.data.name
      //           var editName = prompt("Please enter name", "New Name")

      //           jsonData.state.json.nodes.forEach((element, index) => {
      //             console.log("CHAGE NAME INFO: " + element.data.name)
      //             console.log("CHAGE NAME INFO: " + currentName)
      //             console.log("NUM: " + index)
      //             if (currentName == element.data.name) {num = index}
      //           });
      //           console.log("CHAGE NUMBVER INFO: " + num)
                
      //           ele.data('name', editName);
      //           console.log(ele._private.data);
      //           var payload = {'key1': editName, "key2": num}
      //           jsonData.commit('changeName', payload );
                
      //         }
      //       },
      //       {
      //         content: 'Delete',
      //         select: function(ele){
      //           console.log( ele );
      //           //cy.remove('#' + ele.id());
      //           jsonData.commit('removeNode', ele.id())
      //         }
      //       }, 
      //       {
      //         content: 'Open',
      //         select: function(ele){
      //           console.log( ele.id() );
      //           console.log( ele.data('name') );
      //           //this.button()
      //           this.$popup('append', 'foobar')
      //           //alert( "Name: " + ele.data('name')  +"\nType: " + ele.data('type'));
      //         }
      //       }
      //     ]
      //   });

        cy.cxtmenu({
          selector: 'core',
          commands: [
            // {
            //   content: 'Add Node',
            //   select: function(){
            //     // TODO need to check whether this is unique
            //     var nodeid = 0;
            //     nodeid = makeid(5);
                
            //     // get mouse position
            //     // TODO: make it work on touch screens
            //     var e = window.event;
            //     var pos = {x: e.offsetX, y: e.offsetY};
            //     console.log(pos);

            //     var nodeName = prompt("Please enter name", "Node");
            //     var nodeType = prompt("Please enter type", "Type");

            //     // cy.add({
            //     //   "group": "nodes",
            //     //   "data": {"id": "x_" + nodeid, "name": nodeName, "type": nodeType, "min": 0, "max": 0},
            //     //   renderedPosition: pos
            //     // })

            //     var obj = {
            //       data: {"id": "x_" + nodeid, "name": nodeName, "type": nodeType, "min": 0, "max": 0},
            //       position: pos
            //     }

            //     console.log(obj);

            //     //var payload = {'key1': obj}
            //     jsonData.commit('addNode', obj );
            //   }
            // },
            {
              content: 'Redraw',
              select: function(){
                var my_layout = cy.makeLayout({name: 'dagre'})
                my_layout.run()
              }
            },
            {
              content: 'Undo [N/A]',
              select: function(){
                console.log("UNDO: ");
                console.log(ur);
                
                ur.undo();
                //eles.restore();
              }
            },
            {
              content: 'Save JSON',
              select: function(){
                cy.remove('.eh-handle')
                saveJSON(cy.json()['elements'], 'data_myData.json')
              }
            }
          ]
        });

      cy.cxtmenu({
          selector: 'edge',
          commands: [
            {
              content: 'Invert',
              select: function(ele){
                console.log( ele.data('source') + '->' + ele.data('target') );
                var ele_new = ele.clone();
                ele_new.data().source = ele.data().target;
                ele_new.data().target = ele.data().source;
                cy.remove('#' + ele.id());
                cy.add(ele_new)
              },
              //enabled: false
            },
            {
              content: 'Delete',
              select: function(ele){
                console.log( ele.id() );
                cy.remove('#' + ele.id());
              }
            }
          ]
        });

      let eh = cy.edgehandles({
          enabled: true
        }); 

      if (this.$toggle) {
        eh.enableDrawMode();
      } else {
        eh.disableDrawMode();
      }
      //eh.disableDrawMode();
      
      //eh.enable();

      // cy.on('ehstart', (event, sourceNode) => {
      //     console.log("HOVER: " + event.posistion);
      //     console.log("HOVER: " + sourceNode);
      // });

      console.log(eh);

      cy.navigator({
          container: false, 
          viewLiveFramerate: 0, 
          thumbnailEventFramerate: 30, 
          thumbnailLiveFramerate: false, 
          dblClickDelay: 200, 
          removeCustomContainer: true, 
          rerenderDelay: 100       
        });

      cy.panzoom({
        zoomFactor: 0.05, // zoom factor per zoom tick
        zoomDelay: 45, // how many ms between zoom ticks
        minZoom: 0.1, // min zoom level
        maxZoom: 10, // max zoom level
        fitPadding: 50, // padding when fitting
        panSpeed: 10, // how many ms in between pan ticks
        panDistance: 10, // max pan distance per tick
        panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
        panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
        panInactiveArea: 8, // radius of inactive area in pan drag box
        panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
        zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
        fitSelector: undefined, // selector of elements to fit
        animateOnFit: function(){ // whether to animate on fit
          return false;
        },
        fitAnimationDuration: 1000, // duration of animation on fit

        // icon class names
        sliderHandleIcon: 'fa fa-minus',
        zoomInIcon: 'fa fa-plus',
        zoomOutIcon: 'fa fa-minus',
        resetIcon: 'fa fa-expand'
        }); 

      imposeConstraints(cy);

      //this.cyInstance.makeLayout({ name: "dagre" }).run();
    },
  },
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


//jsonData.commit('addNode', obj );

//src\test_data\data_test.json
//C:\Users\Lucas Dickson\Downloads\data-tools-vue\src\test_data\data_test.json


// function loadFile(filename, cy) {
//   // using Promise
//   fetch(filename, {
//       headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }
//     })
//     .then(response => {
//       console.log("HELP" + response);
//       return response.json();
//     })
//     .then(parsed => {
//       console.log("DATA" + parsed);
//       cy.json({ elements: parsed });
//       var my_layout = cy.makeLayout({name: 'dagre'});
//       my_layout.run();
//     })
//     .catch(err => {
//       console.log("ERROR" + err);
//     })
// }

// function getURLParameter(name) {
//   return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
// }

function imposeConstraints(cy) {
  cy.on('add', 'edge', function(evt){
    var edge = evt.target;
    var all_edges = cy.edges("[source = '" + edge.source().id()+"'][target = '" + edge.target().id() + "']");

    if (all_edges.length >= 2) {
      cy.remove('#' + edge.id());
    }

    // if want to allow bi-directionality comment these lines
    var all_edges_invert = cy.edges("[target = '" + edge.source().id()+"'][source = '" + edge.target().id() + "']");

    if (all_edges_invert.length >= 1) {
      cy.remove('#' + edge.id());
    }
  });
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

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- use ::v-deep and scoped css in real projects -->
<style lang="scss" >
#cytoscape-div {
  height: 100% !important;
  min-height: unset !important;
}

.graph-container {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cy-graph {
  height: 600px;
  width: 100%;
  background: lightgrey;
  border: 1px solid blue;
  display: block;
}
</style>
