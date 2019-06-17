cc.Class({
  extends: cc.Component,

  properties: {
    m_PrefabItem: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Private()
  },
  Private() {
    this.m_Items = {}
    this.m_LogicId = null
    this.m_NextId = null
  },

  start() {

  },

  // update (dt) {},
  SetLogicId(logicId) {
    this.m_LogicId = logicId
  },
  GetLogicId() {
    return this.m_LogicId
  },
  AddItem(data) {
    if (data == null) return
    if (this.m_Items[data.LogicId] != null) return
    let item = cc.instantiate(this.m_PrefabItem).getComponent('MapCreatorItem')
    this.m_Items[data.LogicId] = item
    item.SetData(data)
    this.node.addChild(item.node)
  },
  DelItem(data) {
    if (this.m_Items[data.LogicId] != null) {
      this.m_Items[data.LogicId].node.destroy()
      this.m_Items[data.LogicId].node.removeFromParent(true)
      delete this.m_Items[data.LogicId]
    }
  },
  /**
   * @return {boolean}
   */
  CheckIsOver() {
    let num = this.GetItemCount()
    return num > 0
  },
  GetItemCount(){
    let num = 0
    for (let index in this.m_Items) {
      num++
    }
    return num
  }
});
