let GameGoodsManager = cc.Class({
  extends: cc.Component,

  properties: {
    m_GameLogic:require('GameGoodsKinds'),

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.Private()
    GameGoodsManager.Instance = this
  },
  onDestroy() {
    GameGoodsManager.Instance = null
  },
  Private() {
    this.m_GameTime = 0
    this.m_GameState = GameGoodsManager.GameState.Idle
  },

  start() {

  },

  update (dt) {

  },
  UpdateGameIng(dt){

  }
});

GameGoodsManager.GameState =  {
    Idle: 1,
    GameIng: 2,
    GameEnd:3,
}
GameGoodsManager.Instance = GameGoodsManager.Instance || null
