<template>
  <div class="order">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order_list' }">我的订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="order_w">
      <div class="order_img">
        <img
          :src="orderData.goods.poster"
          alt=""
        >
      </div>
      <div class="order_con">
        <p><span class="label">商品名称:</span><span>{{orderData.goods.g_name}}</span></p>
        <p><span class="label">商品总价:</span><span>￥{{orderData.total_price}}</span></p>
        <p><span class="label">实付款:</span><span>￥{{orderData.total_price}}</span></p>
        <p><span class="label">商品描述:</span><span>{{orderData.goods.g_desc}}</span></p>
        <p><span class="label">收货地址:</span><span>{{orderData.user.city}}{{orderData.user.area}}{{orderData.user.stress}}</span></p>
        <p><span class="label">订单编号:</span><span>{{orderData._id}}</span></p>
        <p><span class="label">下单时间:</span><span>{{time}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderData: []
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    time() {
      return new Date(this.orderData.created_at).toLocaleString();
    }
  },
  methods: {
    getData() {
      let id = this.$route.query.id;
      // console.log(id);
      this.$axios.get(`/order/sigle/${id}`).then(res => {
        if (res.code == 200) {
          this.orderData = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 1000px;
}
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
.order_w {
  display: flex;
  margin-top: 20px;
  box-shadow: 0 0 5px 5px rgba(241, 240, 240, 0.87);
  padding: 15px;
  padding-left: 30px;
  .order_img {
    width: 100px;
    margin-right: 50px;
    text-align: left;
    img {
      width: 100%;
      margin-top: 55px;
      // vertical-align: middle;
    }
  }
}
.order_con {
  flex: 1;
  // border: 1px solid red;
  p {
    display: flex;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    .label {
      width: 70px;
    }
  }
}
</style>
