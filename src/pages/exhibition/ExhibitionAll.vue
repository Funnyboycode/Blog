<template>
  <div id="all">
    <exhibition-container :filterProjects="projects"></exhibition-container>
  </div>
</template>

<script>
import ExhibitionContainer from './components/ExhibitionContainer'
export default {
  name: "ExhibitionAll",
  props: ['projects'],
  data () {
    return {
    };
  },
  components:{
    ExhibitionContainer
  }
}
</script>

<style lang="scss" scoped  type="text/css">

</style>