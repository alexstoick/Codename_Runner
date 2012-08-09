#pragma strict

class DespawnPowerUp extends MonoBehaviour {

	static private var runner:GameObject ;
	static private var bonusesPool:SpawnPool ;
	function Start ( )
	{
		if ( ! runner )
			runner = GameObject.Find ( "BigGroup") ;
		if ( ! bonusesPool )
			bonusesPool = PoolManager.Pools["Bonuses"];
	}

	function Update ( )
	{
		if ( transform.position.z + 10 < runner.transform.position.z )
			bonusesPool.Despawn ( transform ) ;
	}
}