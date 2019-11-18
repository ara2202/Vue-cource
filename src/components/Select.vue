<template>
  <div class="form-group">
    <label for="Select">На странице по</label>
    <select id="Select" v-model.number="localAmountPerPage" class="form-control">
      <option>5</option>
      <option>10</option>
      <option>15</option>
      <option>20</option>
    </select>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'amountPerPage',
    event: 'changeAmountPerPage'
  },
  props: {
    amountPerPage: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    localAmountPerPage: null
  }),
  watch: {
    localAmountPerPage: {
      handler() {
        this.$emit('changeAmountPerPage', this.localAmountPerPage)
      }
    }
  },
  created() {
    this.localAmountPerPage = this.amountPerPage
  }
}
</script>
