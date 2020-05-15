
import { News } from 'news-model.js';
var news = new News();

import { Config } from '../../utils/config.js';
var config = new Config();

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '消息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   navH: app.globalData.navHeight
    // })
      this._loadData()
  },

  _loadData: function () {
    //获取openId
    var openId = wx.getStorageSync('openId');
    //获取用户信息
    news.getMessageList(openId,(res) => {
      this.setData({
        'news': res.data.data
      })
    });
    //获取微信咨询信息
    news.getWeChatTemplate((res) => {
      this.setData({
        'news_con': res.data.data
      })
    });

    //获取user
    var mythis = this;
    wx.getUserInfo({
      success: function (res) {
        mythis.setData({
          'userInfo': res.userInfo
        })
      },
      fail: function () {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })


  },

  /**
   * 显示弹窗
   */
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },

  /**
    * 点击取消
    */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
    *  点击确认
    */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },


  //提交留言
   submitForm(e) {
    var form = e.detail.value;
    var that = this;
     if (form.comment == "") {
       wx.showToast({
         title: '留言不能为空',
         icon: 'none',
         duration: 2000
       })
       return;
    }
    var openId = wx.getStorageSync('openId');
    if (openId){
      news.userAddMessage(openId, form.comment, (res) => {
        if (res.data.data) {
          wx.showToast({
            title: "留言成功"
          })
          this.setData({
            message: '',
          })
          //获取微信咨询信息
          var openId = wx.getStorageSync('openId');
          news.getMessageList(openId, (res) => {
            this.setData({
              'news': res.data.data
            })
          });
        }
      })
    }else{
      wx.showToast({
        title: '登录之后才能发送留言',
        icon: 'none',
        duration: 2000
      })
      return;
    }
  
  }


})