
let MapCreatorItem = cc.Class({
    extends: cc.Component,

    properties: {
        m_LabLogicId:cc.Label,
        m_LabLastId:cc.Label,
        m_LabNextId:cc.Label,
        m_LabInfoId:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Private()
    },
    Private() {
        this.m_LogicId = null
        this.m_MapLogic = null
        this.m_ItemList = null
        this.m_ChoiceType = MapCreatorItem.ChoiceType.UnChoice
    },

    start () {

    },

    // update (dt) {},
    RefreshView(){
        let data = this.m_MapLogic.GetDataWithLogicId( this.m_LogicId )
        if(data != null){
            this.m_LabLogicId.string = "Lgic:"+(data.LogicId || 'null')
            this.m_LabLastId.string = "Last:"+(data.LastId || 'null')
            this.m_LabNextId.string = "Next:"+(data.NextId || 'null')
            this.m_LabInfoId.string = "Id:"+(data.ItemId || 'null')
        }

        if(this.m_ChoiceType == MapCreatorItem.ChoiceType.Choice){
            this.node.color = new cc.Color(247,158,0)
        }else{
            this.node.color = new cc.Color(255,255,255)
        }
    },
    BindLogic(logic,itemList){
        this.m_MapLogic = logic
        this.m_ItemList = itemList
    },
    SetLogicId(logicId){
        this.m_LogicId = logicId
        this.RefreshView()
    },
    GetLogicId(){
        if(this.m_LogicId == null) return  null
        return this.m_LogicId;
    },
    SetChoice(type){
        this.m_ChoiceType = type
        this.RefreshView()
    },
    Destoy(){
        this.node.destroy()
        this.node.removeFromParent(true)
    },
    OnClick(){
        if(this.m_ChoiceType == MapCreatorItem.ChoiceType.Choice){
            return
        }
        this.m_MapLogic.ShowClickItemLogicView(this.m_ItemList,this)
    }
});

MapCreatorItem.ChoiceType = {
    Choice:1,
    UnChoice:2
}
