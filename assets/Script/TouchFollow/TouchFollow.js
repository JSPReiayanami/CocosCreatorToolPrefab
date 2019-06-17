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
        m_Fish:{
            default:null,
            type:cc.Node,
        },
        m_Rocker:require("Rocker"),
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_Speed = new cc.Vec2(0,0);
    },

    start () {
        this.m_Rocker.BindMoveCall(( vec )=>{
            this.MoveCall(vec);
        })
    },

    update (dt) {
        this.m_Fish.x += (this.m_Speed.x / 10);
        this.m_Fish.y += (this.m_Speed.y / 10);
    },
    MoveCall(vec)
    {
        cc.log(vec);
        this.m_Speed.x += (vec.x / 10);
        this.m_Speed.y += (vec.y / 10);
        var nd = new cc.Node();
        // nd.rotation
        let comVec = cc.v2(0, 1);    // 水平向右的对比向量
        let radian = vec.signAngle(comVec);    // 求方向向量与对比向量间的弧度
        let degree = cc.misc.radiansToDegrees(radian);    // 将弧度转换为角度
        this.m_Fish.rotation = degree;
    }
});
