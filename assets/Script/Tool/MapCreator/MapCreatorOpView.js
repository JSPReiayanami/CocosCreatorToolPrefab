let ViewType = {
  Add: 1,
  Del: 2,
}
let StateLayName = {};
StateLayName[ViewType.Add] = ["LogicId", "BtnLay", "LayItemId", "LayLastId", "LayNextId"];
StateLayName[ViewType.Del] = ["LogicId", "BtnLay", "LayDelId"];
cc.Class({
  extends: cc.Component,

  properties: {
    m_LayNode: cc.Node,
    m_MapLogicNode: cc.Node,
    m_LabNewLogicId: cc.Label,
    m_EDTItemId: cc.EditBox,
    m_EDTLastId: cc.EditBox,
    m_EDTNextId: cc.EditBox,
    m_EDTDelId: cc.EditBox,
    m_TogNeedClean: cc.Toggle,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Private()
  },
  Private() {
    this.m_ViewState = ViewType.View
    this.m_MapLogic = this.m_MapLogicNode.getComponent('MapCreatorLogic')
  },

  start() {

  },
  // update (dt) {},
  ShowView(data) {
    if (data != null) {
      if (data.Op != null) {
        this.m_ViewState = data.Op
      }
    }
    this.node.active = true
    this.RefreshView()
  },
  HideView(data) {
    if (!this.m_TogNeedClean.isChecked) {
      this.m_EDTItemId.string = ""
      this.m_EDTLastId.string = ""
      this.m_EDTNextId.string = ""
      this.m_EDTDelId.string = ""
    }
    this.node.active = false
  },
  RefreshView() {
    let layNameArr = StateLayName[this.m_ViewState]
    this.m_LayNode.active = true
    for (let index in this.m_LayNode.children) {
      this.m_LayNode.children[index].active = false
    }
    layNameArr = StateLayName[this.m_ViewState]
    for (let index in layNameArr) {
      this.m_LayNode.getChildByName(layNameArr[index]).active = true
    }
    this.m_LabNewLogicId.string = "下一个逻辑Id:"+this.m_MapLogic.GetLogicNewLogicId()
    this.CheckEdtIsRight()
  },
  ClickOk() {
    let isErrInfo = this.CheckEdtIsRight()
    if (isErrInfo == true) return
    if (this.m_ViewState == ViewType.Add) {
      if (this.m_EDTItemId.string == "") {
        this.m_EDTItemId.placeholder = "请输入信息Id"
        return
      }
    } else {
      if (this.m_EDTDelId.string == ""){
        this.m_EDTDelId.placeholder = "请输入删除的逻辑Id"
        return
      }
    }
    let data = {}
    data.Op = this.m_ViewState
    data.ItemId = this.StringCovertoInt(this.m_EDTItemId.string)
    data.LastId = this.StringCovertoInt(this.m_EDTLastId.string)
    data.NextId = this.StringCovertoInt(this.m_EDTNextId.string)
    data.DelId = this.StringCovertoInt(this.m_EDTDelId.string)
    this.m_MapLogic.OpItem(data)
    this.RefreshView()
  },
  CheckIsNaN(edtString) {
    if (edtString != null && edtString != "") {
      let str = parseInt(edtString)
      if (isNaN(str)) {
        return true
      }
    }
    return false
  },
  CheckEdtIsRight() {
    let isErrInfo = false
    this.m_EDTItemId.fontColor = cc.Color.WHITE
    this.m_EDTLastId.fontColor = cc.Color.WHITE
    this.m_EDTNextId.fontColor = cc.Color.WHITE
    this.m_EDTDelId.fontColor = cc.Color.WHITE
    if (this.m_ViewState == ViewType.Add) {
      if (this.CheckIsNaN(this.m_EDTItemId.string)) {
        isErrInfo = true
        this.m_EDTItemId.fontColor = cc.Color.RED
      }
      if (this.CheckIsNaN(this.m_EDTLastId.string)) {
        isErrInfo = true
        this.m_EDTLastId.fontColor = cc.Color.RED
      }
      if (this.CheckIsNaN(this.m_EDTNextId.string)) {
        isErrInfo = true
        this.m_EDTNextId.fontColor = cc.Color.RED
      }
    } else {
      if (this.CheckIsNaN(this.m_EDTDelId.string)) {
        isErrInfo = true
        this.m_EDTNextId.m_EDTDelId = cc.Color.RED
      }
    }
    return isErrInfo
  },
  StringCovertoInt(str){
    let intStr = parseInt(str)
    if(isNaN(intStr)) return null
    return  intStr
  }
});
