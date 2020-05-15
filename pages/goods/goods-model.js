import { Base } from '../../utils/base.js';
class Good extends Base {

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

    getUserNumber(openId, callBack) {
      var params = {
        url: 'getUser?openid=' + openId,
        sCallBack: function (res) {
          callBack && callBack(res);
        }
      }
      this.request(params);
    }

  // 商品兑换
  creditsExchange(openId,size,id,callBack) {
    var params = {
      url: 'creditsExchange?lotteryId='+id+'&size='+size+'&openid='+openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export { Good }

/**
 * Created by admin on 2020/3/10.
 */
