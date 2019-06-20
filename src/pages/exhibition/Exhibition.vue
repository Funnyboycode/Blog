<template>
  <div id="exhibition">
    <blog-sort></blog-sort>
    <!-- <exhibition-container></exhibition-container> -->
    <router-view :projects="projects"></router-view>
  </div>
</template>

<script>
import BlogSort from '@/common/BlogSort'
import ExhibitionContainer from './components/ExhibitionContainer'
export default {
  name: "Exhibition",
  data () {
    return {
    };
  },
  components:{
    BlogSort
  },
  computed: {
    projects(){
      return this.$store.state.projectlist;
    }
  },
  created() {
    this.$store.dispatch('getProjectList');
  },
}
</script>

<style lang="scss" scoped  type="text/css">

</style>