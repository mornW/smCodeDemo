<template>
  <div class="home-page">
    <jz-header></jz-header>
    <router-view></router-view>
    <jz-footer></jz-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './jzHead'
import foot from './jzBottom'

export default {
  name: 'homePage',
  created: function(){
    // console.log(this.$router);
    // this.$router.push({path:'/home/'});
  },
  components: {
    'jz-header': header,
    'jz-footer': foot
  }
}
</script>
