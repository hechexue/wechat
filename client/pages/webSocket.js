// pages/webSocket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     connection: {},
     data: [],
     inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onSocketOpen((res) => {
      console.log('WebSocket连接已打开！')
    })
    let webSocket = wx.connectSocket({
      url: 'ws://10.211.130.230:8088',
    })
      wx.onSocketMessage((res) => {
           console.log(res)
        if (JSON.parse(res.data).type === 'notification'){
          this.setData({ connection: JSON.parse(res.data) })
          wx.setNavigationBarTitle({
            title: this.data.connection.nickname
          })
        }else {
          this.data.data.push(JSON.parse(res.data))
          this.setData({ data: this.data.data })
        }
      })

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
  
  }, 
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendSocketMessage: function () {
    let msg = this.data.inputValue
    if (this.data.inputValue) {
        wx.sendSocketMessage({
          data: msg,
          success:(res)=>{
            console.log(res)
          }
        })
    } else {
      console.log(msg)
    }
    this.setData({inputValue: ''})
  }
})