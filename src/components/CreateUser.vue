<template>
  <div class="form">
    <p>Имя пользователя</p>
    <input v-model="firstName" placeholder="Введите имя пользователя" />
    <p>Фамилия пользователя</p>
    <input v-model="lastName" placeholder="Введите фамилию пользователя" />
    <input id="checkbox" v-model="isActive" type="checkbox" />
    <label for="checkbox">Активен</label>
    <p>Начальный баланс</p>
    <input v-model="balance" placeholder="Введите баланс пользователя" />
    <p>Email</p>
    <input v-model="email" placeholder="Введите email пользователя" />
    <p>Phone</p>
    <input v-model="phone" placeholder="Введите телефон пользователя" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
