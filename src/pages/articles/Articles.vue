<template>
<div id="articles">
  <blog-sort></blog-sort>
  <router-view :articles="articles"></router-view>
</div>
</template>

<script>
import BlogSort from '@/common/BlogSort'
export default {
  name: "Articles",
  data () {
    return {
    };
  },
  components:{
    BlogSort
  },
  computed: {
    articles(){
      return this.$store.state.articlelist
    }
  },
  created() {
      this.$store.dispatch('getArticleList')
  }
}
</script>

<style lang="scss" scoped  type="text/css">

</style>