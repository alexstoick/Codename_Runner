#pragma strict

class SpawnSentry extends MonoBehaviour {

	static var sentryPool:SpawnPool ;
	static var prefab:Transform ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! sentryPool ) 
			sentryPool = PoolManager.Pools ["Sentry"] ;
		if ( ! prefab )
			prefab = sentryPool.prefabs["sentry_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( ! onCooldown )
		{
			var newSentry = sentryPool.Spawn ( prefab ) ;
			var spawn = newSentry.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 2.5 * Mathf.Min ( extraTime , 3 ) ) ;
		onCooldown = false ;
	}
}