<template>
  <div v-if="!user" class="alert alert-warning">
    <i class="fa fa-refresh fa-spin" />
    Загрузка
  </div>
  <div v-else class="container">
    <UserForm v-model="user" button-text="Внести изменения" @submit="sendForm" />
  </div>
</template>

<script>
import axiosInstance from '@/utils/http.js'
import UserForm from '@/components/UserForm.vue'
export default {
  components: {
    UserForm
  },
  data: function() {
    return {
      user: null
    }
  },
  mounted: function() {
    this.loadUser(this.$route.params.id)
  },
  methods: {
    async loadUser(id) {
      try {
        const res = await axiosInstance.get(`/users/${id}`)
        this.user = res.data
      } catch (e) {
        console.error(e)
      }
    },
    sendForm: async function() {
      try {
        await axiosInstance.put(`/users/${this.user.id}`, this.user, {
          headers: { 'content-type': 'application/json' }
        })
        this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
