export class LevelIntroOverlay {

    constructor(gameState) {
        this.gameState = gameState
        this.timer     = 0
        this.duration  = 3.7
    }

    onEnter() {
        
        this.timer = this.duration
        this.soundManager.playMusic('levelStart', false)
    }

    update(dt, p) {
        this.timer -= dt

        if (this.timer <= 0) {
            this.manager.hideOverlay()
        }
    }

    render(buffer) {
        // Oscurece la escena base
        buffer.fill(0, 0, 0, 150)
        buffer.noStroke()
        buffer.rect(0, 0, buffer.width, buffer.height)

        buffer.textAlign(buffer.CENTER, buffer.CENTER)

        buffer.fill(255)
        buffer.textSize(10)
        buffer.text('LEVEL', buffer.width / 2, buffer.height / 2 - 20)

        buffer.textSize(20)
        buffer.fill(255, 220, 0)
        buffer.text(this.gameState.currentLevelIndex + 1, buffer.width / 2, buffer.height / 2 + 10)
    }

}