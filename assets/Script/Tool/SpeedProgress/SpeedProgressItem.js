cc.Class({
    extends: cc.Component,

    properties: {
        m_Precent:{
            default:0,
        },
        m_SpView:{
            default:null,type:cc.Sprite,
            notify:function(){
                this.RefreshViewSize();
            }
        },
        m_Size:{
            default:new cc.Vec2(50,50),
            notify:function(){
                this.RefreshViewSize();
            }
        },
        m_ProStartPos:new cc.Vec2(0,0),
        m_ProEndPos:new cc.Vec2(0,0),
        m_MoveSpeed:0.5,
        m_Speed:5,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.RefreshViewSize();
        this.RefreshPath(false);
    },

    // update (dt) {},
    RefreshViewSize()
    {
        if(this.m_SpView == null) return;
        this.m_SpView.node.width = this.m_Size.x;
        this.m_SpView.node.height = this.m_Size.y;
        this.node.width = this.m_Size.x;
        this.node.height = this.m_Size.y;
        this.RefreshPath();
    },
    RefreshPath(needAction = true)
    {
        if(this._isOnLoadCalled == 0) return;

        var disX = Math.abs( this.m_ProStartPos.x - this.m_ProEndPos.x );
        var disY = Math.abs( this.m_ProStartPos.y - this.m_ProEndPos.y );
        var movePos = new cc.Vec2(0,0);
        movePos.x = this.m_ProStartPos.x + disX * this.m_Precent /100.0;
        movePos.y = this.m_ProStartPos.y + disY * this.m_Precent /100.0;
        if(this.m_MoveActionTag == null)
        {
            this.node.stopActionByTag(this.m_MoveActionTag)
        }
        if(needAction == false)
        {
            this.node.x = movePos.x;
            this.node.y = movePos.y;
            return;
        }

        this.m_MoveActionTag = this.node.runAction(
            cc.sequence(
                cc.moveTo(this.m_MoveSpeed,movePos),
                cc.callFunc(()=>{
                    this.m_MoveActionTag = null;
                })
            )
        ).getTag();
    },
    SetPercent(percent,needAction = true)
    {
        this.m_Precent = percent;
        if(this.m_Precent >= 100)
        {
            this.m_Precent = 100;
        }
        this.RefreshPath(needAction);
    },
    AddPercenet(percent)
    {
        
        this.SetPercent(this.m_Precent + percent)
    }
    ,
    GetPercent()
    {
        return this.m_Precent;
    },
    SetProgressPath(startPos,endPos)
    {
        this.m_ProStartPos = startPos;
        this.m_ProEndPos = endPos;
        this.RefreshPath();
    },
    SetSize(vecSize)
    {
        this.m_Size = new cc.Vec2(vecSize.x,vecSize.y);
        this.RefreshViewSize();
    },
    SetSpeed(speed)
    {
        this.m_Speed = speed;
    },
    GetSpeed()
    {
        return this.m_Speed;
    },
    RunOnce(dt)
    {
        this.m_MoveSpeed = dt;
        this.AddPercenet(this.m_Speed);
    }
});
