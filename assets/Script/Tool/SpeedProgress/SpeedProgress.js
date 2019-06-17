cc.Class({
    extends: cc.Component,

    properties: {
        m_SpBarBg:{
            default:null,type:cc.Sprite,
            notify:function(){
                this.RefreshBarBg();
            }
        },
        m_PrefabItem:{
            default:null,type:cc.Prefab,
        },
        m_SpBarBgSize:{
            default:new cc.Vec2(100,600),
            notify:function(){
                this.RefreshBarBg();
            }
        },
        m_Run:false,
        m_CallBack:null,
    },
    onLoad () {
        this.m_TestTime = 0;
        this.m_Items = {};
    },

    start () {

    },
    //模拟服务器发送运动路径
    update (dt) {
        this.m_TestTime += dt;
        if(this.m_TestTime >= 0.5)
        {
            this.m_TestTime -= 0.5;
            this.UpdateRunItem(0.5);
        }
    },
    RefreshBarBg()
    {
        if(this.m_SpBarBg == null) return;
        this.m_SpBarBg.node.width = this.m_SpBarBgSize.x;
        this.m_SpBarBg.node.height = this.m_SpBarBgSize.y;
    },
    AddItem(data)
    {
        if(data == null || data.Id == null || data.Speed == null) return;
        this.RemoveItem(data);

        var nodeItem = cc.instantiate(this.m_PrefabItem);
        var jsc = nodeItem.getComponent("SpeedProgressItem");
        var startPos = new cc.Vec2( this.m_SpBarBgSize.x/2, -this.m_SpBarBgSize.y/2 )
        var endPos = new cc.Vec2( this.m_SpBarBgSize.x/2, this.m_SpBarBgSize.y/2 )
        jsc.SetProgressPath(startPos,endPos);
        jsc.SetPercent(0,false);
        jsc.SetSpeed(data.Speed);
        this.node.addChild(nodeItem);
        this.m_Items[data.Id] = jsc;
    },
    RemoveItem(data)
    {
        var id = 0;
        if(typeof data == "object")
        {
            if(data == null || data.Id == null || data.Speed) return;
            id = data.Id;
        }
        else
        {
            if(data == null) return;
            id = data;
        }
            
        if(this.m_Items[id] == null) return;
        this.m_Items[id].node.removeFromParent(true);
        this.m_Items[id] = null;
        delete this.m_Items[id];
    },
    UpdateRunItem(dt)
    {
        for (var id in this.m_Items) 
        {
            var item = this.m_Items[id];
            if(item.GetPercent() >= 100)
            {
                item.SetPercent(0,false);
            }
            item.RunOnce(dt);
        }
    },
    StartRun()
    {
        this.m_Run = true;
    },
    StopRun()
    {
        this.m_Run = true;
    },
    OnTestAdd()
    {
        this.m_TestId = this.m_TestId == null ? 1 : this.m_TestId+1;
        this.AddItem({Id:this.m_TestId,Speed:1+Math.ceil( Math.random()*10)})
    },
    OnTestDel()
    {
        for(var id in this.m_Items)
        {
            this.RemoveItem(id);
            break;
        }
    },
    BindCallBack( callback )
    {
        this.m_CallBack = callback;
    }
    ,
    CallRunEnd(item)
    {
        if(this.m_CallBack)
        {
            this.m_CallBack(item)
        }
    }
});
