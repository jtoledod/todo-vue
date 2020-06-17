<template>
  <div>
    <img alt="app logo"
    class="logo" src="../assets/logo.svg">
    <h1 class="title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'LogoContainer',
  props: {
    title: {
      type: String,
      requited: true
    }
  }
}
</script>

<style>
.logo{
  display: block;
  margin: 1rem auto;
  height: 75px;
}
.title{
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
}
</style>
