<template>
  <div id="all">
    <articles-container :filterArticles="articles"></articles-container>
  </div>
</template>

<script>
import ArticlesContainer from './components/ArticlesContainer'
export default {
  name: "All",
  props:['articles'],
  data () {
    return {
    };
  },
  components:{
    ArticlesContainer
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped  type="text/css">

</style>