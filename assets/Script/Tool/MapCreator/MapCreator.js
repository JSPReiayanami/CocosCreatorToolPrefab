let MapState = {
  Logic: 1,
  View: 2
};
let StateBtnName = {};
StateBtnName[MapState.Logic] = ["BtnView"];
StateBtnName[MapState.View] = ["BtnLogic"];
let StateNodeName = {};
cc.Class({
  extends: cc.Component,

  properties: {
    m_BtnNode: cc.Node,
    m_MapLogic:require('MapCreatorLogic'),
    m_MapView:require('MapCreatorView')
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Private()
  },
  Private() {
    this.m_State = MapState.Logic
  },

  start() {
    this.RefreshView()
  },

  // update (dt) {},
  SetMapState(event, state) {
    state = parseInt(state);
    if (this.m_State === state) return;
    this.m_State = state;
    this.RefreshView()
  },
  RefreshView: function () {
    this.RefreshBtnView()
    this.m_MapLogic.node.active = this.m_State === MapState.Logic;
    this.m_MapView.node.active = this.m_State === MapState.View
  },
  RefreshBtnView() {
    for (let index in this.m_BtnNode.children) {
      this.m_BtnNode.children[index].active = false
    }
    let nameArr = StateBtnName[this.m_State]
    for (let index in nameArr){
      this.m_BtnNode.getChildByName( nameArr[index] ).active = true
    }
  }
});
