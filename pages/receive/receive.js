// pages/receive/receive.js

import { Receive } from 'receive-model.js';
var receive = new Receive();
import { Config } from '../../utils/config.js';
var config = new Config();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carId: '',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '领取优惠卷', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var card_id = options.id;
   
    receive.getLotteryById(card_id, this.callBack);
    this.setData({
      lotteryHistoryId: card_id
    })
    this.setData({
      'url': Config.imgUrl
    })
  },


  //新用户跳转到首页
  goBack: function () {
    wx.showModal({
      title: '提示',
      content: '你当前页面有消费卷未领取,是否直接返回用户信息页面',
      success: function (res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '../home/home'
          })
        } else {
          // console.log('取消退出')
        }
      }
    })
  },

  
  //新用户领卷 判断是否授权
  ok: function (event) {
    wx.getUserInfo({
      success: function (res) {
        var carid = receive.getDataSet(event, 'id');
        var openId = wx.getStorageSync('openId');
        receive.getLottery(openId, carid, (res) => {
          if (res.data.status == 'true') {
            wx.showToast({
              title: '领取成功',
              icon: 'success',
              duration: 2000
            })
            //延时定时器
            setTimeout(function () {
              wx.reLaunch({
                url: '../home/home'
              })
            }, 1000) //延迟时间 这里是1秒
          } else {
            wx.showToast({
              title: res.data.data,
              icon: 'none',
              duration: 2000
            })
          }
        });


      },
      fail: function () {
        wx.setStorageSync('receive', true);
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })

    
  },





  callBack: function (res) {
    if (res.data.data){
      this.setData({
        'card_roll': res.data.data.lotteryConfig
      });
    }
  },



})