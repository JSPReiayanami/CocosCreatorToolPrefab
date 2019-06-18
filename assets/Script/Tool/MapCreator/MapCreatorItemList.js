let MapCreatorItem = require('MapCreatorItem')

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
    this.m_Data = null
    this.m_MapLogic = null
  },

  start() {

  },

  // update (dt) {},
  BindLogic(logic){
    this.m_MapLogic = logic
  },
  SetLogicId(logicId) {
    this.m_LogicId = logicId
  },
  GetLogicId() {
    return this.m_LogicId
  },
  SetNextId(nextId) {
    this.m_NextId = nextId
  },
  GetNextId() {
    return this.m_NextId
  },
  SetItemChoice(logicId){
    for(let itemId in this.m_Items){
      let type = MapCreatorItem.ChoiceType.UnChoice
      if(logicId == itemId){
        type = MapCreatorItem.ChoiceType.Choice
      }
      this.m_Items[itemId].SetChoice(type)
    }
  },
  AddItem(logicId) {
    if (logicId == null) return null
    if (this.m_Items[logicId] != null) return this.m_Items[logicId]
    let item = cc.instantiate(this.m_PrefabItem).getComponent('MapCreatorItem')
    this.node.addChild(item.node)
    this.m_Items[logicId] = item
    item.BindLogic( this.m_MapLogic ,this)
    item.SetLogicId(logicId)

    return item
  },
  DelItem(data) {
    if (this.m_Items[data.LogicId] != null) {
      this.m_Items[data.LogicId].node.destroy()
      this.m_Items[data.LogicId].node.removeFromParent(true)
      delete this.m_Items[data.LogicId]
    }
  },
  GetIitemWithLogicId(logicId){
    return this.m_Items[logicId]
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
  },
  Destoy(){
    this.node.destroy()
    this.node.removeFromParent(true)
  },
  RefreshView(){
    let data = this.m_MapLogic.GetDataWithLogicId( this.GetLogicId() )
    if(data != null){
      let viewItemId = {}
      if(data.LastId != null) viewItemId[data.LastId] = 1
      if(data.NextId != null) viewItemId[data.NextId] = 1
      for(let logicId in data.ToMeIds){
        viewItemId[logicId] = 1
      }
      for(let itemId in this.m_Items){
        let item = this.m_Items[itemId]
        if(viewItemId[itemId] == null){
          item.Destoy()
          delete this.m_Items[itemId]
        }
      }
      for(let itemId in viewItemId){
        this.AddItem(itemId)
      }
    }
  }
});
