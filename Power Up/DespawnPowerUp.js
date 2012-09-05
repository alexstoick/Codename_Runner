#pragma strict

class DespawnPowerUp extends MonoBehaviour {

	static private var runner:MoveRunnerNew ;
	static private var bonusesPool:SpawnPool ;
	var point:float ;
	function Start ( )
	{
		if ( ! bonusesPool )
			bonusesPool = PoolManager.Pools["Bonuses"];
	}

	function Update ( )
	{
		if ( LoftMovement.position () > point )
			bonusesPool.Despawn ( transform ) ;
	}
}