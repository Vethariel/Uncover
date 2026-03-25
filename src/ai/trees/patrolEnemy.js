import { Selector, Sequence }  from "../behaviorTree.js"
import { IsInDanger }          from "../conditions/isInDanger.js"
import { FleeExplosion }       from "../actions/fleeExplosion.js"
import { PatrolAndWait }       from "../actions/patrolAndWait.js"

export function createPatrolEnemyTree( minDistance = 4, waitTime = 2) {
    return new Selector(
        new Sequence(
            new IsInDanger(),
            new FleeExplosion()
        ),
        new PatrolAndWait(minDistance, waitTime)  // mínimo 4 tiles de distancia, espera 2 segundos
    )
}