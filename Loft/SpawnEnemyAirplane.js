#pragma strict

class SpawnEnemyAirplane extends MonoBehaviour {

	static var enemyAirplanePool:SpawnPool ;
	static var prefab:Transform ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! enemyAirplanePool ) 
			enemyAirplanePool = PoolManager.Pools ["Enemy Airplane"] ;
		if ( ! prefab )
			prefab = enemyAirplanePool.prefabs["mig142"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( ! onCooldown )
		{
			var newAirplane = enemyAirplanePool.Spawn ( prefab ) ;
			var spawn = newAirplane.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 7 * Mathf.Min ( extraTime , 3 ) ) ;
		onCooldown = false ;
	}
}