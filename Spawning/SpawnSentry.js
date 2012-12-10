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
		//Do not spawn is there is no movement or the boss is spawned.		
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ; 

		//If the path has the same sign and enough distance has passed since the last sentry (0.1009) 
		//another one will be spawned.		

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + Controller.sentry_spawn_distance ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newSentry = sentryPool.Spawn ( prefab ) ;
			var spawn = newSentry.GetComponent ( SpawnOnLoft ) ;
			//Initilize for the guns, they need to know where the turret is spawned in order to not shoot
			//through the loft.
			var setupRotation_0:BulletForTurret = newSentry.GetComponentsInChildren ( BulletForTurret )[0] ;
			var setupRotation_1:BulletForTurret = newSentry.GetComponentsInChildren ( BulletForTurret )[1] ;

			var rotatie:float = Random.value ;
			spawn.Init ( rotatie ) ;
			
			for ( var i = 0 ; i < MonsterVector.transforms.Count ; ++ i )
			{
				//Finding this sentry
				if ( newSentry.name.Equals ( MonsterVector.transforms[i].parent.name ) ) 
				{
					//Setting rotation for turret.
					setupRotation_0.setRotation ( MonsterVector.angles[i] ) ;
					setupRotation_1.setRotation ( MonsterVector.angles[i] ) ;
				}
			}

			//Spawning 4 coins before the turret.
			for ( i = 0 ; i < 4 ; ++ i )
			{
				var initCoin: SpawnCoin = newSentry.GetComponentsInChildren ( SpawnCoin ) [i] ;
				initCoin. position ( i , rotatie ) ;
			}
		}
	}
}