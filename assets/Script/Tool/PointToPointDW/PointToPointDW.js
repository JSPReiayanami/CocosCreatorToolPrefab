let PointDWUtil = require("PointToPointDWUtil")
cc.Class({
  extends: cc.Component,

  properties: {
    m_PrefabPoint: {
      default: null, type: cc.Prefab,
    },
    m_LayLine: {
      default: null, type: cc.Node,
    },
    m_Graphics: {
      default: null, type: cc.Graphics,
    },
    m_Color: {
      default: new cc.color(255, 0, 0),
      notify: function () {
        this.RefreshPoint();
      }
    },
    m_ProgressBar: {
      default: null, type: cc.ProgressBar,
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.m_Point = [];
  },
  RestMap() {
    for (var index in this.m_Point) {
      this.m_Point[index].node.removeFromParent();
    }
    delete this.m_Point;
    this.m_Point = [];
  }
  ,
  start() {

  },

  // update (dt) {},
  OnBtnAddLine() {
    var pointNode = cc.instantiate(this.m_PrefabPoint)
    this.m_LayLine.addChild(pointNode)
    var jsc = pointNode.getComponent("PointToPointDWPoint")
    jsc.node.x = 200
    jsc.node.y = 200
    this.m_Point.push(jsc)
    jsc.SetTag(this.m_Point.length)
  },
  OnBtnDelLine() {
    if (this.m_Point.length <= 0) return
    var bl = this.m_Point.pop()
    bl.node.removeFromParent()
  },
  OnBtnStartDWLine() {
    this.DWProgressBar()
  },
  DWWithGraphics() {
    this.m_Graphics.clear();
    if (this.m_Point.length <= 1) return
    this.m_Graphics.strokeColor = this.m_Color;
    let startPosJsc = this.m_Point[0]
    this.m_Graphics.moveTo(startPosJsc.node.x, startPosJsc.node.y);
    for (let index = 1; index < this.m_Point.length; index++) {
      let posJsc = this.m_Point[index]
      this.m_Graphics.lineTo(posJsc.node.x, posJsc.node.y);
    }
    this.m_Graphics.stroke();
  },
  DWProgressBar() {
    this.clearAllProgressBar()
    if (this.m_Point.length <= 1) return
    let startPosJsc = this.m_Point[0]
    for (let index = 1; index < this.m_Point.length; index++) {
      let newProgressBarNode = cc.instantiate(this.m_ProgressBar.node)
      newProgressBarNode.active = true
      this.m_LayLine.addChild(newProgressBarNode)
      newProgressBarNode.position = startPosJsc.node.position
      let posJsc = this.m_Point[index]
      let dis = PointDWUtil.GetPosDis(startPosJsc.node.position, posJsc.node.position)
      //let pb = new cc.ProgressBar()
      let progressBar = newProgressBarNode.getComponent(cc.ProgressBar)
      progressBar.totalLength = dis
      newProgressBarNode.width = dis
      newProgressBarNode.angle = PointDWUtil.GetAngleWithPos(startPosJsc.node.position, posJsc.node.position)
      progressBar.progress = 0
      startPosJsc = posJsc
      this.m_ProgressBarArr.push(newProgressBarNode)
    }
    this.StartDWProgressBarTween()
  },
  StartDWProgressBarTween(){
    if(this.m_ProgressBarArr[this.m_DWIndex] == null) return
    let progressBar = this.m_ProgressBarArr[this.m_DWIndex].getComponent(cc.ProgressBar)
    progressBar.progress = 0
    cc.tween(progressBar).to(0.5,{progress:1}).call(()=>{
      this.m_DWIndex++
      this.StartDWProgressBarTween()
    }).start()
  },
  clearAllProgressBar() {
    this.m_DWIndex = 0
    if (this.m_ProgressBarArr != null) {
      this.m_ProgressBarArr.forEach((node) => {
        cc.Tween.stopAllByTarget(node.getComponent(cc.ProgressBar))
        node.removeFromParent(true)
      })
      this.m_ProgressBarArr = []
    } else {
      this.m_ProgressBarArr = []
    }
  }
});
