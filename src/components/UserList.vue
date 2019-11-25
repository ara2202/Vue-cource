<template>
  <div class="main-wrap">
    <div class="subgrid header">
      <div class="cell"><p>#</p></div>
      <div class="cell"><p>Action</p></div>
      <div class="cell"><p>Имя</p></div>
      <div class="cell"><p>Фамилия</p></div>
      <div class="cell"><p>Активен</p></div>
      <div class="cell"><p>Баланс</p></div>
      <div class="cell"><p>Email</p></div>
      <div class="cell"><p>Телефон</p></div>
      <div class="cell"><p>Зарегистрирован</p></div>
    </div>

    <div v-show="showUsers" class="grid">
      <div v-for="(item, index) in users" :key="item.id" class="subgrid">
        <div class="cell">
          <p>{{ (activePage - 1) * amountPerPage + index + 1 }}</p>
        </div>
        <div class="cell" style="display: flex; flex-direction: column">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteUser(item)">
            X
          </button>
          <button type="button" class="btn btn-outline-success btn-sm" @click="editUser(item.id)">
            Edit
          </button>
        </div>
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
export default {
  name: 'UserList',
  filters: {
    capitalize(value) {
      return typeof value === 'string' ? value[0].toUpperCase() + value.slice(1) : value
    }
  },
  props: {
    users: {
      type: Array,
      required: true
    },
    activePage: {
      type: Number,
      required: true
    },
    amountPerPage: {
      type: Number,
      required: true
    },
    showUsers: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    deleteUser({ firstName, lastName, id }) {
      if (confirm(`Вы хотите удалить пользователя ${firstName} ${lastName} ?`)) {
        this.$emit('deleteUser', id)
      }
    },
    editUser(id) {
      this.$emit('editUser', id)
    }
  }
}
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr;
  color: #292e1e;
}
.subgrid {
  display: grid;
  grid-template-columns: 50px 50px repeat(4, minmax(50px, 2fr)) repeat(3, minmax(50px, 3fr));
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
  border: solid white 1px;
  overflow-wrap: break-word;
}
.header {
  position: sticky;
  top: 60px;
}
</style>
