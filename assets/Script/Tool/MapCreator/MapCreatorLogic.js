
let ViewType = {
  View: 1,
  Op: 2,
}
cc.Class({
  extends: cc.Component,

  properties: {
    m_Content: cc.Node,
    m_ContentH:cc.Node,
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
    this.AddItemList({LogicId:0})
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
    let lastItemData = this.GetDataWithLogicId(data.LastId)
    if(lastItemData != null){
      lastItemData.ToMeIds[data.LogicId] = 1
    }
    let nextItemData = this.GetDataWithLogicId(data.NextId)
    if(nextItemData != null){
      nextItemData.ToMeIds[data.LogicId] = 1
    }
    this.m_LogicData[ data.LogicId ] = data
    this.RefreshItemListView()

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
    //this.DelItemFromAllItemList(data)
    this.RefreshItemListView()
    delete this.m_LogicData[data.LogicId]
  },
  FixItem(data){

  },
  GetDataWithLogicId(id){
    if(id == null) return
    if(id == 0){
      let data = {}
      data.ToMeIds = {}
      for(let logicId in this.m_LogicData){
        if(this.m_LogicData[logicId].LastId == null && this.m_LogicData[logicId].NextId == null){
          data.ToMeIds[logicId] = 1
        }
      }
      return data
    }
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
  AddItemList(data){
    let logicId = data.LogicId
    if(logicId == null) return  null
    if(this.m_ItemLists[ logicId ] == null) {
      let itemList = cc.instantiate(this.m_PrefabItemList)
      this.m_Content.addChild( itemList )
      this.DealBug()
      this.m_ItemLists[ logicId ] = itemList.getComponent( 'MapCreatorItemList' )
      this.m_ItemLists[ logicId ].BindLogic( this )
      this.m_ItemLists[ logicId ].SetLogicId(logicId)
      this.m_ItemLists[ logicId ].RefreshView()
    }
    return this.m_ItemLists[ logicId ]
  },
  DelItemList(logicId){

  },
  ShowClickItemLogicView(listItem,item){
    if(listItem == null || item == null) return
    let disListIdArr = []
    let tempNode = listItem
    while (tempNode != null){
      let nextId = tempNode.GetNextId()
      if(nextId == null) break
      disListIdArr.push(nextId)
      tempNode = this.GetItemListWithLogicId(nextId)
    }
    listItem.SetNextId(null)
    for(let disId in disListIdArr){
      let itemList = this.GetItemListWithLogicId(disListIdArr[disId])
      if(itemList != null){
        itemList.Destoy()
      }
    }
    let logicId = item.GetLogicId()
    listItem.SetItemChoice(logicId)
    let newItemList = this.AddItemList({LogicId:logicId})
    this.RefreshItemListView()
  },
  RefreshItemListView(){
    for(let logicId in this.m_ItemLists){
      this.m_ItemLists[logicId].RefreshView()
    }
    this.DealBug()
  },
  DealBug(){
    this.m_ContentH.getComponent(cc.Layout).resizeMode = cc.Layout.ResizeMode.NONE
    this.m_ContentH.stopAllActions()
    this.m_ContentH.runAction(cc.sequence(
      cc.delayTime(1/30),
      cc.callFunc(()=>{
        this.m_ContentH.getComponent(cc.Layout).resizeMode = cc.Layout.ResizeMode.CONTAINER
      })
    ))
  }
});
