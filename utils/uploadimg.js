
import { Config } from 'config.js';
import { Base } from 'base.js';
class UploadImg {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  

  // 获取元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  //获取存进缓存的用户信息
  getUserInfo() {
    return wx.getStorageSync("userInfo");
  };

  

}

export { UploadImg };