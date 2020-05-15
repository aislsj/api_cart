import { Base } from '../../utils/base.js';
class Card extends Base {

  constructor() {
    super();
  }



  
  Cardroll(openId, callBack) {
    var params = {
      url: 'getLotteryListByOpenid?openid=' + openId,
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

export {Card}