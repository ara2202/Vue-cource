<template>
  <input ref="calendar" class="form-control" type="text" :value="value" />
</template>

<script>
import FlatPickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    fp: null
  }),
  watch: {
    value: 'updateDatePicker'
  },
  mounted() {
    this.fp = FlatPickr(this.$refs.calendar, {
      dateFormat: 'd.m.Y',
      onChange: (_, dateStr) => this.$emit('input', dateStr)
    })
  },
  beforeDestroy() {
    if (this.fp) {
      this.fp.destroy()
    }
  },
  methods: {
    updateDatePicker() {
      if (this.fp) {
        this.fp.setDate(this.value)
      }
    }
  }
}
</script>

<style></style>
