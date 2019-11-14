<template>
  <div class="main-wrap">
    <div class="header">
      <h6>Всего пользователей в таблице: {{ getUsersAmt }}</h6>

      <CoolButton
        :text="(showUsers ? 'Скрыть' : 'Показать') + ' пользователей'"
        @click="toggleShowUsers"
      />

      <div class="subgrid header">
        <div class="cell"><p>#</p></div>
        <!--<div class="cell"><p>Avatar</p></div>-->
        <div class="cell"><p>Action</p></div>
        <div class="cell"><p>Имя</p></div>
        <div class="cell"><p>Фамилия</p></div>
        <div class="cell"><p>Активен</p></div>
        <div class="cell"><p>Баланс</p></div>
        <div class="cell"><p>Email</p></div>
        <div class="cell"><p>Телефон</p></div>
        <div class="cell"><p>Зарегистрирован</p></div>
      </div>
    </div>
    <div class="grid">
      <div v-for="(item, index) in users" v-show="showUsers" :key="item.id" class="subgrid">
        <div class="cell">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="cell" style="display: flex; flex-direction: column">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteUser(item)">
            X
          </button>
          <button type="button" class="btn btn-outline-success btn-sm" @click="editUser(item.id)">
            Edit
          </button>
        </div>
        <!--<img v-if="item.avatar" class="cell img" :src="item.avatar" />
        <img
          v-else
          class="cell img"
          src="https://tool.direktoria.org/static/i/images/no_photo_author.png"
        />-->
        <div class="cell">
          <p>{{ item.firstName | capitalize }}</p>
        </div>
        <div class="cell">
          <p>{{ item.lastName | capitalize }}</p>
        </div>
        <div class="cell">
          <p>{{ item.isActive }}</p>
        </div>
        <div class="cell">
          <p>{{ item.balance }}</p>
        </div>
        <div class="cell">
          <p>{{ item.email }}</p>
        </div>
        <div class="cell">
          <p>{{ item.phone }}</p>
        </div>
        <div class="cell">
          <p>{{ item.registered }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoolButton from './CoolButton.vue'
//import axios from 'axios'
import axiosInstance from '@/utils/http.js'
export default {
  name: 'UserList',
  components: {
    CoolButton
  },
  filters: {
    capitalize(value) {
      return typeof value === 'string' ? value[0].toUpperCase() + value.slice(1) : value
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      users: [],
      showUsers: true
    }
  },
  computed: {
    getUsersAmt: function() {
      return this.users.length
    }
  },
  mounted: function() {
    this.loadUsers()
  },
  methods: {
    toggleShowUsers() {
      this.showUsers = !this.showUsers
      return this.showUsers
    },
    async deleteUser({ firstName, lastName, id }) {
      if (confirm(`Вы хотите удалить пользователя ${firstName} ${lastName} ?`)) {
        try {
          await axiosInstance.delete(`/users/${id}`)
          this.users = this.users.filter(item => item.id !== id)
        } catch (e) {
          console.error(e)
        }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-wrap {
  //padding: 1%;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  color: #292e1e;
}
.subgrid {
  display: grid;
  grid-template-columns: 50px 50px repeat(7, minmax(50px, 1fr));
  background: #d9cfc1;
}
.header {
  background: #13505b;
  color: white;
}
.p {
  text-align: center;
}
.cell {
  border: solid white 2px;
  text-align: center;
  overflow-wrap: break-word;
}
.header {
  position: sticky;
  top: 60px;
}
</style>
