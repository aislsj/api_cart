import { Base } from '../../utils/base.js';
class Addcart extends Base {

  constructor() {
    super();
  }

  getCarList(openId, callBack) {
    var params = {
      url: 'getCarList?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export { Addcart }

/**
 * Created by admin on 2020/3/10.
 */
