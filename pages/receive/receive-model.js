import { Base } from '../../utils/base.js';
class Receive extends Base {

  constructor() {
    super();
  }

  getLotteryById (id, callBack) {
    var params = {
      url: 'getLotteryById?id=' + id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  getLottery(openId, cardId, callBack) {
    var params = {
      url: 'getLottery?lotteryHistoryId=' + cardId + '&openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


}

export { Receive }