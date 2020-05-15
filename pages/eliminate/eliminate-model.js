import { Base } from '../../utils/base.js';
class Eliminate extends Base {
  constructor() {
    super();
  }
 

  getLotteryById(lotteryHistoryId, callBack) {
    var params = {
      url: 'getLotteryById?id=' + lotteryHistoryId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }



  
  useLottery(carId, lotteryHistoryId, callBack) {
    var params = {
      url: 'useLottery?carId=' + carId + '&lotteryHistoryId=' + lotteryHistoryId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}

export { Eliminate }

/**
 * Created by admin on 2020/3/10.
 */
