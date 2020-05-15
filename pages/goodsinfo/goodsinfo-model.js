import { Base } from '../../utils/base.js';
class Goodsinfo extends Base {

  constructor() {
    super();
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

}

export { Goodsinfo }