import { Base } from '../../utils/base.js';
class Cartinfo extends Base {

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



  formSubmit(data, callBack) {
    var params = {
      data: data,
      type:'POST',
      url: 'addCar',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }



  getInsuranceBrandList(callBack) {
    var params = {
      url: 'getInsuranceBrandList',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  //获取用户信息
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

export { Cartinfo }

/**
 * Created by admin on 2020/3/10.
 */
