

import { Orcode } from 'orcode-model.js';
var orcode = new Orcode();
import { Config } from '../../utils/config.js';
var config = new Config();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openSettingBtnHidden: true,//是否授权
    orCodeImage: '',//图片地址
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '二维码', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
    lotteryHistoryId:"",
    carId: "",
  },
  //跳转回上个页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onShow() {
    //调用函数、方法
    // var that = this;
    // this._loadData(this.data.carId, this.data.lotteryHistoryId);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到传过来的卡卷id
    this.data.lotteryHistoryId = options.lotteryHistoryId;
    //获取到传过来的车辆id
    this.data.carId = options.carId;
    //调用获取二维码的方法
    this.getQrCode(this.data.carId, this.data.lotteryHistoryId);
    this._loadData(this.data.carId, this.data.lotteryHistoryId);
  },


  //获取二维码图片地址 Config.imgUrl线上路径   res.data.data图片地址
  getQrCode: function (carId, lotteryHistoryId){
    var that = this;
    wx.request({
      url: 'https://www.jxdqx.com/jxd/getQrCode?carId=' + carId + '&lotteryHistoryId=' + lotteryHistoryId,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData({
          orCodeImage: Config.imgUrl + res.data.data
        })
      }
    })
  },



  _loadData: function (carId, lotteryHistoryId){
    var that = this;
    //或者顶部导航栏高度
    this.setData({
      navH: app.globalData.navHeight
    })
    //获取卡卷详细
    orcode.getProductInfo(lotteryHistoryId, (res) => {
      this.setData({
        'group_array': res.data.data.lotteryConfig
      })
      this.setData({
        'getWay': res.data.data.getWay
      })
      this.setData({
        'group_cart_id': res.data.data.id
      })
    })
    var openId = wx.getStorageSync('openId');
    orcode.getUser(openId, (res) => {
      this.setData({
        'sendnum': res.data.data.bestowal
      })
    })
    //取消右上角转发功能
    wx.hideShareMenu();
  },

  //验证本月的分享次数
  sendnonum: function () {
    wx.showToast({
      title: '你本月的分享次数已用完',
      icon: 'none',
      duration: 1500
    })
  },



  //分享
  onShareAppMessage: (res) => {
    var id = res.target.id
    return {
      title: '你的好友送了你一张优惠卷！',
      path: '/pages/receive/receive?id=' + id,//这里的path是当前页面的path，必须是以 / 开头的完整路径，后面拼接的参数 是分享页面需要的参数  不然分享出去的页面可能会没有内容
      imageUrl: '../../images/home/fenxiang.jpg',
      desc: '点击分享给朋友',
      success: (res) => {
        // console.log("转发成功", res);
   
      },
      fail: (res) => {
        // console.log("转发失败", res);
      }
    }
  },




})