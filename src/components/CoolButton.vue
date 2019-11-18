<template>
  <div class="wrapper">
    <button
      v-tooltip="'Нажмите чтобы скрыть/показать пользователей'"
      v-copy="`some text`"
      class="superbtn"
      @click="onClick"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick: function(e) {
      e.preventDefault()
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
$accent-color: #07e8ff;
$base-color: #2f0000;
$border-size: 3px;

.wrapper {
  margin: 5px;
  padding: 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(45deg, #3c0453, $base-color);
  text-transform: uppercase;
  text-shadow: 0 0 3px #000;
  letter-spacing: 3px;
  font-size: 12px;
  color: $accent-color;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: $border-size;
    left: $border-size;
    bottom: $border-size;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.05);
  }
  span {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      position: absolute;
    }

    &:nth-child(1) {
      top: 0;
      left: 0;
      width: 100%;
      height: $border-size;
      background: linear-gradient(90deg, $base-color, $accent-color, $base-color);
      animation: animateTop 2s linear infinite paused;
    }
    &:nth-child(2) {
      top: 0;
      right: 0;
      width: $border-size;
      height: 100%;
      background: linear-gradient(0, $base-color, $accent-color, $base-color);
      animation: animateRight 2s linear infinite paused;
    }
    &:nth-child(3) {
      bottom: 0;
      left: 0;
      width: 100%;
      height: $border-size;
      background: linear-gradient(90deg, $base-color, $accent-color, $base-color);
      animation: animateBottom 2s linear infinite paused;
    }

    &:nth-child(4) {
      top: 0;
      left: 0;
      width: $border-size;
      height: 100%;
      background: linear-gradient(0, $base-color, $accent-color, $base-color);
      animation: animateLeft 2s linear infinite paused;
    }
  }
  &:hover {
    span {
      animation-play-state: running;
    }
  }
}
@keyframes animateTop {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes animateRight {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes animateBottom {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes animateLeft {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
