// pages/cloud/cloud.js
//初始化数据库
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  insert: function(){
    db.collection('user').add({
      data:{
        name: 'jerry',
        age: 18
      },
      success: res=>{
        console.log(res);
      },
      fail: err=>{
        console.log(err);
      }
    })
  },
  update: function(){
    db.collection('user').doc('b4f7b7d25f9d45600011fa3726f5973a').update({
      date:{
        age: 100
      },
      success: res=>{
        console.log(res);
      },
      fail: err=>{
        console.log(err);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})