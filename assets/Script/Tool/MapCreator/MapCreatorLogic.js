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
    this.m_ItemLists = {}
    this.m_MaxLogicId = 1
    this.m_ViewState = ViewType.View
    this.m_ChoiceItem = null
  },

  start() {
    this.HideOpView()
    //添加一个常驻的itemlist放没有去向的节点，只有来向的
    this.AddItemList(0)
  },

  // update (dt) {},
  RefreshView() {

  },
  RefreshOpView() {

  }
  ,
  ClickOpBtn(evevt,op) {
    this.ShowOpView(parseInt(op))
  },
  ShowOpView(op) {
    this.m_OpView.ShowView( {Op:op} )
  },
  HideOpView() {
    this.m_OpView.HideView()
  },
  ClickItem(event) {
  },
  GetLogicNewLogicId(){
    return this.m_MaxLogicId
  },
  ChangeLogicId(){
    this.m_MaxLogicId++
  },
  CleanLogicData(){
    this.m_LogicData = []
    this.m_MaxLogicId = 1
    this.m_ViewState = ViewType.View
    this.HideOpView()
    this.RefreshView()
  },
  OpItem(data){
    if(data != null){
      if(data.Op != null){
        if(data.Op === 1){
          this.AddItem(data)
        }else if(data.Op === 2){
          let delData = this.GetDataWithLogicId(data.DelId)
          this.DelItem(delData)
        }else  if(data.Op === 3){
          this.FixItem(data)
        }
      }
    }
  },
  AddItem(data){
    data.LogicId = this.GetLogicNewLogicId()
    data.ToMeIds = {}
    this.ChangeLogicId()
    this.m_LogicData[ data.LogicId ] = data
    this.AddItemToList(data)
  },
  DelItem(data){
    if(data == null) return
    let logicId = data.LogicId
    this.RemoveToMeId(logicId,data.LastId)
    this.RemoveToMeId(logicId,data.NextId)
    for(let toMeId in data.ToMeIds){
      let itemInfo = this.GetDataWithLogicId(toMeId)
      if(itemInfo.NextId == logicId){
        this.RemoveNextId(logicId)
      }
      if(itemInfo.LastId == logicId){
        this.RemoveLastId(logicId)
      }
    }
    this.DelItemFromAllItemList(data)
    delete this.m_LogicData[data.LogicId]
  },
  FixItem(data){

  },
  GetDataWithLogicId(id){
    if(id == null) return
    return this.m_LogicData[id]
  },
  RemoveToMeId(targetId,id){
    if(id == null || targetId == null) return
    if(this.m_LogicData[id] != null && this.m_LogicData[id].ToMeIds[targetId] != null){
      delete  this.m_LogicData[id].ToMeIds[targetId]
    }
  },
  RemoveLastId(id){
    if(id == null) return
    if(this.m_LogicData[id] != null ){
      this.m_LogicData[id].LastId
    }
  },
  RemoveNextId(id){
    if(id == null) return
    if(this.m_LogicData[id] != null ){
      this.m_LogicData[id].NextId
    }
  },
  RemoveItemFromList(data){

  },
  GetItemListWithLogicId(logicId){
    return this.m_ItemLists[ logicId ]
  },
  AddItemToList(data){
    if(data.NextId == null && data.LastId == null){
      let itemList = this.GetItemListWithLogicId(0)
      itemList.AddItem( data )
    }
    if(data.NextId != null){
      let itemList = this.GetItemListWithLogicId(data.NextId)
      itemList.AddItem( data )
    }
    if(data.LastId != null){
      let itemList = this.GetItemListWithLogicId(data.LastId)
      itemList.AddItem( data )
    }
    for(let toMeId in data.ToMeIds){
      let itemList = this.GetItemListWithLogicId(toMeId)
      itemList.AddItem( data )
    }
  },
  DelItemFromAllItemList(data,itemListId = null){
    if(itemListId == null){
      for(let index in this.m_ItemLists){
        this.m_ItemLists[index].DelItem(data)
      }
    }else{
      let itemList = this.GetItemListWithLogicId(itemListId)
      if(itemList != null){
        itemList.DelItem(itemId)
      }
    }
    for(let itemId in this.m_ItemLists){
      if(parseInt(itemId) !== 0 &&this.m_ItemLists[itemId].CheckIsOver()){
        this.m_ItemLists[itemId].node.destroy()
        this.m_ItemLists[itemId].node.removeFromParent(true)
        delete this.m_ItemLists[itemId]
      }
    }
  },
  AddItemList(logicId){
    if(this.m_ItemLists[ logicId ] == null) {
      let itemList = cc.instantiate(this.m_PrefabItemList)
      this.m_Content.addChild( itemList )
      this.m_ItemLists[ logicId ] = itemList.getComponent( 'MapCreatorItemList' )
      this.m_ItemLists[ logicId ].SetLogicId(logicId)
    }
    return this.m_ItemLists[ logicId ]
  },
  DelItemList(logicId){

  }
});
