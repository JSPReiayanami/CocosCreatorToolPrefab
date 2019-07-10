// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_LayGoods:cc.Node,
        m_LayTrash:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    GetTrashItemWithPos(pos){
        let vecPos = new cc.Vec2(pos.x,pos.y)
        for(let index in this.m_LayTrash.children){
            let node = this.m_LayTrash.children[index]
            let itembase = node.getComponent('GameGoodsItemBase')
            if(itembase == null) continue
            let bbox = itembase.node.getBoundingBoxToWorld()
            if(bbox.contains(vecPos)){
                return itembase
            }
        }
    },
    GetGoodsItemWithPos(pos){
        let vecPos = new cc.Vec2(pos.x,pos.y)
        for(let index in this.m_LayGoods.children){
            let node = this.m_LayGoods.children[index]
            let itembase = node.getComponent('GameGoodsItemBase')
            if(itembase == null) continue
            let bbox = itembase.node.getBoundingBoxToWorld()
            if(bbox.contains(vecPos)){
                return itembase
            }
        }
    },
    GetItemWithPos(pos){
        let item = this.GetTrashItemWithPos(pos)
        if(item == null){
            item = this.GetGoodsItemWithPos(pos)
        }
        return item
    },
    BronNewGoods(){

    }
});
