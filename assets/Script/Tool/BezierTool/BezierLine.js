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
        m_PointC1:{
            default:new cc.Vec2(0,0),
        },
        m_PointC2:{
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
        this.DrawCubicBezier();
        return;
        //这个是官方自带的，我怕计算的点和官方的对不上，自己用公式算点去绘制
        // var graphics = this.node.getComponent(cc.Graphics);
        // graphics.clear();
        // graphics.strokeColor = this.m_Color;
        // graphics.moveTo(this.m_PointS.x,this.m_PointS.y);
        // graphics.bezierCurveTo(this.m_PointC1.x,this.m_PointC1.y,this.m_PointC2.x,this.m_PointC2.y,this.m_PointE.x,this.m_PointE.y);
        // graphics.stroke();

    },
    DrawCubicBezier: function () {
        var segments = 200;
        var graphics = this.node.getComponent(cc.Graphics);
        graphics.clear();
        graphics.strokeColor = this.m_Color;
        graphics.moveTo(this.m_PointS.x,this.m_PointS.y);
        var t = 0;
        for (var i = 0; i < segments; i++) {
            var pos = BezierUtil.GetPosWithPercent(this.m_PointS,this.m_PointC1,this.m_PointC2,this.m_PointE,t);
            t += 1.0 / segments;
            graphics.lineTo(pos.x,pos.y);
        }
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
        this.m_Point.PointC1 = this.CreatePoint(this.m_PointC1,"C1");
        this.m_Point.PointC2 = this.CreatePoint(this.m_PointC2,"C2");
    }
    ,
    FixStartPos(){
        this.m_PointS = new cc.Vec2(this.m_Point.PointS.node.x,this.m_Point.PointS.node.y);
        this.m_PointE = new cc.Vec2(this.m_Point.PointE.node.x,this.m_Point.PointE.node.y);
        this.m_PointC1 = new cc.Vec2(this.m_Point.PointC1.node.x,this.m_Point.PointC1.node.y);
        this.m_PointC2 = new cc.Vec2(this.m_Point.PointC2.node.x,this.m_Point.PointC2.node.y);
    }
    ,
    RefreshPoint()
    {
        if(this.m_IsActive == false) return;
        this.m_Point.PointS.node.x = this.m_PointS.x;
        this.m_Point.PointS.node.y = this.m_PointS.y;
        this.m_Point.PointE.node.x = this.m_PointE.x;
        this.m_Point.PointE.node.y = this.m_PointE.y;
        this.m_Point.PointC1.node.x = this.m_PointC1.x;
        this.m_Point.PointC1.node.y = this.m_PointC1.y;
        this.m_Point.PointC2.node.x = this.m_PointC2.x;
        this.m_Point.PointC2.node.y = this.m_PointC2.y;
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
        var jsc = node.getComponent("BezierPoint")
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
