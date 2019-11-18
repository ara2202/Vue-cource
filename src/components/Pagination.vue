<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="onPrevClick()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pagesAmount" :key="page" :class="isActivePage(page)" class="page-item">
        <a class="page-link" href="#" @click="onLinkClick(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="onNextClick()">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'activePage',
    event: 'activePageChange'
  },
  props: {
    pagesAmount: {
      type: Number,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    localActivePage: 1
  }),
  watch: {
    localActivePage: {
      handler() {
        this.$emit('activePageChange', this.localActivePage)
      }
    }
  },
  created() {
    this.localActivePage = this.activePage
  },
  methods: {
    onLinkClick(pageNumber) {
      this.localActivePage = pageNumber
    },
    onNextClick() {
      this.localActivePage =
        this.localActivePage < this.pagesAmount ? this.localActivePage + 1 : this.localActivePage
    },
    onPrevClick() {
      this.localActivePage = this.localActivePage > 1 ? this.localActivePage - 1 : 1
    },
    isActivePage(page) {
      return { active: this.localActivePage === page }
    }
  }
}
</script>
