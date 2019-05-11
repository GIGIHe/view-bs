import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
import Index from "@/views/Index";
import Login from "@/components/Login";
import Goods from "@/components/List";
import cat1 from "@/components/cat1";
import cat2 from "@/components/cat2";
import cat3 from "@/components/cat3";
import cat4 from "@/components/cat4";
import cat5 from "@/components/cat5";
import carList from "@/views/carList";
import Info from "@/views/Info";
import update_pass from "@/views/update_pass";
import order_list from "@/views/orderList";
import order from "@/views/order";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      redirect: "/cat1",
      children: [
        {
          path: "Goods",
          name: "Goods",
          component: Goods,
          // redirect:"/Goods/cat1",
          children: [
            {
              path: "/cat1",
              name: "cat1",
              component: cat1
            },
            {
              path: "/cat2",
              name: "cat2",
              component: cat2
            },
            {
              path: "/cat3",
              name: "cat3",
              component: cat3
            },
            {
              path: "/cat4",
              name: "cat4",
              component: cat4
            },
            {
              path: "/cat5",
              name: "cat5",
              component: cat5
            }
          ]
        },
        {
          path: "/carList",
          name: "carList",
          component: carList
        },
        {
          path: "/order_list",
          name: "order_list",
          component: order_list
        },
        {
          path: "/update_pass",
          name: "update_pass",
          component: update_pass
        },
        {
          path: "/info",
          name: "info",
          component:Info
        },
        {
          path: "/order",
          name: "order",
          component: order
        },
      ]

    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },

  ]
});
