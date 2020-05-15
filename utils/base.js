
import { Config } from 'config.js';

const app = getApp()
var pages = getCurrentPages();
var currPage = pages[pages.length - 1]; //当前页面
var prevPage = pages[pages.length - 2]; //上一个页面

class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  request(params) {
    var url = this.baseRequestUrl + params.url;
    if (!params.type) {
      params.type = 'GET';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) {
        params.sCallBack && params.sCallBack(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }

  // 获取元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  //获取存进缓存的用户信息
  getUserInfo() {
    return wx.getStorageSync("userInfo");
  }

  //判断是否登录
  checklogin(){
    var versions = wx.getStorageSync('versions');
    //判断是不是需要授权
    if (versions == '1') {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      wx.getUserInfo({
        success: function (res) {
          // console.log('授权成功')
          // console.log(res.userInfo)
          // console.log('登录判断成功,不做任何操作')
        },
        fail: function () {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    } else {
      //未授权, 跳转登录页面
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  }

}

export { Base };