<template>
  <div class="order_list">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order_list' }">我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div
        class="card"
        v-for="(item,index) in orderData"
        :key="index"
        :class="showRow == index?'hide':''"
      >
        <div class="top"><span class="signal">+</span>订单编号:{{item.order_id}}</div>
        <div class="con">
          <div class="left"><img
              :src="item.goods.poster"
              alt="商品图"
            ></div>
          <div class="mid">
            <p class="desc">{{item.goods.g_desc}}</p>
            <p class="items"><span>{{item.goods.g_name}}</span><span>共{{item.good_num}}件商品</span><span>合计：￥{{item.total_price}}</span></p>
          </div>
          <div class="right">
            <p
              @click="$router.push({ path: 'order', query: { id: `${item._id}` }})"
              class="p1"
            >详情</p>
            <!-- <p
              @click="handleDel(index)"
              class="p2"
            >删除</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: [],
      show: true,
      showRow:-1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("/order").then(res => {
        if (res.code == 200) {
          this.orderData = res.data;
        }
      });
    },
    // handleDel(index) {
    //   this.showRow = index
    //   //  alert(this.showRow)
    // }
  }
};
</script>

<style lang="scss" scoped>
.order_list {
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 1000px;
  .bread {
    margin-top: 60px;
    width: 300px;
    // border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    // text-align: center !important;
    margin-left: 10px;
    font-size: 16px;
  }
  .card {
    margin-top: 20px;
    // border: 1px solid red;
    box-shadow: 0 0 5px 5px rgba(241, 240, 240, 0.87);
    padding-top: 10px;
  }
  .top {
    margin-left: 10px;
    color: #666;
    .signal {
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      color: #ddd;
      border: 1px solid #eee;
      width: 20px;
      text-align: center;
      margin-right: 10px;
    }
  }
  .con {
    display: flex;
    padding: 30px;
  }
  .left {
    width: 100px;
    text-align: center;
    img {
      width: 60px;
      vertical-align: middle;
    }
  }
  .mid {
    width: 400px;
    margin-left: 30px;
    .desc {
      padding-bottom: 10px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align-last: left;
    }
    .items {
      color: #f40;
      span {
        margin-right: 10px;
        padding: 5px;
        background-color: rgba(221, 151, 167, 0.2);
      }
    }
  }
  .right {
    margin-left: 340px;
    color: #74abc5;
    width: 140px;
    // height: 40px;
    .p1,
    .p2 {
      width: 66px;
      height: 40px;
      border: 1px solid #eee;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
    }
    .p1 {
      margin-bottom: 10px;
    }
  }

  .right p:hover {
    background: #74abc5;
    color: #fff;
  }
  .hide{
    display: none;
  }
}
</style>
