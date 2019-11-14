<template>
  <form @submit="sendForm">
    <div v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <p>Имя пользователя</p>
    <input v-model="user.firstName" placeholder="Введите имя пользователя" />
    <p>Фамилия пользователя</p>
    <input v-model="user.lastName" placeholder="Введите фамилию пользователя" />
    <br />
    <br />
    <input id="checkbox" v-model="user.isActive" type="checkbox" />
    <label for="checkbox">Активен</label>
    <p>Начальный баланс</p>
    <input v-model="user.balance" placeholder="Введите баланс пользователя" />
    <p>Email</p>
    <input v-model="user.email" placeholder="Введите email пользователя" />
    <p>Phone</p>
    <input v-model="user.phone" placeholder="Введите телефон пользователя" />
    <CoolButton text="Create User" @click="sendForm" />
    <!--<p> <input type="submit" value="Create User"> </p>-->
  </form>
</template>

<script>
import axiosInstance from '@/utils/http.js'
import uuidv4 from 'uuid/v4'
import CoolButton from './CoolButton.vue'
export default {
  components: {
    CoolButton
  },
  data() {
    return {
      errors: [],
      user: {
        firstName: null,
        lastName: null,
        isActive: false,
        balance: 0,
        email: null,
        phone: null
      }
    }
  },
  methods: {
    sendForm: async function() {
      //e.preventDefault();

      const { firstName, lastName, email, phone } = this.user

      if (firstName && lastName && email && phone) {
        // TODO: обернуть в try - catch, показывать сообщение об успешном создании
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

        await axiosInstance.post('/users', JSON.stringify(newUser), {
          headers: { 'content-type': 'application/json' }
        })
        this.$router.push('/')
        //return true;
      }

      this.errors = []

      if (!this.firstName) {
        this.errors.push('Требуется указать имя.')
      }
      if (!this.lastName) {
        this.errors.push('Требуется указать фамилию.')
      }
      if (!this.email) {
        this.errors.push('Требуется указать email.')
      }
      if (!this.phone) {
        this.errors.push('Требуется указать телефон.')
      }
    }
  }
}
</script>

<style></style>
