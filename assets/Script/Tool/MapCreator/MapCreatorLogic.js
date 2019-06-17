let ViewType = {
  View: 1,
  Op: 2,
}
cc.Class({
  extends: cc.Component,

  properties: {
    m_Content: cc.Node,
    m_OpView: require('MapCreatorOpView'),
    m_PrefabItemList:cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Private()
  },
  Private() {
    this.m_LogicData = {}
    this.m_ViewState = ViewType.View
  },

  start() {

  },

  // update (dt) {},
  RefreshView() {

  },
  RefreshOpView() {

  }
  ,
  AddNode() {
    this.ShowOpView(op)
  },
  DelNode() {

  },
  ShowOpView() {

  },
  HideOpView() {

  },
  ClickItem(event) {
  }
});
