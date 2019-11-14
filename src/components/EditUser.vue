<template>
 
    <form @submit="sendForm">
    <p v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <p>Имя пользователя</p>
    <input v-model="user.firstName" placeholder="Введите имя пользователя" />
    <p>Фамилия пользователя</p>
    <input v-model="user.lastName" placeholder="Введите фамилию пользователя" />
    <br/>
    <br/>
    <input id="checkbox" v-model="user.isActive" type="checkbox" />
    <label for="checkbox">Активен</label>
    <p>Начальный баланс</p>
    <input v-model="user.balance" placeholder="Введите баланс пользователя" />
    <p>Email</p>
    <input v-model="user.email" placeholder="Введите email пользователя" />
    <p>Phone</p>
    <input v-model="user.phone" placeholder="Введите телефон пользователя" />
    <br/>
    <br/>
    <CoolButton text="Save changes" @click="sendForm"/>
    <!--<p> <input type="submit" value="Сохранить изменения"> </p>-->
  </form>
 
</template>

<script>
import axiosInstance from '@/utils/http.js'
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
    sendForm: async function () {
           
      const {firstName, lastName, email, phone} = this.user

      if (firstName && lastName && email && phone) {
        
        await axiosInstance.put(`/users/${this.user.id}`, JSON.stringify(this.user), {
          headers: { 'content-type': 'application/json' }
        } )
        this.$router.push('/')
        return true;
      }

      this.errors = [];

      if (!this.firstName) {
        this.errors.push('Требуется указать имя.');
      }
      if (!this.lastName) {
        this.errors.push('Требуется указать фамилию.');
      }
      if (!this.email) {
        this.errors.push('Требуется указать email.');
      }
        if (!this.phone) {
        this.errors.push('Требуется указать телефон.');
      }
      
    }
  }
}
</script>

<style></style>
