const {ccclass, property} = cc._decorator;

@ccclass
export default class BezierPointLine extends cc.Component {
  @property(cc.Sprite)
  SpriteBody: cc.Sprite = null
  @property(cc.Sprite)
  SpriteHead: cc.Sprite = null

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.InitData();
  }

  start() {

  }

  SpritePointArr: Array<cc.Node> = new Array<cc.Node>()

  // update (dt) {}
  InitData() {
    this.SpritePointArr = new Array<cc.Node>()
    let i = 0;
    for (; i < 19;) {
      let sp = cc.instantiate(this.SpriteBody.node);
      this.node.addChild(sp);
      sp.scale = (0.2 + i / 18 * 0.8);
      sp.x = 25 * i;
      this.SpritePointArr.push(sp);
      i++
    }
    let headSp = cc.instantiate(this.SpriteHead.node);
    this.node.addChild(headSp);
    headSp.scale = (0.2 + i / 18 * 0.8);
    headSp.x = 25 * i;
    this.SpritePointArr.push(headSp);

    this.SpriteBody.node.active = false;
    this.SpriteHead.node.active = false;
  }

  ResetView() {
    this.SpritePointArr.forEach((node) => {
      node.active = false;
    });
  }

  ResetPoint(vec_start, vec_end) {
    let ctrlAPos = new cc.Vec3();
    let ctrlBPos = new cc.Vec3();
    ctrlAPos.x = vec_start.x + (vec_start.x - vec_end.x) * 0.1
    ctrlAPos.y = vec_end.y - (vec_end.y - vec_start.y) * 0.2
    ctrlBPos.y = vec_end.y + (vec_end.y - vec_start.y) * 0.3
    ctrlBPos.x = vec_start.x - (vec_start.x - vec_end.x) * 0.3
    for (let i = 0; i < 20; i++) {
      let t = i / 19.0;
      let pos = new cc.Vec3();
      pos.x = vec_start.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrlAPos.x * t * (1 - t) * (1 - t) + 3 * ctrlBPos.x * t * t * (1 - t) + vec_end.x * t * t * t;
      pos.y = vec_start.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrlAPos.y * t * (1 - t) * (1 - t) + 3 * ctrlBPos.y * t * t * (1 - t) + vec_end.y * t * t * t;
      this.SpritePointArr[i].position = pos;
      this.SpritePointArr[i].active = true;
    }
    this.UpdateAngle();
  }

  UpdateAngle() {
    for (let i = 0; i < 20; i++) {
      if (i == 0) {
        this.SpritePointArr[i].angle = -270;
      } else {
        let current = this.SpritePointArr[i];
        let last = this.SpritePointArr[i - 1];
        let lenVec = current.position.sub(last.position);
        let a = 0;//lenVec.angle()
        a = this.GetVectorRadians(current.position.x, current.position.y, last.position.x, last.position.y);//180 / Math.PI   * cc.pToAngle(lenVec);
        this.SpritePointArr[i].angle = -(a - 270);
      }
    }
    this.SpritePointArr[0].angle = this.SpritePointArr[1].angle;
  }

  GetVectorRadians(x1, y1, x2, y2) {
    let len_y = y2 - y1;
    let len_x = x2 - x1;
    let tan_yx = Math.abs(len_y) / Math.abs(len_x);
    let angle = 0;
    if (len_y > 0 && len_x < 0) {
      angle = Math.atan(tan_yx) * 180 / Math.PI - 90;
    } else if (len_y > 0 && len_x > 0) {
      angle = 90 - Math.atan(tan_yx) * 180 / Math.PI;
    } else if (len_y < 0 && len_x < 0) {
      angle = -Math.atan(tan_yx) * 180 / Math.PI - 90;
    } else if (len_y < 0 && len_x > 0) {
      angle = Math.atan(tan_yx) * 180 / Math.PI + 90;
    }
    return angle;
  }
}
