cc.Class({
    extends: cc.Component,

    properties: {
        m_PerfabBezierLine:{
            default:null,type:cc.Prefab,
        },
        m_LayLine:{
            default:null,type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_Lines = [];
    },
    RestMap(){
        for(var index in this.m_Lines)
        {
            this.m_Lines[index].node.removeFromParent();
        }
        delete this.m_Lines;
        this.m_Lines = [];
    }
    ,
    start () {

    },

    // update (dt) {},
    OnBtnAddLine()
    {
        var lineNode = cc.instantiate(this.m_PerfabBezierLine)
        this.m_LayLine.addChild(lineNode)
        var jsc = lineNode.getComponent("BezierLine")
        this.m_Lines.push(jsc)
        jsc.SetIndexNum(this.m_Lines.length)
    },
    OnBtnDelLine()
    {
        if(this.m_Lines.length <= 0) return
        var bl = this.m_Lines.pop()
        bl.node.removeFromParent()
    }
});
