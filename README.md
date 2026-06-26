# Super Bomberman 4 Clone

Clon web de **Super Bomberman 4** (SNES) con los **dos primeros niveles** del modo historia. Hecho con [p5.js](https://p5js.org/) y JavaScript modular (ES modules), sin bundler.

## Características

- Grid clásico de Bomberman: muros indestructibles, bloques destructibles y pasillos
- **2 niveles** cargados desde mapas [Tiled](https://www.mapeditor.org/) (`.tmj`)
- Bombas con cadena de explosiones, timer por nivel (180 s) y portal de salida
- Enemigos con **behavior trees** (patrulla, huida de explosiones, persecución)
- Power-ups aleatorios bajo bloques destructibles (bombas, alcance, velocidad, vida)
- Sistema de vidas, puntuación y progreso guardado en `localStorage`
- Escalado pixel-perfect a pantalla completa

## Controles

| Tecla | Acción |
|-------|--------|
| `W` `A` `S` `D` | Mover |
| `Espacio` | Colocar bomba |
| `Enter` | Confirmar (menú, selección de nivel) |
| `←` `→` | Elegir nivel |
| `Esc` | Pausa / volver al menú |

## Cómo ejecutarlo

Necesitas un servidor local (los módulos ES no cargan bien abriendo `index.html` directamente con `file://`):

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

Abre `http://localhost:8000` en el navegador.

## Estructura del proyecto

```
index.html              Punto de entrada
src/
  main.js               Bootstrap p5.js, render off-screen y escalado
  core/                 Escenas, estado, assets, sonido
  scenes/               Menú, gameplay, overlays (pausa, victoria, game over…)
  systems/              Bombas, colisiones, IA, HUD, power-ups…
  entities/             Jugador, enemigos, bombas, explosiones, portal
  ai/                   Behavior trees, condiciones y acciones
  world/                Grid, carga de niveles (Tiled y ASCII)
  levels/               Definición de niveles disponibles
  config/               Constantes y tipos de enemigo
assets/
  tilemaps/             Mapas level1 y level2 (Tiled)
  sprites/              Sprites del juego
css/
  style.css
```

## Niveles

| # | Archivo | Formato |
|---|---------|---------|
| 1 | `assets/tilemaps/level1.tmj` | Tiled |
| 2 | `assets/tilemaps/level2.tmj` | Tiled |

Al completar un nivel se desbloquea el siguiente. El progreso se guarda automáticamente.

## Stack

- [p5.js 2.0](https://beta.p5js.org/) — renderizado y canvas
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) — audio
- [Tiled](https://www.mapeditor.org/) — diseño de mapas

## Créditos

Sprites, tilesets, efectos de sonido y música extraídos de **Super Bomberman 4** (スーパーボンバーマン4, Super Famicom, 1996).

| | |
|---|---|
| **Desarrollo original** | [Produce!](https://en.wikipedia.org/wiki/Super_Bomberman_4) |
| **Publicación original** | [Hudson Soft Co., Ltd.](https://en.wikipedia.org/wiki/Hudson_Soft) |
| **Titular actual de la IP** | [Konami Digital Entertainment Co., Ltd.](https://www.konami.com/) |
| **Música** | Jun Chikuma |
| **Arte** | Naoto Yoshimi, Shoji Mizuno |

*Bomberman* es una marca registrada de Konami Digital Entertainment Co., Ltd.

Este proyecto es un clon no oficial con fines educativos. No está afiliado, respaldado ni aprobado por Konami Digital Entertainment, Hudson Soft ni Produce!

## Licencia

El **código fuente** de este repositorio se distribuye bajo [MIT](LICENSE) — Copyright (c) 2026 Daniel Gracia.

Los **assets del juego original** (sprites, tilesets, música y efectos de sonido) pertenecen a sus respectivos titulares. No se incluyen en la licencia MIT.
