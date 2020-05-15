import { Base } from '../../utils/base.js';
class Index extends Base {

  constructor() {
    super();
  }

  luckyDraw(openId, callBack) {
    var params = {
      url: 'luckyDraw?openid='+openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  getSudokuConfigList(callBack) {
    var params = {
      url: 'getSudokuConfigList',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  
  giveLottery(openId,callBack) {
    var params = {
      url: 'getSudokuConfigList',
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

export { Index }