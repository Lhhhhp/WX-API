Page({
  data: {
    sources: ''
  },
  choosePhotoTap1:function() {
    var self = this;
    wx.chooseImage({
      count: 2,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function(res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths
        })
      }
    })
  },
  choosePhotoTap2:function() {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['camera'],
      success: function(res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths
        })
      }
    })
  },
  choosePhotoTap3:function() {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album','camera'],
      success: function(res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths
        })
      }
    })
  },
})