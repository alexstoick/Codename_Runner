#pragma strict

class SpawnSentry extends MonoBehaviour {

	static var sentryPool:SpawnPool ;
	static var prefab:Transform ;
	
	var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! sentryPool ) 
			sentryPool = PoolManager.Pools ["Sentry"] ;
		if ( ! prefab )
			prefab = sentryPool.prefabs["sentry_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () )
			return ; 

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + 0.1000 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newSentry = sentryPool.Spawn ( prefab ) ;
			var spawn = newSentry.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
		}
	}
}