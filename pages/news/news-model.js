import { Base } from '../../utils/base.js';
class News extends Base {

  constructor() {
    super();
  }


  getMessageList(openId, callBack) {
    var params = {
      url: 'getMessageList?openid=' + openId,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  

  userAddMessage(openId, comment, callBack) {
    var params = {
      url: 'userAddMessage',
      data: {
        'openid': openId,
        'content': comment,
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  getWeChatTemplate(callBack) {
    var params = {
      url: 'getWeChatTemplate',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

}

export { News }

/**
 * Created by admin on 2020/3/10.
 */
