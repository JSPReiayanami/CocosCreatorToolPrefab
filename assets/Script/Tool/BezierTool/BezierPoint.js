cc.Class({
    extends: cc.Component,

    properties: {
        m_Size:{
            default:new cc.Vec2(20,20),
            notify: function () {
                this.RereshView()
            },
        },
        m_Color:{
            default:new cc.color(255,0,0),
            notify: function () {
                this.RereshView()
            },
        },
        m_Num:{
            default:0,
            notify: function () {
                this.RereshView()
            },
        },
        m_LabNum:{
            default:null,type:cc.Label,
            notify: function () {
                this.RereshView()
            },
        },
        m_LabTag:{
            default:"S",
            notify: function () {
                this.RereshView()
            },
        },
    },


    onLoad () {
        this.OpenTouch();
    },

    start () {
        this.RereshView();
    },
    GetGraphics()
    {
        if(this.m_Graphics == null)
            this.m_Graphics = this.node.getComponent(cc.Graphics);
        return this.m_Graphics;
    },
    RereshView()
    {
        
        if(this.m_Size.x == null || this.m_Size.y == null) return;
        
        this.m_Graphics = this.GetGraphics();
        //var gp = new cc.Graphics();
        this.node.width = this.m_Size.x;
        this.node.height = this.m_Size.y;
        this.m_Graphics.clear(true);
        this.m_Graphics.fillColor = this.m_Color;
        var radius = this.m_Size.x / 2.0;
        if(this.m_Size.y < this.m_Size.x)
        {
            radius = this.m_Size.y / 2.0;
        }
        this.m_Graphics.circle(0,0,radius);
        this.m_Graphics.fill();
        
        if(this.m_Num != null && this.m_LabNum != null)
        {
            this.m_LabNum.node.width = this.m_Size.x;
            this.m_LabNum.node.height = this.m_Size.y;
            this.m_LabNum.fontSize = radius*2;
            this.m_LabNum.lineHeight = radius*2;
            this.m_LabNum.string = (this.m_LabTag || "")+""+this.m_Num;
        }
        
    },
    SetNum(num)
    {
        this.m_Num = num;
        this.RereshView();
    },
    SetColor(color)
    {
        this.m_Color = color;
        this.RereshView();
    },
    OpenTouch()
    {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this);
    },
    CloseTouch()
    {
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this);
    },
    OnTouchMove(event)
    {
        this.node.x = event.getLocation().x;
        this.node.y = event.getLocation().y;
        //cc.log("event.getLocation():",event.getLocation())
        if(this.m_Callback != null)
        {
            this.m_Callback(this);
        }
    },
    SetChangeCallback(call)
    {
        this.m_Callback = call;
    },
    SetTag(tag)
    {
        this.m_LabTag = tag || "";
        this.RereshView();
    }
    
    // update (dt) {},
});
