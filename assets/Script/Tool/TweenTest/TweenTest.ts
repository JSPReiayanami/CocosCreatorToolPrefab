// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Label)
    labTips: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:
    private spOData: {
        x: number;
        y: number;
        scale: number;
        opacity: number;
        active:boolean;
    };

    onLoad() {
        this.spOData = {x: 0, y: 0, scale: 1, opacity: 255,active:true};
        this.spOData.x = this.sprite.node.x;
        this.spOData.y = this.sprite.node.y;
        this.spOData.scale = this.sprite.node.scale;
        this.spOData.opacity = this.sprite.node.opacity;

    }

    start() {

    }

    setTpis(string: string) {
        this.labTips.string = string
    }

    resetSprite() {
        cc.tween(this.sprite.node).set(this.spOData).start()
    }

    // update (dt) {}
    onClickMoveTo() {
        this.checkHaveOtherTween(this.sprite.node);
        let posx = Math.random() * (this.node.width / 2);
        let posy = Math.random() * (this.node.height / 2);
        if (Math.floor(Math.random() * 2) == 0) {
            posx = -posx;
        }
        if (Math.floor(Math.random() * 2) == 0) {
            posy = -posy;
        }
        let twennAction = cc.tween(this.sprite.node);
        twennAction = twennAction.to(1, {x: posx, y: posy});
        twennAction = twennAction.call(()=>{
            this.setTpis("移动完毕 To x:" + posx + "-y:" + posx);
        });
        this.setTpis("To x:" + posx + "-y:" + posx);
        twennAction.start();
    }

    onClickMoveBy() {
        this.checkHaveOtherTween(this.sprite.node);
        let posx = Math.random() * (this.node.width / 2);
        let posy = Math.random() * (this.node.height / 2);
        if (Math.floor(Math.random() * 2) == 0) {
            posx = -posx;
        }
        if (Math.floor(Math.random() * 2) == 0) {
            posy = -posy;
        }
        let twennAction = cc.tween(this.sprite.node)
        twennAction = twennAction.by(1, {x: posx, y: posy})
        twennAction = twennAction.call(()=>{
            this.setTpis("移动完毕 To x:" + posx + "-y:" + posx);
        });
        this.setTpis("By x:" + posx + "-y:" + posx)
        twennAction.start();
    }

    checkHaveOtherTween(node:cc.Node) {
        cc.Tween.stopAllByTarget(node)
    }
}
