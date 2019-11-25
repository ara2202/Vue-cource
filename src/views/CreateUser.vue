<template>
  <div class="container">
    <UserForm v-model="user" button-text="Создать пользователя" @submit="sendForm" />
  </div>
</template>

<script>
import axiosInstance from '@/utils/http.js'
import uuidv4 from 'uuid/v4'
import UserForm from '@/components/UserForm.vue'

export default {
  components: {
    UserForm
  },
  data: function() {
    return {
      user: {
        firstName: '',
        lastName: '',
        isActive: false,
        balance: 0,
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    sendForm: async function() {
      const { firstName, lastName, email, phone } = this.user

      if (firstName && lastName && email && phone) {
        try {
          const date = new Date(Date.now())
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
          }
          const dateStr = date.toLocaleDateString('en-EN', options)
          const newUser = Object.assign({}, this.user, { id: uuidv4(), registered: dateStr })

          await axiosInstance.post('/users', newUser)
          this.$router.push('/')
        } catch (e) {
          console.error(e)
        }
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
