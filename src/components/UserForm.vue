<template>
  <form class="userForm" @submit="sendForm">
    <div v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>

    <div class="form-group">
      <label for="name">Имя пользователя</label>
      <input
        id="name"
        v-model="localUser.firstName"
        type="text"
        class="form-control"
        placeholder="Введите имя пользователя"
      />
    </div>

    <div class="form-group">
      <label for="surname">Фамилия пользователя</label>
      <input
        id="surname"
        v-model="localUser.lastName"
        type="text"
        class="form-control"
        placeholder="Введите фамилию пользователя"
      />
    </div>

    <div class="form-group">
      <label for="checkbox">Активен</label>
      <input id="checkbox" v-model="localUser.isActive" type="checkbox" class="form-control" />
    </div>

    <div class="form-group">
      <label for="balance">Баланс пользователя</label>
      <input
        id="balance"
        v-model="localUser.balance"
        type="text"
        class="form-control"
        placeholder="Введите баланс пользователя"
      />
    </div>

    <div class="form-group">
      <label for="email">Email пользователя</label>
      <input
        id="email"
        v-model="localUser.email"
        type="text"
        class="form-control"
        placeholder="Введите Email пользователя"
      />
    </div>

    <div class="form-group">
      <label for="phone">Телефон пользователя</label>
      <input
        id="phone"
        v-model="localUser.phone"
        type="text"
        class="form-control"
        placeholder="+7 "
      />
    </div>
    <div class="form-group">
      <label>Дата регистрации</label>
      <input v-model="localUser.registered" type="text" class="form-control" />
    </div>

    <DatePicker v-model="localUser.registered" />

    <br />
    <br />

    <CoolButton :text="buttonText" @click="sendForm" />
  </form>
</template>

<script>
import CoolButton from './CoolButton.vue'
export default {
  components: {
    CoolButton,
    DatePicker: () => import('@/components/DatePicker.vue')
  },
  model: {
    prop: 'user',
    event: 'userChange'
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  data: () => ({
    errors: [],
    localUser: {}
  }),
  watch: {
    localUser: {
      deep: true,
      handler: 'updateUser'
    }
  },
  mounted() {
    this.localUser = Object.assign({}, this.user)
  },
  methods: {
    updateUser() {
      this.$emit('userChange', this.localUser)
    },
    sendForm: function() {
      const { firstName, lastName, email, phone } = this.localUser

      if (firstName && lastName && email && phone) {
        this.$emit('submit', this.localUser)
      }

      this.errors = []

      if (firstName) {
        this.errors.push('Требуется указать имя.')
      }
      if (lastName) {
        this.errors.push('Требуется указать фамилию.')
      }
      if (email) {
        this.errors.push('Требуется указать email.')
      }
      if (phone) {
        this.errors.push('Требуется указать телефон.')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.userForm {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
}
</style>
