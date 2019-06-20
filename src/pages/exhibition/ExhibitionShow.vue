<template>
  <div id="all">
    <exhibition-container :filterProjects="arrProjects"></exhibition-container>
  </div>
</template>

<script>
import ExhibitionContainer from './components/ExhibitionContainer'
export default {
  name: "ExhibitionShow",
  props: ['projects'],
  data () {
    return {
    };
  },
  components:{
    ExhibitionContainer
  },
  created() {
    this.arrProjects = this.projects.filter(item=>{
      return item._id === this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped  type="text/css">

</style>