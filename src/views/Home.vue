<template>
  <PaginatedTable :users="users" @editUser="editUser" @deleteUser="deleteUser" />
</template>

<script>
import PaginatedTable from '@/components/PaginatedTable.vue'
import axiosInstance from '@/utils/http.js'

export default {
  name: 'Home',
  components: {
    PaginatedTable
  },
  data() {
    return {
      users: []
    }
  },
  mounted: function() {
    this.loadUsers()
  },
  methods: {
    async deleteUser(id) {
      try {
        await axiosInstance.delete(`/users/${id}`)
        this.users = this.users.filter(item => item.id !== id)
      } catch (e) {
        console.error(e)
      }
    },
    async loadUsers() {
      try {
        const res = await axiosInstance.get('/users')
        this.users = res.data
      } catch (e) {
        console.error(e)
      }
    },
    editUser(id) {
      this.$router.push(`/user/${id}`)
    }
  }
}
</script>
