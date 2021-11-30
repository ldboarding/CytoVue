import Vue from 'vue';
import Vuex from 'vuex';

const fs = require( 'fs' );
const moveFrom = "../test_data";

(async () => {
    try {
        const files = await fs.promises.readdir( moveFrom );

        for ( const file in files ) {
            console.log("------------------")
            console.log(file)
        }
    }
    catch (e) {
        console.log(e)
    }
})();

Vue.use(Vuex);

export const listFolder = new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  }
})