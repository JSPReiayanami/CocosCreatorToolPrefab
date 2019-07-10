


let GameGoodsItemBase = cc.Class({
    extends: cc.Component,

    properties: {
        m_View:cc.Sprite,
        m_Name:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Private()
    },

    Private(){
        this.m_Select = false
        this.m_Id = null
    },

    start () {

    },
    SetData(data){
        if(data == null) return
        if(data.Id != null) this.m_Id = data.Id
        this.RefreshView()
    },
    // update (dt) {},
    SetSelect(isSelect){
        if(this.m_Select === isSelect) return
        this.m_Select = isSelect
        if(this.m_Select){
            this.ShowSelect()
        }else{
            this.ShowUnSelect()
        }
    },
    RefreshView(){

    },
    ShowSelect(){

    },
    ShowUnSelect(){

    },
    ReceiveGoods(goods){

    },
});
