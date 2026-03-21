export class LevelSelectScene {

    constructor(gameState) {
        this.gameState = gameState
    }

    onEnter() {
        this.gameState.currentLevelIndex = 0
    }

    update(dt, p) {
        if (this.inputHandler.isJustDown('Enter')) {
            this.manager.transition('gameplay')
            this.manager.showOverlay('levelIntro')
        }
    }

    render(buffer) {
        buffer.background(0)

        buffer.fill(255)
        buffer.textAlign(buffer.CENTER, buffer.CENTER)
        buffer.textSize(16)
        buffer.text('SELECT LEVEL', buffer.width / 2, buffer.height / 2 - 30)

        buffer.textSize(12)
        buffer.fill(100, 200, 255)
        buffer.text('LEVEL 1', buffer.width / 2, buffer.height / 2 + 10)

        buffer.textSize(8)
        buffer.fill(200)
        buffer.text('PRESS ENTER TO START', buffer.width / 2, buffer.height / 2 + 40)
    }

}