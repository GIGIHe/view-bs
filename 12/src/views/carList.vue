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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // checked: true,
      listData: [],
      total: 0,
      goodlist: []
    };
  },
  computed: {},
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
    handleChange(value, y) {
      console.log(value, y);
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
    handleSelectionChange(value) {
      // console.log(value);
      this.goodlist = value;
      let i = 0;
      value.forEach(item => {
        i += parseFloat(item.counts * item.goods.g_price);
      });
      this.total = i;
    },
    take_it() {
      // 定义变量 changAll
      this.$axios.post("/order", { goodlist: this.goodlist,total_price:this.total }).then(res => {
        // console.log(res);
            this.$message({
              type:"success",
              message:res.msg
            })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.car_wrap{
  margin-bottom: 60px;
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
    width: 200px;
    height: 40px;
    background: #ff6700;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: #fff;
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
</style>
