let MaxSclae = 3
cc.Class({
    extends: cc.Component,

    properties: {
        nodeMapScale:cc.Node,
        nodeMap:cc.Node,
        nodeButtonAdd:cc.Node,
        nodeButtonDel:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.nodeMap.on(cc.Node.EventType.TOUCH_START,this.OnTouchStart,this)
        this.nodeMap.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMove,this)
        this.nodeMap.on(cc.Node.EventType.TOUCH_END,this.OnTouchEnd,this)
        this.nodeMap.on(cc.Node.EventType.TOUCH_CANCEL,this.OnTouchCancel,this)


        this.nodeButtonAdd.on(cc.Node.EventType.TOUCH_START,this.OnTouchStartOther,this)
        this.nodeButtonAdd.on(cc.Node.EventType.TOUCH_MOVE,this.OnTouchMoveOther,this)
        this.nodeButtonAdd.on(cc.Node.EventType.TOUCH_END,this.OnTouchEndOther,this)
        this.nodeButtonAdd.on(cc.Node.EventType.TOUCH_CANCEL,this.OnTouchCancelOther,this)
    },

    start () {

    },

    // update (dt) {},
    OnClickAdd(){
        this.nodeMapScale.scale += 0.5
        if(this.nodeMapScale.scale >= MaxSclae){
            this.nodeMapScale.scale =  MaxSclae
        }
    },
    OnCliclDel(){
        this.nodeMapScale.scale -= 0.5
        if(this.nodeMapScale.scale <= 1){
            this.nodeMapScale.scale = 1
        }
    },
    OnTouchStart(event){
        let pos = event.touch.getLocation()
    },
    OnTouchMove(event){
        let pos = event.touch.getDelta()
        this.nodeMapScale.x += pos.x
        this.nodeMapScale.y += pos.y
    },
    OnTouchEnd(event){

    },
    OnTouchCancel(event){

    },


    OnTouchStartOther(event){
        let pos = event.touch.getLocation()
    },
    OnTouchMoveOther(event){
        let pos = event.touch.getDelta()
        this.nodeButtonAdd.x += pos.x
        this.nodeButtonAdd.y += pos.y
    },
    OnTouchEndOther(event){

    },
    OnTouchCancelOther(event){

    }
});
