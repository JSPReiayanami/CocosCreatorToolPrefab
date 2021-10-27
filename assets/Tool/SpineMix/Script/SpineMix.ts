// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let SpineName = {
  Death: "death",
  Hit: "hit",
  Idle: "idle",
  Jump: "jump",
  Run: "run",
  Shoot: "shoot",
  Walk: "walk"
}

let WomanName = {
  Breath:"breath",
  HoldWinStart:"holdwin_Start",
  HoldWinLoop:"holdwin_loop",
  HoldWinWin:"holdwin_win"
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpineMix extends cc.Component {

  @property(sp.Skeleton)
  spine: sp.Skeleton = null
  @property(cc.Toggle)
  isMixToggle: cc.Toggle = null
  @property(cc.EditBox)
  startEditBox: cc.EditBox = null
  @property(cc.EditBox)
  endDitBox: cc.EditBox = null
  //===
  @property(sp.Skeleton)
  womanSpine: sp.Skeleton = null
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  _LastName = null

  start() {
    this.spine.timeScale = 0.5
    this.spine.setAnimation(0, SpineName.Walk, true);
  }

  // update (dt) {}

  playHit() {
    this.playSpine(SpineName.Hit, false);
  }

  playJump() {
    this.playSpine(SpineName.Jump, false);
  }

  playShoot() {
    this.playOtherSpine(SpineName.Shoot, false);
  }

  playSpine(name, loop = false) {
    let startMinxTime = parseInt(this.startEditBox.string);
    let endMinxTime = parseInt(this.endDitBox.string);
    let startSpineMixTime = 0;
    let endSpineMixTime = 0;
    if (!isNaN(startMinxTime)) {
      startSpineMixTime = startMinxTime
    }
    if (!isNaN(endMinxTime)) {
      endSpineMixTime = endMinxTime
    }
    if (this.isMixToggle.isChecked) {
      this.spine.setMix(SpineName.Walk, name, startSpineMixTime);
      this.spine.addAnimation(0, name, loop);
      this.spine.setMix(name, SpineName.Walk, endSpineMixTime);
      this.spine.addAnimation(0, SpineName.Walk, true);
    } else {
      this.spine.setMix(SpineName.Walk, name, startSpineMixTime);
      this.spine.setMix(name, SpineName.Walk, endSpineMixTime);
      this.spine.setAnimation(0, name, loop);
      this.spine.addAnimation(0, SpineName.Walk, true);
    }
    this._LastName = name;
  }

  playOtherSpine(name, loop = false) {
    this.spine.setAnimation(1, name, loop);
  }


  playHoldWin(){
    this.womanSpine.useTint
    this.womanSpine.setAnimation(0,WomanName.HoldWinStart,false);
    this.womanSpine.setMix(WomanName.HoldWinStart, WomanName.HoldWinLoop, 0.5);
    this.womanSpine.addAnimation(0,WomanName.HoldWinLoop,true);
  }

  playHoldWinOver(){
    this.womanSpine.setAnimation(0,WomanName.HoldWinWin,false);
  }
}
