import { Base } from '../../utils/base.js';
class Login extends Base {

  constructor() {
    super();
  }

  
  verificationCode(phone, callBack) {
    var params = {
      url: 'verificationCode?phone=' + phone,
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


  mobilePhone(iv, encryptedData, session_key,callBack) {
    var params = {
      url: 'getmobilePhone',
      data: {
        'iv': iv,
        'encryptedData': encryptedData,
        'session_key': session_key,
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


  register(phone,data,openid,callBack){
    var params = {
      url: 'addUser',
      type: 'POST',
      data: {
        'openid': openid,
        'nickname': data.nickName,
        'sex': data.gender,
        'headimgurl': data.avatarUrl,
        'phone': phone,
      },
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }


}

export { Login }

/**
 * Created by admin on 2020/3/10.
 */
