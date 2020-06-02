<template>
  <div class="navbar">
    <div class="telescopic" @click="type = !type">
      <i :class="type ? 'left el-icon-s-fold' : 'right el-icon-s-fold'"></i>
    </div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :key="100" :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in breadList" v-bind:key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="me">
      <el-dropdown trigger="hover">
        <span>
          <el-avatar size='small' icon="el-icon-user-solid"></el-avatar>
          <span class="last">
            {{userName}}
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    data() {
        return {
            type: this.value,
            userName: 'admin',
            breadList: [],
            color: '#ccc'
        }
    },
    methods: {
        logout() {
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$router.push('/login')
                })
                .catch(() => {})
        }
    },
    mounted() {
        this.breadList = this.$route.matched.filter(item => {
            return !['', '/index'].includes(item.path)
        })
    },
    watch: {
        type(newVal) {
            this.$emit('input', newVal)
        },
        $route() {
            this.breadList = this.$route.matched.filter(item => {
                return !['', '/index'].includes(item.path)
            })
        }
    }
}
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 2px 2px #ccc;
  .telescopic {
    float: left;
    padding: 0 10px;
    line-height: 60px;
    font-size: 24px;
    cursor: pointer;
    > i {
      transition: transform 0.5s;
    }
  }
  .right {
    transform: rotateY(0);
  }
  .left {
    transform: rotateY(180deg);
  }
  .bread {
    float: left;
    line-height: 60px;
    font-size: 16px;
    > div {
      line-height: inherit;
    }
  }
  .me {
    cursor: pointer;
    float: right;
    padding-right: 40px;
    text-align: center;
    height: 100%;
    > div {
      line-height: 60px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .last {
        padding-left: 8px;
      }
    }
  }
}
</style>
