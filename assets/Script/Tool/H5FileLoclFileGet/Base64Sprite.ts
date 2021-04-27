const {ccclass, property} = cc._decorator;

@ccclass
export default class Base64Sprite extends cc.Component {

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  _file = null
  _base64 = null

  start() {

  }

  /**
   * 使用base64Data加载一张图片
   * @param sprite 精灵:cc.Sprite
   * @param base64Data imageData
   */
  base64ImageLoad(sprite: cc.Sprite, base64Data: string) {
    let imageObj = new Image();
    imageObj.src = base64Data;
    let textureObj = new cc.Texture2D();
    textureObj.initWithElement(imageObj);
    textureObj.handleLoadedTexture();
    sprite.spriteFrame = new cc.SpriteFrame(textureObj);
  }

  setBase64() {

  }

  setFile(file) {
    this._file = file;
    this.getFileData(file, (data) => {
      this.base64ImageLoad(this.node.getComponent(cc.Sprite), data);
    })
  }

  getFileData(file, callback) {
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
}
