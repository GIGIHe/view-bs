<template>
  <div class="ad_admin">
    <el-form
      ref="form"
      :model="form"
      status-icon
      label-width="80px"
    >
      <el-form-item label="昵称">
        <el-input
          v-model="userInfo.username"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          action="https://upload-z1.qiniup.com"
          :data="formdata"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="个人描述">
        <el-input
          v-model="userInfo.desc"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="userInfo.phone"
          class="input"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址" class="address">
        <!-- <el-input
          v-model="userInfo.address"
          class="input"
        ></el-input> -->
        <el-input
          v-model="userInfo.city"
          class="input"
          disabled
        ></el-input>
        <el-input
          v-model="userInfo.area"
          class="input"
          disabled
        ></el-input>
        <el-select
          v-model="value"
          clearable
          :placeholder="userInfo.stress"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {

    return {
      form: {
        username: "",
        desc: "",
        phone: "",
        city: "",
        area: "",
        stress: ""
      },
      formdata: {
        token: ""
      },
      imageUrl: "",
      value:"",
      options:[
        {
          value: '板桥镇',
        }, {
          value: '古城乡',
        }, {
          value: '关王庙乡',
        }, {
          value: '胡庙乡',
        }, {
          value: '开街道',
        }
      ],
      // rules: {
      //   pass: [{ validator: validatePass, trigger: "blur" }]
      // }
    };
  },
  mounted() {
    this.imageUrl = this.userInfo.avatar;
    this.getToken();
  },
  //  <!--监听value的变化-->
  // watch: {
  //   imageUrl(val) {
  //     return this.val
  //   }
  // },
  methods: {
    onSubmit() {
      let id = this.userInfo._id;
      console.log(id);
      this.form = {
        password: this.userInfo.password,
        username: this.userInfo.username,
        desc: this.userInfo.desc,
        phone: this.userInfo.phone,
        avatar: this.imageUrl,
        city:  this.userInfo.city,
        area:  this.userInfo.area,
        stress: this.value
      };
      // console.log(this.form.avatar);
      this.$axios.patch(`/user/${id}`, this.form).then(res => {
        if (res.code == 200) {
          this.$store.commit("CHANGE_USER", res.data);
          console.log(res.data);
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        } else {
          this.$message({
            message: "用户名已被占用",
            type: "error"
          });
        }
      });
    },
    //  <!--获取token-->
    getToken() {
      axios.get("http://upload.yaojunrong.com/getToken").then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.formdata.token = res.data.data;
        }
      });
    },
    // <!--事件对象里面会有URL-->
    handleAvatarSuccess(e) {
      console.log(e.url);
      this.imageUrl = e.url;
    }
  },
  computed: {
    ...mapState(["userInfo"])
  }
};
</script>
<style>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style scoped lang = "scss">
.ad_admin {
  background: #fff;
  padding-bottom: 20px;
  margin-top: 50px;
  margin-left: 10px;
  padding-top: 30px;
  .input {
    width: 30%;
  }
  .notice {
    color: red;
    font-size: 12px;
  }
  .address{
    width: 50%;
  }
}
</style>
