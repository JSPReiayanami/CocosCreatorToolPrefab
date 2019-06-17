
cc.Class({
    extends: cc.Component,

    properties: {
        m_SpBarStart: {
            default: null,  
            type: cc.Node, 
        },
        m_SpBarMove:{
            default: null,  
            type: cc.Node, 
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_SpBarStart.active = false;
        this.m_SpBarMove.active = false;
        this.m_LogicTime = 0.1;
        this.m_Time = 0;
        this.m_Toch = false;
        this.m_LastPos = new cc.Vec2(0,0);
    },

    start () {
        this.OpenTouch();
    },

    update (dt) {
        if(this.m_Toch == false)
        {
            this.m_Time = 0;
            //this.m_LastPos = new cc.Vec2(0,0);
        }else
        {
            this.m_Time += dt;
            if(this.m_LogicTime <= this.m_Time)
            {
                //this.m_MoveCall()
            }
        }
        
    },
    BindMoveCall(call)
    {
        this.m_MoveCall = call;
    }
    ,
    OpenTouch()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchCanel, this);
    },
    OnTouchStart(event)
    {
        var pos = event.touch.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos)
        this.m_LastPos = pos;
        this.m_SpBarStart.x = pos.x;
        this.m_SpBarStart.y = pos.y;
        this.m_SpBarStart.active = true;
    },
    OnTouchMove(event)
    {
        var pos = event.touch.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos)
        this.m_SpBarMove.x = pos.x;
        this.m_SpBarMove.y = pos.y;
        this.m_SpBarMove.active = true;
        var vec = new cc.Vec2(pos.x - this.m_LastPos.x, pos.y - this.m_LastPos.y);
        this.m_MoveCall(vec)
        this.m_LastPos = pos;
    },
    OnTouchEnd(event)
    {
        this.m_SpBarStart.active = false;
        this.m_SpBarMove.active = false;
    },
    OnTouchCanel(event)
    {
        this.m_SpBarStart.active = false;
        this.m_SpBarMove.active = false;
    }
});
