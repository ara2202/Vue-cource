<template>
  <div id="smartTable">
    <div id="smartTableHeader">
      <div class="pagination">
        <Pagination v-model="activePage" :pages-amount="getPagesAmount" />
      </div>
      <div><Select v-model.number="amountPerPage" class="select" /></div>

      <div>
        <p>Всего пользователей: {{ getTotalRows }}</p>
      </div>
      <div>
        <CoolButton :text="buttonHideText" @click="toggleShowUsers" />
      </div>
    </div>
    <UserList
      :start-index-number="(activePage - 1) * amountPerPage"
      :users="getUsersToShow"
      :show-users="showUsers"
      @editUser="editUser"
      @deleteUser="deleteUser"
    />
  </div>
</template>

<script>
import Select from '@/components/Select.vue'
import Pagination from '@/components/Pagination.vue'
import UserList from '@/components/UserList.vue'
import CoolButton from '@/components/CoolButton.vue'
export default {
  components: {
    Select,
    Pagination,
    CoolButton,
    UserList
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    amountPerPage: 10,
    activePage: 1,
    showUsers: true
  }),
  computed: {
    getPagesAmount() {
      return Math.ceil(this.getTotalRows / this.amountPerPage)
    },
    getTotalRows() {
      return this.users.length
    },
    getUsersToShow() {
      const from = (this.activePage - 1) * this.amountPerPage
      const to = this.activePage * this.amountPerPage
      return this.users.slice(from, to)
    },
    buttonHideText: function() {
      return this.showUsers ? 'Скрыть пользователей' : 'Показать пользователей'
    }
  },
  watch: {
    amountPerPage: {
      handler: 'updateActivePage'
    }
  },
  methods: {
    toggleShowUsers() {
      this.showUsers = !this.showUsers
    },
    editUser(id) {
      this.$emit('editUser', id)
    },
    deleteUser(id) {
      this.$emit('deleteUser', id)
    },
    updateActivePage() {
      if (this.activePage > this.getPagesAmount) {
        this.activePage = this.getPagesAmount
      }
    }
  }
}
</script>

<style lang="scss">
#smartTable {
  background: #13505b;
  color: white;
}
#smartTableHeader {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10%, 250px));
  grid-gap: 10px;
  justify-items: center;
  align-items: end;
}
</style>
