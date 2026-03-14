export const TILE_SIZE = 40

export const TILE_EMPTY = 0
export const TILE_WALL = 1
export const TILE_DESTRUCTIBLE = 2
export const TILE_EXPLOSION = 3

export const PLAYER_SPEED = 200
export const PLAYER_SIZE = 30

export const DIR_NONE = 0
export const DIR_UP = 1
export const DIR_DOWN = 2
export const DIR_LEFT = 3
export const DIR_RIGHT = 4

export const ENEMY_SIZE  = 28   // igual o similar a PLAYER_SIZE
export const ENEMY_SPEED = 60   // más lento que el jugador

// Power ups
export const POWERUP_POOL_RATIO = 0.3      // 30% de bloques destructibles tienen power up
export const POWERUP_LIFE_CHANCE = 0.05    // 5% de probabilidad de vida (independiente del pool)

export const POWERUP_WEIGHTS = {
    bomb:  3,   // cantidad de bombas
    range: 3,   // alcance de bomba
    speed: 2,   // velocidad
}

export const POWERUP_SIZE = 20

// Valores que aplica cada power up
export const POWERUP_BOMB_AMOUNT  = 1
export const POWERUP_RANGE_AMOUNT = 1
export const POWERUP_SPEED_AMOUNT = 20