import { Base } from '../../utils/base.js';
class Integral extends Base {

  constructor() {
    super();
  }
  getgoodslist(callBack) {
    var params = {
      url: 'getGoodsList',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  getHistoryList(openId,callBack) {
    var params = {
      url: 'getHistoryList?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export { Integral }

