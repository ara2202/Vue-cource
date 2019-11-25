<template>
  <div class="form-group">
    <label for="Select">На странице по</label>
    <select id="Select" class="form-control" @input="changeAmountPerPage">
      <option>5</option>
      <option>10</option>
      <option>15</option>
      <option>20</option>
      <option>50</option>
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
  watch: {
    localAmountPerPage: {
      handler() {
        this.$emit('changeAmountPerPage', this.localAmountPerPage)
      }
    }
  },
  methods: {
    changeAmountPerPage(e) {
      this.$emit('changeAmountPerPage', e.target.value)
      //console.log(e)
    }
  }
}
</script>
