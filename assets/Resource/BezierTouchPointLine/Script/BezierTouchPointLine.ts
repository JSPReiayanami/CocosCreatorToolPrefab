import BezierPointLine from "./BezierPointLine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BezierTouchPointLine extends cc.Component {

  // LIFE-CYCLE CALLBACKS:
  @property(BezierPointLine)
  pointLine: BezierPointLine = null


  CallBackTouchStart = null
  CallBackTouchMove = null
  CallBackTouchEnd = null
  CallBackTouchCancel = null

  onLoad() {
    this.AddTouchInNode(this.node)
  }

  start() {

  }

  // update (dt) {}
  AddTouchInNode(node) {
    node.on(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
    node.on(cc.Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
    node.on(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
    node.on(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
    node._touchListener.setSwallowTouches(false);
  }

  RemoveTouchInNode(node) {
    node.off(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
    node.off(cc.Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
    node.off(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
    node.off(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
  }

  SetCallBack(touchType, callback) {
    if (cc.Node.EventType.TOUCH_START == touchType) {
      this.CallBackTouchStart = callback;
    } else if (cc.Node.EventType.TOUCH_MOVE == touchType) {
      this.CallBackTouchMove = callback;
    } else if (cc.Node.EventType.TOUCH_END == touchType) {
      this.CallBackTouchEnd = callback;
    } else if (cc.Node.EventType.TOUCH_CANCEL == touchType) {
      this.CallBackTouchCancel = callback;
    }
  }

  SetAllCallBack(scp) {
    if (scp.OnTouchStart) {
      this.CallBackTouchStart = function (event) {
        scp.OnTouchStart(event)
      };
    }
    if (scp.OnTouchMove) {
      this.CallBackTouchMove = function (event) {
        scp.OnTouchMove(event)
      };
    }
    if (scp.OnTouchEnd) {
      this.CallBackTouchEnd = function (event) {
        scp.OnTouchEnd(event)
      };
    }
    if (scp.OnTouchCancel) {
      this.CallBackTouchCancel = function (event) {
        scp.OnTouchCancel(event)
      };
    }
  }

  StartPosition = null
  MovePosition = null

  OnTouchStart(event) {
    let target = event.target;
    let location = event.getLocation();
    cc.log("[TouchGet]location:", location)
    if (this.CallBackTouchStart) {
      this.CallBackTouchStart(event);
    }
    this.TouchStart = true;
    this.StartPosition = location;
    return true;
  }

  OnTouchMove(event) {
    //if(this.TouchStart != true) return;
    let target = event.target;
    let location = event.getLocation();
    cc.log("[TouchGet]location:", location)
    if (this.StopFlag == true) {
      this.StopFlag = false
      return false
    }
    if (this.CallBackTouchMove) {
      let boolRt = this.CallBackTouchMove(event);
      if (boolRt !== false) {
        boolRt = true
      }
      return boolRt
    }
    this.MovePosition = location;
    this.updateBezierView();
    return true;
  }

  updateBezierView() {
    if (this.StartPosition != null && this.MovePosition != null) {
      let startPos = this.pointLine.node.convertToNodeSpaceAR(this.StartPosition);
      let endPos = this.pointLine.node.convertToNodeSpaceAR(this.MovePosition);
      this.pointLine.ResetPoint(startPos, endPos);
    } else {
      this.pointLine.ResetView();
    }
  }

  OnTouchEnd(event) {
    // let target = event.target;
    // let location = event.getLocation();
    // cc.log("[TouchGet]location:",location)
    if (this.CallBackTouchEnd) {
      this.CallBackTouchEnd(event);
    }
    this.TouchStart = false;
    this.StartPosition = null;
    this.MovePosition = null;
    this.updateBezierView();
  }

  OnTouchCancel(event) {
    // let target = event.target;
    // let location = event.getLocation();
    // cc.log("[TouchGet]location:",location)
    if (this.CallBackTouchCancel) {
      this.CallBackTouchCancel(event);
    }
    this.TouchStart = false;
    this.StartPosition = null;
    this.MovePosition = null;
    this.updateBezierView();
  }

  // update (dt) {},
  TouchStart = false
  StopFlag = false

  StopMove() {
    if (this.TouchStart == true) {
      this.StopFlag = true
    }
  }

  StartMove() {
    this.StopFlag = false;
  }

}
