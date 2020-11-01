// pages/cloud/cloud.js
//初始化数据库
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
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
      data:{
        name: 'jerry_update'
      },
      success: console.log,
      fail: console.error
    })
  },
  search: function(){
    db.collection('user').where({
      name:"jerry"
    }).get({
      success: console.log,
      fail:console.error
    })
  },
  delete: function(){
    db.collection('user').doc("b4f7b7d25f9d475a001206b07b058792").remove({
      success: console.log,
      fail: console.error
    })
  },
  sum: function(){
    wx.cloud.callFunction({
      name: 'sum',
      data:{
        a: 1,
        b: 2
      },
      success: console.log,
      fail: console.error
    });
  },
  getOpenId: function(){
    wx.cloud.callFunction({
      name: 'login',
      success: console.log,
      fail: console.error
      });
  },

  batchDelete: function(){
    wx.cloud.callFunction({
      name: 'batchDelete',
      success: console.log,
      fail: console.error
    });
  },
  upload :function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('image').add({
              data:{
                fileID: res.fileID,
                success: console.log,
                fail: console.error
              }
            })
          },
          fail: console.error
        })
      }
    })
  },
  getFile: function(){
    wx.cloud.callFunction({
      name: 'login',
    }).then(res => {
      db.collection('image').where({
        _openid: res.result.openid
      }).get().then(res2=>{
        console.log(res2);
        this.setData({
          images: res2.data
        })
      })
    })
  },
  downloadFile: function(event){
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        //保存到系统相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功'
            })
           }
        })
      },
      fail: console.error
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