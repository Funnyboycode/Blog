<template>
  <ul id="sort">
    <li>排序:</li>
    <li><a class="active" @click="defal($event)">默认</a></li>
    <li>
      按时间排序
      <a ref="timedown" @click="sort('timedown')">↓</a>
      <a ref="timeup" @click="sort('timeup')">↑</a>
    </li>
    <li>
      按访问量排序
      <a ref="visitdown" @click="sort('visitdown')">↓</a>
      <a ref="visitup" @click="sort('visitup')">↑</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BlogSort",
  data () {
    return {
    };
  },
  methods: {
    changeStyle(ele){
      let aSort = document.querySelectorAll("a");
      aSort.forEach(function(item,index,array){
        array[index].classList.remove('active');
      })
      ele.classList.add('active');
    },
    defal(e){
      this.changeStyle(e.target);
      if(location.hash.indexOf('articles') >-1) this.$store.dispatch('getArticleList');
      if(location.hash.indexOf('exhibition')>-1) this.$store.dispatch('getProjectList');
    },
    sort(type){
      this.changeStyle(this.$refs[type]);
      this.$store.dispatch('dataSort',[type,location.hash]);
    }
  },
}
</script>

<style lang="scss" scoped  type="text/css">
  #sort {
    display: flex;
    position: relative;
    left: 20px;
    z-index: 10002;
    li {
      padding: 10px;
      a {
        cursor: pointer;
        &:hover { 
          text-decoration: none;
          color: red;
        }
      }
      .active {
        color: red;
      }
    }
  }
</style>