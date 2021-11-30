<template>
    <div id="data-list">
<div>
  <b-button v-b-toggle.collapse-1 variant="primary">Toggle Data List</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
        <h2 class="header" >Data List</h2>
        <ul>
            <li v-for="item in data" :key="item.data.name">
                <span class="name">{{ item.data.name }} : </span>
                <span class="type">{{ item.data.type }}</span>
                <v-btn x-small dark block v-on:click="button(item.data.name, item.data.type)"> Open </v-btn>                
            </li>
        </ul>
    </b-card>
  </b-collapse>
</div>
    </div>
</template>

<script>
import { jsonData } from "../data/data"
import Form from './Form.vue'

export default ({
    componets: {
    },
    computed: {
        data(){
            console.log("DATA: " + jsonData.state.json)
            
            return jsonData.state.json.nodes;
        }
    },
    methods: {
        getData(item) {
            alert( "Name: " + item.data.name  +"\nType: " + item.data.type);
        }, 
        button(node, type) {
            console.log(node + type)

            this.$popup('append', {
                form: Form,
                apply: {
                    callback(data) {
                         alert(`Quantity: ${data}`)
                    }
                },
            })
        }
    }
})
</script>

<style scoped>
#data-list{
    background: #D1E4FF;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
}
#data-list ul{
    padding: 0;
    list-style-type: none;
}
#data-list li{
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
}
.name{
    font-weight: bold;
    color: #860CE8;
}
.type{
    font-weight: normal;
    color: #147207;
}

h2.header {
    text-align: center;
}

</style>
