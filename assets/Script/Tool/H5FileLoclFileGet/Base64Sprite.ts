import {GIFCache} from "./GIF";

const {ccclass, property} = cc._decorator;
let SpriteType = {
  Png: 1, Gif: 2
}

let GifState = {
  Null:0,
  CanPlay:1,
  Play:2,
  Stop:3
}
@ccclass
export default class Base64Sprite extends cc.Component {

  // LIFE-CYCLE CALLBACKS:
  delays = [];
  sp: cc.Sprite;
  frames: cc.SpriteFrame[] = [];
  base64Frames: string[] = [];
  frameIdx = 0;
  // onLoad () {}
  _file = null
  _base64 = null
  _spriteType = SpriteType.Png
  _gifState = GifState.Null
  _isAutoPlay = true
  start() {

  }

  /**
   * 使用base64Data加载一张图片
   * @param sprite 精灵:cc.Sprite
   * @param base64Data imageData
   */
  Base64ImageLoad(sprite: cc.Sprite, base64Data: string) {
    let imageObj = new Image();
    imageObj.src = base64Data;
    let textureObj = new cc.Texture2D();
    textureObj.initWithElement(imageObj);
    textureObj.handleLoadedTexture();
    sprite.spriteFrame = new cc.SpriteFrame(textureObj);
  }

  /**
   * 使用base64Data加载一张Gif
   * @param sprite 精灵:cc.Sprite
   * @param base64Data imageData
   */
  Base64GifLoad(base64Data: ArrayBuffer) {
    GIFCache.parseBase64ToGif(base64Data, (err, data) => {
      if (err) {
        return;
      }
      //this.Base64ImageLoad(this.node.getComponent(cc.Sprite),this.base64Frames[0]);
      this.delays = data.delays.map(v => v / 1e2);
      this.frames = data.spriteFrames;
      this.node.getComponent(cc.Sprite).spriteFrame = this.frames[0];
      this._gifState = GifState.CanPlay;
      if(this._isAutoPlay){
        this.Play(true);
      }
    })
  }

  setBase64() {

  }

  SetFile(file, type = SpriteType.Png) {
    this._file = file;
    this._spriteType = type;
    if (this._spriteType == SpriteType.Png) {
      this.GetFileData(file, (data) => {
        this.Base64ImageLoad(this.node.getComponent(cc.Sprite), data);
      })
    }else if(this._spriteType == SpriteType.Gif){
      this.GetFileArrayBuffer(file, (data) => {
        this.Base64GifLoad(data);
      })
    }
  }

  GetFileData(file, callback) {
    //读取文件
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      console.log("getElementById data", e.target);
      if (callback) callback(data)
    }
    // 以字符串的形式读取文件:
    reader.readAsDataURL(file);
  }
  async GetFileArrayBuffer(file, callback) {
    if(callback) callback(await file.arrayBuffer())
  }
  Play(loop = false, playNext = false) {
    this._gifState = GifState.Play;
    if (!playNext) {
      this.Stop();
    }
    if (this.frames.length) {
      if (this.frameIdx >= this.frames.length) {
        this.frameIdx = 0;
        if (!loop) {
          //this.node.active = false;
          return;
        }
      }
      this.node.active = true;
      this.node.getComponent(cc.Sprite).spriteFrame = this.frames[this.frameIdx];
      this.scheduleOnce(() => {
        this.Play(loop, true);
      }, this.delays[this.frameIdx]);
      this.frameIdx++;
    }
  }

  Stop() {
    this._gifState = GifState.Stop;
    this.frameIdx = 0;
    this.unscheduleAllCallbacks();
  }
}
