<template>
  <div class="H_wraper">
    <div class="inner">
      <div class="left">
        <h2 class="hover logo" @click="$router.push('/')"></h2>
      </div>
      <div class="right">
        <h2
          v-if="!userInfo"
          class="hover"
          @click="$router.push('/Login')"
        >请登录</h2>
        <img
          :src="userInfo.avatar"
          alt="天中商城欢迎您"
          v-if="userInfo"
          class="mr"
        >
        <el-dropdown v-if="userInfo">
          <span class="el-dropdown-link">
            {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              class="hover"
              @click.native="$router.push('/info')"
            >个人资料</el-dropdown-item>
             <el-dropdown-item
              class="hover"
              @click.native="$router.push('/update_pass')"
            >修改密码</el-dropdown-item>
            <el-dropdown-item
              class="hover"
              @click.native="$router.push('/order_list')"
            >订单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <h2
          v-if="userInfo"
          class="hover"
          @click="logout"
        >退出</h2>
        <span class="item">
          <i
            class="iconfont icon-gouwuche"
            @click="goCar()"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLogin: false,
      num: 1
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    logout() {
      this.$axios.post("/user/logout").then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_USER", "");
          this.$message({
            type: "warning",
            message: "已退出登录"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          setTimeout(() => {
            this.$router.push("/Login");
          }, 1000);
        }
      });
    },
    goCar() {
      if (this.userInfo) {
        this.$router.push("/carList");
      } else {
        this.$message({
          type: "info",
          message: "未登录，请先登录"
        });
        setTimeout(() => {
          this.$router.push("/Login");
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.H_wraper {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  background: rgb(245, 245, 245);
  font-size: 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.inner {
  width: 70%;
  margin: 0 auto;
  &::after{
     content: "";
      display: block;
      clear: both;
      overflow: hidden;
  }
  .left {
    float: left;
    height: 100%;
    display: flex;
  }
  .right {
    float: right;
    height: 100%;
    display: flex;
  }
  h2 {
    font-weight: 400;
    color: #666;
    margin-left: 25px;
    margin-right: 25px;
    cursor: pointer;
  }
  h2.logo {
    width: 603px;
    margin-top: 5px;
    height: 40px;
    background: url("../assets/logo.png") no-repeat center;
    background-size: cover;
  }
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    align-self: center;
  }
  .hover:hover {
    color: #f40;
  }
  /deep/ .icon-gouwuche {
    font-size: 26px;
  }
  /deep/ .el-badge__content.is-fixed {
    top: 10px;
    right: 8px;
  }
  .mr{
    margin: 6px;
  }
}
</style>
