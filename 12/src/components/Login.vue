<template>
  <div class="login_wrap">
    <div class="from_wrap">
      <h2 class="L_logo"></h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm "
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          v-show="isShow"
        >
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button
            type="primary"
            @click="submitForm"
            v-show="!isShow"
          >登陆</el-button>
          <el-button
            type="primary"
            @click="registerForm"
            v-show="isShow"
          >注册</el-button>
        </el-form-item>
      </el-form>
      <a
        href="javascript:;"
        @click="toRegister"
        v-show="!isShow"
      >还没注册？</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value || value.length < 5) {
        callback(new Error("请输入合法的密码"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写手机号"));
      } else if (
        /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/.test(
          value
        )
      ) {
        callback();
      } else {
        return callback(new Error("请输入合法的手机号"));
      }
    };
    return {
      isShow: false,
      isSub: true,
      ruleForm: {
        username: "",
        password: "",
        phone: ""
      },
      rules: {
        username: [
          {
            validator: validateUser,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$axios.post("/user/login", this.ruleForm).then(res => {
        // console.log(res.data);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.$store.commit("CHANGE_USER", res.data);
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    toRegister() {
      this.isShow = true;
    },
    registerForm() {
      this.$axios.post("/user", this.ruleForm).then(res => {
        // console.log(res.data,this.ruleForm);
        if (res.code == 200) {
          setTimeout(() => {
            this.isShow = false;
          }, 1000);
          // this.ruleForm = ""
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login_wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  // background: url("../assets/timg.jpg") no-repeat center;
  // background-size: cover;
  overflow: hidden;
  .L_logo {
    height: 50px;
    margin: auto;
    background: url("../assets/ll.png") no-repeat center;
    margin-bottom: 10px;
    margin-left: 40px;
  }
}
.from_wrap {
  width: 350px;
  height: 350px;
  // border: 1px solid red;
  border-radius: 20px;
  width: 350px;
  height: 350px;
  box-sizing: border-box;
  position: fixed;
  right: 36%;
  top: 15%;
  padding-top: 42px;
  padding-right: 57px;
  border: 1px solid #eee;
  box-shadow: 2px 0 46px rgba(0, 0, 0, 0.18);
  .submit {
    margin-left: 55px;
  }

  a {
    display: block;
    text-align: center;
    margin-left: 90px;
  }
}
</style>
