import { Base } from '../../utils/base.js';
class Orcode extends Base {

  constructor() {
    super();
  }
  
  getQrCode(lotteryHistoryId, carId, callBack) {
    var params = {
      url: 'getQrCode?carId=' + carId + '&lotteryHistoryId=' + lotteryHistoryId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getProductInfo(id, callBack) {
    var params = {
      url: 'getLotteryById?id=' + id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  getUser(openId, callBack) {
    var params = {
      url: 'getUser?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export { Orcode }

/**
 * Created by admin on 2020/3/10.
 */
