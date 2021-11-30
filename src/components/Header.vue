<template>
<div>
  <b-navbar type="dark" variant="primary">
    <b-navbar-brand href="#">CytoVue</b-navbar-brand>
    
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="text"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" v-on:click="search(text)">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

  </b-navbar>
</div>
</template>

<script>
import { jsonData } from "../data/data"

export default {
  name: "Header",
  props: {
    menu: {
      type: Array,
    },
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    search(name) {
      console.log(name)
      //selectedNode.commit('changeNode', name );
      jsonData.commit('searchNode', name );
    }
  }
};
</script>
