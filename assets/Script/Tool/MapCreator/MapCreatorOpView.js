let ViewType = {
    Add:1,
    Del:2,
}
let StateLayName = {};
StateLayName[ViewType.Add] = ["LogicId","LayItemId","LayLastId","LayNextId"];
StateLayName[ViewType.Del] = ["LogicId"];
cc.Class({
    extends: cc.Component,

    properties: {
        m_LayNode:cc.Node,
        m_MapLogic:require('MapCreatorLogic')
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Private()
    },
    Private() {
        this.m_ViewState = ViewType.View
    },

    start () {

    },
    // update (dt) {},
    ShowView(data){
        if(data != null){
            if(data.Op != null){
                this.m_ViewState = data.Op
            }
        }
        this.node.active = true
        this.RefreshView()
    },
    RefreshView(){
        let layNameArr = StateLayName[ this.m_ViewState ]
        for (let index in this.m_BtnNode.children) {
            this.m_BtnNode.children[index].active = false
        }
        let nameArr = StateBtnName[this.m_State]
        for (let index in nameArr){
            this.m_BtnNode.getChildByName( nameArr[index] ).active = true
        }
    }
});
