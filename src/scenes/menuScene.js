export class MenuScene {

    constructor(gameState) {
        this.gameState = gameState
    }

    onEnter() {
        this.gameState.reset()
    }

    update(dt) {
        if (this.inputHandler.isJustDown('Enter')) {
            this.manager.transition('levelSelect')
        }
    }

    render(buffer) {
        buffer.background(0)

        buffer.fill(255)
        buffer.textAlign(buffer.CENTER, buffer.CENTER)
        buffer.textSize(16)
        buffer.text('BOMBERMAN', buffer.width / 2, buffer.height / 2 - 30)

        buffer.textSize(8)
        buffer.fill(200)
        buffer.text('PRESS ENTER TO START', buffer.width / 2, buffer.height / 2 + 10)
    }

}