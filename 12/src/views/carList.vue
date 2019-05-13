<template>
  <div class="car_wrap">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order_list' }">我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      ref="multipleTable"
      :data="listData"
      class="table"
      @select-all="handleSelectionChange"
      @select="handleSel"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        label="商品图"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.goods.poster"
            alt
            class="imgbox"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span class="good_name">{{scope.row.goods.g_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.goods.g_price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.counts"
            @change="handleChange(scope.row.counts, scope.row._id)"
            :min="1"
            :max="10"
            class="in_num"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="合计"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>￥{{scope.row.counts * scope.row.goods.g_price}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="编辑"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <i
            class="el-icon-delete"
            @click="handleDel(scope.row._id)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="buy">
      <span class="compute">总计 :￥{{total}}</span>
      <span
        class="take_it"
        @click="take_it"
      >购买</span>
      <span
        class="sure_addr"
        @click="sure_addr"
      >确认地址</span>
    </div>
    <el-card
      class="box-card c_card"
      v-if="show_a"
    >
      <div class="text item">
        <span
          class="close"
          @click="handleClose"
        >X</span>
        <el-form>
          <el-form-item>
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
            <el-button @click="sure">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // checked: true,
      listData: [],
      total: 0,
      goodlist: [],
      value: "",
      show_a: false,
      options: [
        {
          value: "板桥镇"
        },
        {
          value: "古城乡"
        },
        {
          value: "关王庙乡"
        },
        {
          value: "胡庙乡"
        },
        {
          value: "开街道"
        }
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("/carList").then(res => {
        if (res.code == 200) {
          // console.log(res.data);
          this.listData = res.data;
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    handleDel(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/carList/${id}`).then(res => {
            if (res.code == 200) {
              this.getData();
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改购物车数量
    handleChange(value, y) {
      // console.log(value, y);
      let id = y;
      this.$axios.patch(`/carlist/${id}`, { counts: value }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          //  this.total =
        }
      });
    },

    // 全选
    handleSelectionChange(value) {
      // console.log(value);
      this.goodlist = value;
      let i = 0;
      value.forEach(item => {
        i += parseFloat(item.counts * item.goods.g_price);
      });
      this.total = i;
    },
    // 单选
    handleSel(value) {
      // console.log(this.goodlist);
      // console.log(value.goods.g_price);
      this.goodlist = value;
      let s = 0;
      for (let m = 0; m < value.length; m++) {
        s += parseFloat(value[m].counts * value[m].goods.g_price);
      }

      this.total = s;
    },
    // 关闭弹窗
    handleClose() {
      this.show_a = false;
    },
    sure_addr(){
      this.show_a = true;
    },
    sure() {
      let id = this.userInfo._id;
      this.form = {
        city: this.userInfo.city,
        area: this.userInfo.area,
        stress: this.value
      };
        this.$axios
        .patch(`/user/addr/${id}`, {
          city: this.form.city,
          area: this.form.area,
          stress: this.form.stress
        })
        .then(res => {
          if (res.code == 200) {
            this.show_a = false;
             this.$message({
              type: "success",
              message: "地址已确定"
            });
          } else {
            this.$message({
              type: "success",
              message: "地址无效"
            });
          }
        });
    },
    take_it() {
      this.$axios
        .post("/order", {
          goodlist: this.goodlist,
          total_price: this.total
        })
        .then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
          } else {
            this.$message({
              type: "success",
              message: res.msg
            });
          }
        });
    },

  }
};
</script>

<style lang="scss" scoped>
.car_wrap {
  margin-bottom: 60px;
  /deep/ .el-input {
    width: auto;
  }
}
.table {
  max-width: 1000px;
  margin: 40px auto;
  img {
    vertical-align: middle;
  }
  .imgbox {
    width: 100px;
  }
}
.buy {
  width: 1000px;
  height: 60px;
  margin: 80px auto;
  background: #fafafa;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .compute {
    color: #ff6700;
  }
  .take_it {
    width: 140px;
    height: 40px;
    background: #ff6700;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
    margin-left: 440px;
  }
  .sure_addr {
    width: 99px;
    height: 40px;
    border: 1px solid #409eff;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    color: #666;
    cursor: pointer;
  }
}
.bread {
  margin-top: 60px;
  width: 150px;
  // border: 1px solid #ddd;
  height: 30px;
  line-height: 30px;
  // text-align: center !important;
  margin-left: 194px;
  font-size: 16px;
}
.c_card {
  width: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
}
.close {
  position: absolute;
  top: 0;
  right: 5px;
  color: #ccb9b9;
  cursor: pointer;
}
</style>
