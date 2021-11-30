<template>
    <div id="start-list">
<div>
  <b-button v-b-toggle.collapse-1 variant="primary">Toggle Data List</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
        <h2 class="header" >Data List</h2>
        <ul>
            <li v-for="item in data" :key="item.data.name">
                <span class="name">{{ item.data.name }} : </span>
                <v-btn x-small dark block v-on:click="button()"> Open </v-btn>    
            </li>
        </ul>
    </b-card>
  </b-collapse>
</div>
    </div>
</template>

<script>

export default ({
    componets: {
    },
    computed: {
        data(){
            
            //const path = require( 'path' );
            
            //getData()
            
            return null;
        }
    },
    methods: {
        async getData() {
            const fs = require( 'fs' );

            const moveFrom = "../test_data";
            const files = await fs.promises.readdir( moveFrom );

            for ( const file in files ) {
                console.log(file)
            }
        }, 
        button() {

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