import { Base } from '../../utils/base.js';
class Home extends Base {

  constructor() {
    super();
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


  haveNewMessage(openId, callBack) {
    var params = {
      url: 'haveNewMessage?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getActivityImg(callBack) {
    var params = {
      url: 'getActivityImg',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getNews(callBack) {
    var params = {
      url: 'getNews',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getShufflings(callBack) {
    var params = {
      url: 'getShufflings',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}

export { Home }