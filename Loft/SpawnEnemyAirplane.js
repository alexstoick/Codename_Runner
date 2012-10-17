#pragma strict

class SpawnEnemyAirplane extends MonoBehaviour {

	static var enemyAirplanePool:SpawnPool ;
	static var prefab:Transform ;
	
	var lastPath:double = 0.0 ;	
	
	function Start ( )
	{
		if ( ! enemyAirplanePool ) 
			enemyAirplanePool = PoolManager.Pools ["Enemy Airplane"] ;
		if ( ! prefab )
			prefab = enemyAirplanePool.prefabs["mig142"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () )
			return ; 

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
			spawn.Init ( ) ;
		}
	}
}