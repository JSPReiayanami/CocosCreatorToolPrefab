cc.Class({
  extends: cc.Component,

  properties: {
    m_ShowAll: false,
    m_IsLimit: false,
    m_LimitRange: cc.Vec2,
    m_Size: cc.Vec2,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.m_RefreshSize = new cc.Vec2(0, 0)
    this.m_Size.width = this.m_Size.x
    this.m_Size.height = this.m_Size.y
    this.m_LimitRange.width = this.m_LimitRange.x
    this.m_LimitRange.height = this.m_LimitRange.y
  },

  start() {
    this.RefreshAdpata()
  },

  update(dt) {
    this.RefreshAdpata()
  },
  RefreshAdpata() {
    let frameSize = cc.winSize
    let checkVec = {x: Math.floor(frameSize.width), y: Math.floor(frameSize.height)}
    if (checkVec.x != this.m_RefreshSize.x || checkVec.y != this.m_RefreshSize.y) {
      delete this.m_RefreshSize
      let checkLimit = frameSize
      this.m_RefreshSize = new cc.Vec2(checkVec.x, checkVec.y)
      let designSize = cc.view.getDesignResolutionSize()
      let scaleW = frameSize.width / designSize.width
      let scaleH = frameSize.height / designSize.height
      let curContent = this.m_Size
      if (this.m_IsLimit) {
        curContent = this.m_LimitRange
        checkLimit = {
          width: this.m_LimitRange.width / designSize.width * frameSize.width,
          height: this.m_LimitRange.height / designSize.height * frameSize.height
        }
      }
      let scale = scaleW > scaleH ? scaleW : scaleH
      if (curContent.width * scale > checkLimit.width || curContent.height * scale > checkLimit.height) {
        scale = scaleW < scaleH ? scaleW : scaleH
        if (this.m_ShowAll) {
          let scaleSelfW = checkLimit.width / curContent.width
          let scaleSelfH = checkLimit.height / curContent.height
          let scaleSelf = scaleSelfW > scaleSelfH ? scaleSelfW : scaleSelfH
          if (curContent.width * scaleSelf > checkLimit.width || curContent.height * scaleSelf > checkLimit.height) {
            scaleSelf = scaleSelfW < scaleSelfH ? scaleSelfW : scaleSelfH
          }
          scale = scale > scaleSelf ? scale : scaleSelf
        }
      }
      this.node.scale = scale
    }

  }
});
