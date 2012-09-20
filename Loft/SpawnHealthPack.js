#pragma strict

class SpawnHealthPack extends MonoBehaviour {

	static var healthPackPool:SpawnPool ;
	static var prefab:Transform ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! healthPackPool  ) 
			healthPackPool  = PoolManager.Pools ["HealthPack"] ;
		if ( ! prefab )
			prefab = healthPackPool.prefabs["health pack holder"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( ! onCooldown )
		{
			Debug.Log ( "spawned health pack" + Time.time ) ;
			var newHealthPack = healthPackPool.Spawn ( prefab ) ;
			var spawn = newHealthPack.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 30 * Mathf.Min ( extraTime , 3 ) ) ;
		onCooldown = false ;
	}
}