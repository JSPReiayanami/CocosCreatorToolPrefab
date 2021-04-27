
const {ccclass, property} = cc._decorator;

@ccclass
export default class WebViewShow extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.WebView)
    webview:cc.WebView = null
    // onLoad () {}

    start () {

    }

    // update (dt) {}
    onButtonText(){
        this.webview.evaluateJS('test()');
    }
}
