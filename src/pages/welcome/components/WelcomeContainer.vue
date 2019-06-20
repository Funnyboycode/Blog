<template>
  <div id="container">
    <div class="wrap">
      <ul style="overflow:hidden;" ref="introduce"></ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeContainer",
  data() {
    return {
      timer: null,
      num: 0,
      text: `        Hi! Welcome to my blog! I'm Funny. I'm a front-end developer. I like to touch new technologies.
  I firmly believe that attitude decides everything. God rewards diligence!
  ...If you want to know more about me, please click About on the navigation bar!`
    };
  },
  methods: {
    setTimer() {
      let arr = this.text.split("");
      let len = arr.length;
      this.timer = setInterval(() => {
        arr[this.num] = arr[this.num] === " " ? `&nbsp;` : arr[this.num];
        this.$refs.introduce.innerHTML += `<li style="float:left;font-size: 26px;color: #EEC900">${
          arr[this.num]
        }</li>`;
        this.num++;
        if (this.num === len) {
          clearInterval(this.timer);
        }
      }, 100);
    }
  },
  mounted() {
    this.setTimer();
  }
};
</script>

<style lang="scss" scoped  type="text/css">
#container {
  position: relative;
  padding-bottom: 50%;
  margin: 0 auto;
  background: url("../../../assets/images/keybord.jpg") center center no-repeat;
  background-size: 100% 100%;
  .wrap {
    position: absolute;
    top: 100px;
    bottom: 0;
    padding: 50px;
  }
}
</style>