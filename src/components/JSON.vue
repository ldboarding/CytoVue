<template>
  <div class="json">
    <v-btn block v-on:click="load()"> Load File </v-btn>
  </div>
  
</template>

<script>
//import { jsonData } from "../data/data"
//const axios = require('axios').default
var test 

export default ({
    componets: {
    },
    computed: {
        data(){
            return test;
        },
        
    },
    methods: {
        async load() {

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

            var fileHandle = null;
            [fileHandle] = await window.showOpenFilePicker(pickerOpts);
            console.log(fileHandle);

            // get file contents
            const fileData = await fileHandle.getFile();
            console.log("FILE DATA: " + fileData.name);

            test = fileData
        }
    }
})
</script>