var BezierUtil = require('BezierUtil');
cc.Class({
    extends: cc.Component,

    properties: {
        m_PointS:{
            default:new cc.Vec2(0,0),
        },
        m_PointE:{
            default:new cc.Vec2(0,0),
        },
        m_PointPerfab:{
            default:null,type:cc.Prefab,
        },
        m_Color:{
            default:new cc.color(255,0,0),
            notify:function(){
                this.RefreshPoint();
            }
        },
        m_IsActive:{
            default:false,
            notify:function(){
                this.InitView();
            }
        },
        m_IndexNum:{default:0}
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.InitData();
    },
    InitData()
    {
        if(this.m_IsActive == true)
        {
            this.ClearAllPoint();
        }
        this.m_IsActive = true;
        this.InitView();
        this.FixStartPos();
        this.PrintLine();
    }
    ,
    start () {

    },

    update (dt) {

    },
    PrintLine()
    {
        this.DrawCubicLine();
    },
    DrawCubicLine: function () {
        var graphics = this.node.getComponent(cc.Graphics);
        graphics.clear();
        graphics.strokeColor = this.m_Color;
        graphics.moveTo(this.m_PointS.x,this.m_PointS.y);
        graphics.lineTo(this.m_PointE.x,this.m_PointE.y);
        graphics.stroke();
    }
    ,
    InitView()
    {
        this.ClearAllPoint();
        if(this.m_IsActive == false) return;
        this.m_Point = {};
        this.m_Point.PointS = this.CreatePoint(this.m_PointS,"S");
        this.m_Point.PointE = this.CreatePoint(this.m_PointE,"E");
    }
    ,
    FixStartPos(){
        this.m_PointS = new cc.Vec2(this.m_Point.PointS.node.x,this.m_Point.PointS.node.y);
        this.m_PointE = new cc.Vec2(this.m_Point.PointE.node.x,this.m_Point.PointE.node.y);
    }
    ,
    RefreshPoint()
    {
        if(this.m_IsActive == false) return;
        this.m_Point.PointS.node.x = this.m_PointS.x;
        this.m_Point.PointS.node.y = this.m_PointS.y;
        this.m_Point.PointE.node.x = this.m_PointE.x;
        this.m_Point.PointE.node.y = this.m_PointE.y;
    },
    CreatePoint(pos,tag)
    {
        var node = cc.instantiate(this.m_PointPerfab);
        node.parent = this.node;
        if(pos != null)
        {
            node.x = pos.x;
            node.y = pos.y;
        }
        var jsc = node.getComponent("PointToPointDWPoint")
        jsc.SetChangeCallback((target)=>{
            this.PointChange(target)
        })
        jsc.SetNum(this.m_IndexNum);
        jsc.SetTag(tag);
        return jsc;
    }
    ,
    ClearAllPoint()
    {
        this.m_Point = {};
        this.node.removeAllChildren(true);
    },
    SetColor(color)
    {
        this.m_color = color;
        if(this.m_Point != null && this.m_Point != undefined)
        {
            for(var i in this.m_Point)
            {
                this.m_Point[i].SetColor(color);
            }
        }
    },
    PointChange(target)
    {
        this.FixStartPos();
        this.PrintLine();
    },
    SetIndexNum(num)
    {
        this.m_IndexNum = num;
        for(var name in this.m_Point)
        {
            this.m_Point[name].SetNum(this.m_IndexNum);
        }
    }
});
