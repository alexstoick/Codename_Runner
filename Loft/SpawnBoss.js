#pragma strict

class SpawnBoss extends MonoBehaviour {

	static var bossPool:SpawnPool ;
	static var prefab:Transform ;
	
	var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! bossPool ) 
			bossPool = PoolManager.Pools ["Boss"] ;
		if ( ! prefab )
			prefab = bossPool.prefabs["boss"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () )
			return ; 

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + 0.1009 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newBoss = bossPool.Spawn ( prefab ) ;
			var spawn = newBoss.GetComponent ( SpawnOnLoft ) ;
						
			spawn.Init ( ) ;
			
		}
	}
}