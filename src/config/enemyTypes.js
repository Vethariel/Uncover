// config/enemyTypes.js
import { createBasicEnemyTree } from "../ai/trees/basicEnemy.js"
import { createPatrolEnemyTree } from "../ai/trees/patrolEnemy.js"

export const ENEMY_TYPES = {

    dino: {
        speed:         25,
        size:          12,
        thinkInterval: 0.2,
        sprite:        'dino',
        tree:          () => createPatrolEnemyTree(2,0.1,0.2),
    },

    ghost: {
        speed:         15,
        size:          14,
        thinkInterval: 0.2,
        sprite:        'ghost',
        tree:          () => createBasicEnemyTree(),
    },

    bomber: {
        speed:         50,
        size:          14,
        thinkInterval: 0.5,
        sprite:        'bomber',
        tree:          () => createBasicEnemyTree(),  // pone bombas
    },

}