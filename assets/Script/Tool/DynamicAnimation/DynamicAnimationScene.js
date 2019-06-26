// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_dynamicSp:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    OnBtnClick(event){
        cc.loader.loadRes('DynamicAnimation/Anim/Anim1',cc.AnimationClip,(err,clip)=>{
            cc.log(err)
            cc.log(clip)
            let target = event.target
            let wroldPos = target.convertToWorldSpaceAR(new cc.Vec2(0,0))
            let toPos = this.m_dynamicSp.parent.convertToNodeSpaceAR( wroldPos )
            let posArr = []
            posArr.push(toPos.x)
            posArr.push(toPos.y)
            let anim = this.getComponent(cc.Animation);
            clip.curveData.paths['AnimNode/Sprite'].props.position[1].value = posArr
            anim.removeClip('Anim1',true)
            anim.addClip( clip,'Anim1' )
            let animState = anim.play('Anim1');
        })



    }

});
