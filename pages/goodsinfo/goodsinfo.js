
import { Goodsinfo } from 'goodsinfo-model.js';

var goodsinfo = new Goodsinfo();

import { Good } from '../goods/goods-model.js';
var good = new Good();
import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsinfo:'',//商品详情
    showModal: false,
    countsArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCount: 1,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商品详情', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  //跳转回上个页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据传过来的参数获取卡卷id
    var id = options.id;
    good.getgoodslist((res) => {
      var data = res.data.data
      for (var i = 0; i < data.length; i++) {
        if (id == data[i]['lotteryId']){
          this.data.goodsinfo = data[i]
        }
      }

      this.setData({
        'url': Config.imgUrl
      })
      this.setData({
        'cardInfo': this.data.goodsinfo
      })
    });
   
  },

  


  // 外面的弹窗
  btn: function (e) {
    var redeem = good.getDataSet(e, 'redeem');
    var goodsid = good.getDataSet(e, 'id');
    this.setData({
      showModal: true,
      redeem: redeem,
      goodsid: goodsid
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  },

  bindPickerChange: function (event) {
    var index = event.detail.value;
    var selectendCount = this.data.countsArray[index]
    this.setData({
      productCount: selectendCount
    })
  },


  formSubmit: function (e) {
    var openId = wx.getStorageSync('openId');
    if (!openId) {
      wx.reLaunch({
        url: '../login/login'
      })
    }else{
      var size = e.detail.value.size;
      var id = e.detail.value.lotteryId
      good.creditsExchange(openId, size, id, (res) => {
        if (res.data.data == '兑换成功') {
          //获取我的积分
          good.getUserNumber(openId, (res) => {
            this.setData({
              'number': res.data.data.integral
            })
          });
          this.ok();
          this.setData({
            successModal: true,
            lotteryId: id
          })
        } else {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 2000
          })
          this.ok();
        }
      });
    }

  },

  //隐藏兑换成功后弹出来的图片
  hideModal: function () {
    this.setData({
      successModal: false
    });
  },


  //跳转到卡卷详情
  tocardroll: function () {
    wx.navigateTo({
      url: '../goodsroll/goodsroll',
    })
  },


})