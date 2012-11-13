#pragma strict

class SpawnSentry extends MonoBehaviour {

	static var sentryPool:SpawnPool ;
	static var prefab:Transform ;
	
	static var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! sentryPool ) 
			sentryPool = PoolManager.Pools ["Sentry"] ;
		if ( ! prefab )
			prefab = sentryPool.prefabs["sentry_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ; 

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + 0.1009 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newSentry = sentryPool.Spawn ( prefab ) ;
			var spawn = newSentry.GetComponent ( SpawnOnLoft ) ;
			var setupRotation_0:BulletForTurret = newSentry.GetComponentsInChildren ( BulletForTurret )[0] ;
			var setupRotation_1:BulletForTurret = newSentry.GetComponentsInChildren ( BulletForTurret )[1] ;

			var rotatie:float = Random.value ;
			spawn.Init ( rotatie ) ;
			
			for ( var i = 0 ; i < MonsterVector.transforms.Count ; ++ i )
			{
				if ( newSentry.name.Equals ( MonsterVector.transforms[i].parent.name ) )
				{
					setupRotation_0.setRotation ( MonsterVector.angles[i] ) ;
					setupRotation_1.setRotation ( MonsterVector.angles[i] ) ;
				}
			}
			
			for ( i = 0 ; i < 4 ; ++ i )
			{
				var initCoin: SpawnCoin = newSentry.GetComponentsInChildren ( SpawnCoin ) [i] ;
				initCoin. position ( i , rotatie ) ;
			}
		}
	}
}