#pragma strict

class SpawnEnemyAirplane extends MonoBehaviour {

	//Link to the EnemyAirplane pool from PoolManager
	static var enemyAirplanePool:SpawnPool ; 
	//The prefab used to spawn.
	static var prefab:Transform ;
	//The last point where an airplane was spawned.
	static var lastPath:double = 0.0 ;	
	
	function Start ( )
	{
		if ( ! enemyAirplanePool ) 
			enemyAirplanePool = PoolManager.Pools ["Enemy Airplane"] ;
		if ( ! prefab )
			prefab = enemyAirplanePool.prefabs["mig142"] ;
	}
	
	function Update ( )
	{

		//Do not spawn is there is no movement or the boss is spawned.				
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ; 

		//If the path has the same sign and enough distance has passed since the last airplane (0.1319) 
		//another one will be spawned.

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
			lastPath = LoftMovement.currPath + 0.1319 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}	
			
			var newAirplane = enemyAirplanePool.Spawn ( prefab ) ;
			var spawn = newAirplane.GetComponent ( SpawnOnLoft ) ;
			
			var moveEnemy = newAirplane.GetComponentInChildren ( MoveEnemyAirplane ) ;
			moveEnemy.patrolling = false ;
			
			spawn.Init ( Random.value ) ;
		}
	}
}