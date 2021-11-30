<template>
  <div foobar>
    <h4>Custom Form</h4>

    <strong>Select quantity</strong>

    <select class="form-control" v-model="quantity" @change="syncData">
      
    </select>
  </div>
</template>

<script lang="babel" type="text/babel">
export default {
  data() {
    return {
      quantity: 1,
    }
  },
  mounted() {
    this.syncData()
  },
  methods: {
    syncData() {
      this.$emit('updateData', this.quantity)
    }
  },
}
</script>