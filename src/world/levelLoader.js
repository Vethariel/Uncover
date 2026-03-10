import { Grid } from "./grid.js"
import { TILE_EMPTY, TILE_WALL, TILE_DESTRUCTIBLE } from "../config/constants.js"

export class LevelLoader {

  static load(world, map) {

    const rows = map.length
    const cols = map[0].length

    const grid = new Grid(cols, rows)

    for (let y = 0; y < rows; y++) {

      for (let x = 0; x < cols; x++) {

        const char = map[y][x]

        switch (char) {

          case "#":
            grid.set(x, y, TILE_WALL)
            break

          case "+":
            grid.set(x, y, TILE_DESTRUCTIBLE)
            break

          case "P":
            grid.set(x, y, TILE_EMPTY)
            world.playerSpawn = { x, y }
            break

          default:
            grid.set(x, y, TILE_EMPTY)

        }

      }

    }

    world.grid = grid

  }

}