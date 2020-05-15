import { Base } from '../../utils/base.js';
class Goods extends Base {

  constructor() {
    super();
  }


  goodsroll(openId, callBack) {
    var params = {
      url: 'changeHistory?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  getUserCar(openId, callBack) {
    var params = {
      url: 'getCarList?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


}

export { Goods }