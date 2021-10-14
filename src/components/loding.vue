<template>
  <div id="loding">
    <img src="../assets/img/loding.gif" alt="">
  </div>
</template>

<script>
export default {
  name: "loding"
}
</script>

<style lang="scss" scoped>
  #loding{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: rgba(255,255,255,.5);
    img{
      margin: 0 auto;
    }
  }
</style>