// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ScrollViewActionItem from "./ScrollViewActionItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkewScrollView extends cc.Component {

  @property({type:cc.ScrollView})
  ScrollView = null
  @property()
  PosXGap = 57.5
  @property()
  PosYGap = 100
  @property()
  Gap = 0
  @property({type:cc.Prefab})
  itemPrefab = null
  @property()
  prefabCount = 10
  _RefreshSize: cc.Vec2 = null
  _OPosXGap = 0
  _ChoiceItem:ScrollViewActionItem = null
  _CanClick = true
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this._RefreshSize = new cc.Vec2(0, 0);
    this._OPosXGap = this.PosXGap;
  }

  start() {
    this.ScrollView.content.removeAllChildren(true)
    for(let index = 0;index < this.prefabCount;index++){
      let node = cc.instantiate(this.itemPrefab)
      node.active = true
      let item = node.getComponent(ScrollViewActionItem)
      item.SetOnClickEvent((actionItem)=>{
        this.OnClickItem(actionItem)
      })
      this.ScrollView.content.addChild(node)
    }
  }

  update(dt) {
    //this.CommonAdpata();
    this.UpdateItemPosX();
  }

  UpdateItemPosX() {
    let disY = this.ScrollView.content.y - this.ScrollView.content.parent.height / 2;
    let disX = disY / (this.PosYGap + this.Gap) * this.PosXGap;
    let chArr = this.ScrollView.content.children;
    for (let index = 0; index < chArr.length;index++) {
      chArr[index].x = index * this.PosXGap - disX
    }
  }

  SetPosXGap(posXGap) {
    this.PosXGap = posXGap;
  }

  CommonAdpata() {
    let frameSize = cc.winSize;
    let checkVec = {x: Math.floor(frameSize.width), y: Math.floor(frameSize.height)};
    if (checkVec.x != this._RefreshSize.x || checkVec.y != this._RefreshSize.y) {
      delete this._RefreshSize;
      this._RefreshSize = new cc.Vec2(checkVec.x, checkVec.y);
      let designSize = cc.view.getDesignResolutionSize();
      let scaleFrame = frameSize.width / frameSize.height;
      let scaleDesign = designSize.width / designSize.height;
      this.PosXGap = this._OPosXGap * (scaleFrame / scaleDesign) - this.Gap * (scaleFrame / scaleDesign);
    }
  }

  OnClickItem(item:ScrollViewActionItem){
    if(!this._CanClick) return
    if(this._ChoiceItem == item){
      this._ChoiceItem.HideMoreChoice(()=>{
        this._ChoiceItem = null
        this._CanClick = true
      })
      return;
    }
    if(this._ChoiceItem != null){
      this._ChoiceItem.HideMoreChoice(()=>{
        item.ShowMoreChoice(()=>{
          this._ChoiceItem = item
          this._CanClick = true
        })
      })
    }else{
      item.ShowMoreChoice(()=>{
        this._ChoiceItem = item
        this._CanClick = true
      })
    }
  }
}
