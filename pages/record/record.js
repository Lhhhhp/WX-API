var formatSeconds = function(value) {
  var time = parseFloat(value)
  var h = Math.floor(time/3600)
  var m = Math.floor((time - h *3600)/60)
  var s = time - h*3600 - m*60
  return [h, m, s].map(formatNumber).join(':')
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
}

var interval; //定时器
Page({
  data: {
    formatRecordTime: '00:00:00',
    recordTime: 0,
    recordFile: '',
  },
  // 开始录音处理函数
  startTap:function() {
    var self = this;
    //计时，每秒执行一次
    interval = setInterval(() => {
      //计数器+1
      self.data.recordTime += 1;
      self.setData({
        //格式化时间显示
        formatRecordTime: formatSeconds(self.data.recordTime)
      })
    }, 1000);
    // 开始录音
    wx.startRecord({
      success: (res) => {
        console.log(res)
        self.setData({
          //更新显示时长
          formatRecordTime:formatSeconds(self.data.recordTime),
          //更新音频临时文件路径
          recordFile:res.tempFilePath
        })
      },
      complete: function() {
        //清除定时器
        clearInterval(interval)
      }
    })
  },
  //结束录音
  endTap:function() {
    wx.stopRecord();
    clearInterval(interval);
    this.setData({
      formatRecordTime: '00:00:00',
      recordTime:0
    })
  },
  playTap:function() {
    var self = this
    wx.playVoice({
      filePath: self.data.recordFile,
      complete: function() {}
    })
  }
  
})
