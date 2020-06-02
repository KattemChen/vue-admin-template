<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo" v-if='type'>
      Ad
    </div>
    <div class="logo" v-else>
      <span>vue</span>&nbsp;
      <span>Admin</span>
    </div>
    <el-menu :default-active='$route.path' router unique-opened menu-trigger='click' :collapse="type" class="el-menu-vertical" background-color="rgb(63, 63, 63)" text-color="#fff">
      <el-menu-item v-for="(item,index) in sideList" :key="index" :index="'/' + item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
    props: {
        type: Boolean
    },
    data() {
        return {
            sideList: []
        }
    },
    mounted() {
    // 获取侧边栏列表
        this.sideList = this.$router.options.routes[0].children.filter(item => {
            return !item.hidden
        })
        // 路由定向
        if (this.$router.history.current.path === '/') {
            this.$router.push(this.sideList[0].path)
        }
    }
}
</script>

<style scoped lang="scss">
.logo {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: $sideTitle;
  user-select: none;
  span:last-child {
    color: $color;
  }
}
.logo::after {
  content: "";
  display: block;
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ccc;
}
</style>
