export const GameSettings = {
  PLAYER_SPEED: 300,         // 玩家左右移动速度 (像素/秒)
  BULLET_SPEED: 500,         // 玩家子弹向上飞行的速度
  FIRE_COOLDOWN: 200,        // 射击冷却时间 (毫秒)
  
  INVINCIBLE_DURATION: 2000, // 被击中后的无敌时间 (毫秒)
  
  INITIAL_LIVES: 3,          // 初始生命数
  
  ENEMY_ROWS: 5,            // 敌机阵列行数
  ENEMY_COLS: 10,            // 敌机阵列列数
  ENEMY_BASE_SPEED: 40,      // 敌机阵列初始平移速度
  
  // 敌机分数设置
  POINTS_BEE: 50,
  POINTS_BUTTERFLY: 80,
  POINTS_BOSS: 150
};
