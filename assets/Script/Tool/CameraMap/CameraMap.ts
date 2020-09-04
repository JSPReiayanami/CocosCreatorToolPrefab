// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Camera)
    mapCamera: cc.Camera = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.OpenTouch()
    }

    // update (dt) {}
    OpenTouch()
    {
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchCanel, this);
    }
    OnTouchStart(event)
    {
        var pos = event.touch.getLocation();
    }

    OnTouchMove(event)
    {
        var pos = event.touch.getDelta();
        this.mapCamera.node.x -= pos.x
        this.mapCamera.node.y -= pos.y
    }
    OnTouchEnd(event)
    {

    }

    OnTouchCanel(event)
    {

    }
}
