<template>
  <div id="show">
    <articles-container :filterArticles="allArts"></articles-container>
  </div>
</template>

<script>
import ArticlesContainer from './components/ArticlesContainer'
export default {
  name: "Show",
  props:['articles'],
  data () {
    return {
      allArts:[]
    };
  },
  components:{
    ArticlesContainer
  },
  created() {
    this.allArts = this.articles.filter(item=>{
      return item._id === this.$route.params.id
    })
  },
}
</script>

<style lang="scss" scoped  type="text/css">

</style>