import { Cartinfo } from 'cartinfo-model.js';
var cartInfo = new Cartinfo();
var util = require("../../utils/util.js");

import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessdates: '请选择保险过期时间',
    Crossdates: '请选择保险过期时间',
    //车辆类型默认为个人
    cart_type: 1,
    imgs: [],
    travel_first: ['../../images/cart_info/upload3.png'],
    travel_last: ['../../images/cart_info/upload4.png'],
    travel_first_image: '',
    travel_last_image: '',
    insurance_first: ['../../images/cart_info/upload1.png'],
    insurance_last: ['../../images/cart_info/upload2.png'],
    enterprise_first: ['../../images/cart_info/upload5.png'],
    insurance_first_image: '',
    insurance_last_image: '',
    enterprise_first_image:'',
    carNumber:'',//车牌号  
    phone:'',//手机号
    businessBrand:'',//商业品牌
    businessTime:'',//商业险到期时间
    insuranceBrand:'',//交强品牌
    insuranceTime: '',//交强险到期时间
    carId:'',//汽车号
    drivingPositive:'',//行驶证正面照片
    drivingReverse: '',//行驶证反面照片
    idcardPositive:'',//身份证正面照片
    idcardReverse:'',//身份证反面照片
    type:'',//车辆类型
    enterprise:'',//营业执照
    teamname2:'',//商业名称
    teamname:'', //交强名称
    formtype: '1',//表单提交方式 1添加 2修改
    timedate1:'2020-01-01',
    timedate2: '2020-01-01',
    Crossdates:'2020-01-01',
    businessdates:'2020-01-01',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '车辆信息', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
    error:'',//错误提示
  },

  //跳转回上个页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    this._loadData();
    if (options.type) {
      var type = options.type;
      this.setData({
        cart_type: type
      })
    }
    
    if (options.id){
      var id = options.id;
      this.editCart(id);
    }
    
  },

  //获取修改汽车信息  
  editCart: function (id){
    var cart = [];
    var openId = wx.getStorageSync('openId');
    cartInfo.getUser(openId,(res) => {
      var cart = res.data.data.carList
      for(var i=0;i<cart.length;i++){
        if (id == cart[i]['carId']){
          cart = cart[i];
        }
      }
      //获取品牌名称
      cartInfo.getInsuranceBrandList((res) => {
        var brand = res.data.data
        for (var i = 0; i < brand.length; i++) {
          //商业
          if (cart['businessBrand'] == brand[i]['insuranceId']) {
            this.setData({
              teamname2: brand[i]['name']
            })
          }
          //交强
          if (cart['insuranceBrand'] == brand[i]['insuranceId']) {
            this.setData({
              teamname: brand[i]['name']
            })
          }
        }
      })

      //交强  点击日期组件确定事件  
      if (cart['businessTime']){
        this.setData({ Crossdates: util.formatTime(new Date(cart['insuranceTime']))})
        this.setData({ timedate1: util.formatTime(new Date(cart['insuranceTime'])) })
      }
     
      //商业  点击日期组件确定事件  
      if (cart['insuranceTime']) {
        this.setData({ businessdates: util.formatTime(new Date(cart['businessTime']))})
        this.setData({ timedate2: util.formatTime(new Date(cart['businessTime']))})
      }

      //设置图片
      cart['drivingPositive'] ? this.setData({ 'travel_first': [Config.imgUrl + cart['drivingPositive']] }):''
      cart['drivingReverse'] ? this.setData({ 'travel_last': [Config.imgUrl + cart['drivingReverse']] }) : ''
      cart['idcardPositive'] ? this.setData({ 'insurance_first': [Config.imgUrl + cart['idcardPositive']] }) : ''
      cart['idcardReverse'] ? this.setData({ 'insurance_last': [Config.imgUrl + cart['idcardReverse']] }) : ''
      cart['enterprise'] ? this.setData({ 'enterprise_first': [Config.imgUrl + cart['enterprise']] }) : ''


      //设定默认值
      this.setData({
        'name':cart['name'],
        'carNumber': cart['carNumber'],
        'phone': cart['phone'],
        'teamid2': cart['businessBrand'],
        'teamid': cart['insuranceBrand'],
        'travel_first_image': cart['drivingPositive'],
        'travel_last_image': cart['drivingReverse'],
        'insurance_first_image': cart['idcardPositive'],
        'insurance_last_image': cart['idcardReverse'],
        'cart_type': cart['type'],
        'enterprise_first_image': cart['enterprise'],
        'formtype':2,
        'carId': cart['carId'],
      })


    })
  },
 

   //获取保险投保公司
  _loadData:function(){
    this.setData({
      navH: app.globalData.navHeight
    })
    cartInfo.getInsuranceBrandList((res) => {
      this.setData({
        'group_array': res.data.data
      })
    })
  },

  //选择交强险
  bindcarChange: function (e) {
    this.setData({
      teamname: this.data.group_array[e.detail.value].name,
      teamid: this.data.group_array[e.detail.value].insuranceId
    })
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
  },

  //选择商业险
  bindbusinessPickerChange: function (e) {
    this.setData({
      teamname2: this.data.group_array[e.detail.value].name,
      teamid2: this.data.group_array[e.detail.value].insuranceId
    })
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
  },











  //交强  点击日期组件确定事件  
  bindCrossDateChange: function (e) {
    this.setData({
      Crossdates: e.detail.value
    })
  },
 
  //商业  点击日期组件确定事件  
  bindbusinessDateChange: function (e) {
    this.setData({
      businessdates: e.detail.value
    })
  },


  //提交表单
  formSubmit: function (e) {
    this.data.error = true;
    var openId = wx.getStorageSync('openId');
    var url  ='';
    if (e.detail.value.fromtype==1){
      url = 'https://www.jxdqx.com/jxd/addCar';
    }else{
      url = 'https://www.jxdqx.com/jxd/updateCar';
    }
    //判断参数
    this.checkphone(e.detail.value.phone)
    this.carNumber(e.detail.value.carNumber)
    this.insuranceBrand(e.detail.value.insuranceBrand)
    this.businessBrand(e.detail.value.businessBrand)

    var data = this.data.error;
    if (data != false){
      //验证正确
      wx.request({
        url: url,
        data: {
          'name': e.detail.value.name,
          'businessBrand': e.detail.value.businessBrand,
          'insuranceTimeVo': e.detail.value.insuranceTime,
          'carNumber': e.detail.value.carNumber,
          'insuranceBrand': e.detail.value.insuranceBrand,
          'businessTimeVo': e.detail.value.businessTime,
          'idcardPositive': e.detail.value.insurance_first_image,
          'idcardReverse': e.detail.value.insurance_last_image,
          'phone': e.detail.value.phone,
          'drivingPositive': e.detail.value.travel_first_image,
          'drivingReverse': e.detail.value.travel_last_image,
          'type': e.detail.value.type,
          'openid': openId,
          'enterprise': e.detail.value.enterprise_first_image,
          'carId': e.detail.value.carId,
        },
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log(res)
          if (res.data.data == true){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            //延时定时器
            setTimeout(function () {
              //要延时执行的代码  
              wx.reLaunch({
                url: '../cart/addcart'
              })
            }, 1000) //延迟时间 这里是1秒
          }else{
            wx.showToast({
              title: res.data.data,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }


  },



   
   //验证手机号
   checkphone:function(phone){
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     if (phone.length == 0) {
       wx.showToast({
         title: '输入的手机号为空',
         icon: 'none',
         duration: 1500
       })
      //  return false;
       this.data.error = false;
     } else if (phone.length < 11) {
       wx.showToast({
         title: '手机号长度有误！',
         icon: 'none',
         duration: 1500
       })
      //  return false;
       this.data.error = false;
     } else if (!myreg.test(phone)) {
       wx.showToast({
         title: '手机号有误！',
         icon: 'none',
         duration: 1500
       })
      //  return false;
       this.data.error = false;
     } 

   },

  //验证交强险
  insuranceBrand: function (insuranceBrand) {
    if (insuranceBrand.length == 0) {
      wx.showToast({
        title: '输入参数有误',
        icon: 'none',
        duration: 1500
      })
      // return false;
      this.data.error = false;
    } 

  },

  //验证商业险
  businessBrand: function (businessBrand) {
    if (businessBrand.length == 0) {
      wx.showToast({
        title: '输入参数有误',
        icon: 'none',
        duration: 1500
      })
      // return false;
      this.data.error = false;
    } 
  },



  //验证车牌号
  carNumber: function (carNumber) {
    var myreg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/
    if (carNumber.length != 7) {
      wx.showToast({
        title: '输入的车牌号长度有误',
        icon: 'none',
        duration: 1500
      })
      // return false;
      this.data.error = false;
    } else if (!myreg.test(carNumber)) {
      wx.showToast({
        title: '车牌号有误！',
        icon: 'none',
        duration: 1500
      })
      // return false;
      this.data.error = false;
    }

  },





  //用户上传图片
  chooseImg: function (e) {
    var type = this.getDataSet(e, 'type');
    var imgtype = type + "_image"
    var that = this;
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          [type]: tempFilePaths
        });
        //上传图片到服务器
        wx.uploadFile({
          url: "https://www.jxdqx.com/jxd/uploadFile",
          header: {
            'content-type': 'multipart/form-data',
          },
          filePath: tempFilePaths[0],//小程序保存的临时路径
          name: 'file',
          success: function (res) {
            var successData = res.data
            var jsonStr = successData.replace(" ", "")
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");
              var jj = JSON.parse(jsonStr);
              res.data = jj;
            }
          
            that.setData({
              [imgtype]: res.data.data
            });
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    });
  },


  // 获取元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  },

})