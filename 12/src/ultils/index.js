import axios from "axios";
import { Notification } from "element-ui";
import router from "../router";
const env = process.env.NODE_ENV;
const baseURL = env == "development" ? "/api" : "/";
const instance = new axios.create({
  baseURL,
  timeout: 1500
});
const xhr = {
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: data }, config)
        .then(res => {
          if (res.data.code == 403) {
            Notification.info({
              message: "登录状态失效",
            });
            setTimeout(() => {
              router.push('/Login')
            }, 1000);

          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fetch(url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config)
        .then(res => {
          if (res.data.code == 403) {
            Notification.info({
              message: "登录状态失效"
            });
            setTimeout(() => {
              router.push('/')
            }, 1000);
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data, config) {
    return this.fetch(url, data, config, 'post')
  },
  patch(url, data, config) {
    return this.fetch(url, data, config, "patch");
  },
  delete(url, data, config) {
    return this.fetch(url, data, config, "delete");
  }
};
export default xhr;
