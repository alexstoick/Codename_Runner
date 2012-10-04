#pragma strict

class SpawnGasTank extends MonoBehaviour {

	static var gasTankPool:SpawnPool ;
	static var prefab:Transform ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! gasTankPool ) 
			gasTankPool  = PoolManager.Pools ["GasTank"] ;
		if ( ! prefab )
			prefab = gasTankPool.prefabs["gas tank holder"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( ! onCooldown )
		{
			var newGasTank = gasTankPool.Spawn ( prefab ) ;
			var spawn = newGasTank.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 40 * Mathf.Min ( extraTime , 3 ) ) ;
		onCooldown = false ;
	}
}