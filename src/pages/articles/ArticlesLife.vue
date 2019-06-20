<template>
  <div id="life">
    <articles-container :filterArticles="allArts"></articles-container>
  </div>
</template>

<script>
import ArticlesContainer from './components/ArticlesContainer'
export default {
  name: "Life",
  props:['articles'],
  data () {
    return {
    };
  },
  components:{
    ArticlesContainer
  },
  computed: {
    allArts(){
      return this.articles.filter(val=>{
        return val.type.indexOf("life")> -1
      }) 
    }
  },
}
</script>

<style lang="scss" scoped  type="text/css">

</style>