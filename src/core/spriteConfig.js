export const PLAYER_SPRITE = {
    sheet:       'player',
    frameWidth:  32,
    frameHeight: 32,
    animations: {
        walkDown:  { row: 0, frames: 4, fps: 8 },
        walkLeft:  { row: 1, frames: 4, fps: 8 },
        walkRight: { row: 2, frames: 4, fps: 8 },
        walkUp:    { row: 3, frames: 4, fps: 8 },
        death:     { row: 4, frames: 6, fps: 6, loop: false },
    }
}

export const ENEMY_SPRITE = {
    sheet:       'enemy',
    frameWidth:  32,
    frameHeight: 32,
    animations: {
        walkDown:  { row: 0, frames: 4, fps: 6 },
        walkLeft:  { row: 1, frames: 4, fps: 6 },
        walkRight: { row: 2, frames: 4, fps: 6 },
        walkUp:    { row: 3, frames: 4, fps: 6 },
        death:     { row: 4, frames: 4, fps: 6, loop: false },
    }
}

export const BOMB_SPRITE = {
    sheet:       'bombs',
    frameWidth:  16,
    frameHeight: 16,
    animations: {
        pulse: { row: 0, frames: 4, fps: 6 },
    }
}

export const EXPLOSION_SPRITE = {
    sheet:       'bombs',
    frameWidth:  16,
    frameHeight: 16,
    animations: {
        center:    { row: 1, frames: 8, fps: 12 },
        horizontal:{ row: 2, frames: 8, fps: 12 },
        vertical:  { row: 3, frames: 8, fps: 12 },
        tipUp:     { row: 4, frames: 8, fps: 12 },
        tipDown:   { row: 5, frames: 8, fps: 12 },
        tipLeft:   { row: 6, frames: 8, fps: 12 },
        tipRight:  { row: 7, frames: 8, fps: 12 },
        powerUp:   { row: 8, frames: 5, fps: 12, loop: false },
    }
}

export const POWERUP_SPRITE = {
    sheet:      'powerUp',  // o el sheet que uses
    frameWidth:  16,
    frameHeight: 16,
    animations: {
        life:  { row: 0,  frames: 2, fps: 16 },
        bomb:  { row: 1,  frames: 2, fps: 16 },
        range: { row: 2,  frames: 2, fps: 16 },
        speed: { row: 3,  frames: 2, fps: 16 },
    }
}

// Crea una instancia de estado de sprite a partir de una config
export function createSpriteState(config) {
    return {
        ...config,
        current: 'walkDown',
        frame:   0,
        timer:   0,
    }
}