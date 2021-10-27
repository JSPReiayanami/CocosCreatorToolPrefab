//https://blog.csdn.net/erweimac/article/details/108757495
const {ccclass, property} = cc._decorator;

@ccclass
export default class H5FileLoclFileGet extends cc.Component {

  // LIFE-CYCLE CALLBACKS:
  @property(cc.Sprite)
  copySprite: cc.Sprite = null
  @property(cc.Node)
  showCount: cc.Node = null

  // onLoad () {}

  start() {
    window.HaveInputFile = this.HaveInputFile.bind(this);
  }

  // update (dt) {}
  onClickGetFile() {
    if (document.getElementById("fileInput") != null) {
      document.getElementById("fileInput").click();
    }
  }

  HaveInputFile(files) {
    cc.log(files)
    this.showCount.destroyAllChildren();
    for (let index = 0; index < files.length; index++) {
      if (this.CheckIsGif(files[index].name)) {
        let spriteFrame = this.GetGifSpriteWithFile(files[index], null);
        this.showCount.addChild(spriteFrame);
      } else {
        let spriteFrame = this.GetSpriteWithFile(files[index], null);
        this.showCount.addChild(spriteFrame);
      }

    }
  }

  CheckIsGif(fileName) {
    let fileNameArr = fileName.split(".");
    if (fileNameArr[fileNameArr.length - 1] == 'gif') {
      return true
    }
    return false
  }

  GetSpriteWithFile(file, callback) {
    let newSpriteNode = cc.instantiate(this.copySprite.node);
    newSpriteNode.x = 0;
    newSpriteNode.y = 0;
    let base64Sprite = newSpriteNode.getComponent("Base64Sprite");
    base64Sprite.SetFile(file);
    return newSpriteNode;
  }

  GetGifSpriteWithFile(file, callback) {
    let newSpriteNode = cc.instantiate(this.copySprite.node);
    newSpriteNode.x = 0;
    newSpriteNode.y = 0;
    let base64Sprite = newSpriteNode.getComponent("Base64Sprite");
    base64Sprite.SetFile(file, 2);
    return newSpriteNode;
  }
}
