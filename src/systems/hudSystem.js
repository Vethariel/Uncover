import { HUD_HEIGHT } from "../config/constants.js"

export class HudSystem {

    draw(world, gameState, assets, buffer) {

        const player = world.player

        // Fondo del HUD
        buffer.fill(0)
        buffer.noStroke()
        buffer.rect(0, 0, buffer.width, HUD_HEIGHT)

        // Vidas
        this.drawNumber(buffer, assets, player.lives, 8, 8)

        // Puntaje
        this.drawNumber(buffer, assets, player.score, buffer.width / 2, 8)

        // Timer
        const minutes = Math.floor(world.levelTimer / 60)
        const seconds = Math.floor(world.levelTimer % 60)
        const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`
        buffer.fill(world.levelTimer < 30 ? [220, 60, 60] : [255])
        buffer.textSize(8)
        buffer.textAlign(buffer.RIGHT, buffer.TOP)
        buffer.text(timeStr, buffer.width - 16, 8)

        // Score popups
        this.drawPopups(world, assets, buffer)

    }

    drawNumber(buffer, assets, value, x, y) {
        const sheet  = assets.get('numbers')
        if (!sheet) {
            // Fallback texto si no hay sprite
            buffer.fill(255)
            buffer.textSize(8)
            buffer.textAlign(buffer.LEFT, buffer.TOP)
            buffer.text(value, x, y)
            return
        }

        const str    = String(value).padStart(6, '0')
        const digitW = 8
        const digitH = 8

        for (let i = 0; i < str.length; i++) {
            const digit = parseInt(str[i])
            buffer.image(sheet, x + i * digitW, y, digitW, digitH,
                               digit * digitW,  0, digitW, digitH)
        }

    }

    drawPopups(world, assets, buffer) {

        for (const popup of world.scorePopups ?? []) {
            buffer.textAlign(buffer.CENTER, buffer.CENTER)
            buffer.textSize(popup.combo ? 10 : 8)
            buffer.fill(popup.combo ? [255, 220, 0] : [255])
            buffer.text(popup.value, Math.floor(popup.posX), Math.floor(popup.posY))
        }

    }

}