const {ccclass, property} = cc._decorator;

@ccclass
export default class ScrollViewActionItem extends cc.Component {


  // LIFE-CYCLE CALLBACKS:
  @property({type: cc.Node})
  viewNode = null
  // onLoad () {}
  _OnClickEvent = null

  start() {

  }

  SetOnClickEvent(func) {
    this._OnClickEvent = func
  }

  OnClick() {
    if (this._OnClickEvent) {
      this._OnClickEvent(this)
    }
  }


  // update (dt) {}
  ShowMoreChoice(callback ?: Function) {
    cc.tween(this.node).to(0.2, {
      height: 150
    }).call(() => {
      if (callback) callback()
    }).start()
  }

  HideMoreChoice(callback ?: Function) {
    cc.tween(this.node).to(0.2, {
      height: 50
    }).call(() => {
      if (callback) callback()
    }).start()
  }
}
