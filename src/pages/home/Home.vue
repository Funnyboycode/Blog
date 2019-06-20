<template>
  <div id="home">
    <home-container></home-container>
  </div>
</template>

<script>
import HomeContainer from './components/HomeContainer'
export default {
  name: "Home",
  data () {
    return {
    };
  },
  components:{
    HomeContainer
  }
}
</script>

<style lang="scss" scoped  type="text/css">
 #home {
   min-height: 100%;
 }
</style>