#pragma strict

class PowerUpControl extends MonoBehaviour {

	static var gasTankPool:SpawnPool ;
	static var gas_prefab:Transform ;
	static var healthPackPool:SpawnPool ;
	static var health_prefab:Transform ;
		
	function Start ( )
	{
		if ( ! gasTankPool ) 
			gasTankPool  = PoolManager.Pools ["GasTank"] ;
		if ( ! gas_prefab )
			gas_prefab = gasTankPool.prefabs["gas tank holder"] ;
		if ( ! healthPackPool  ) 
			healthPackPool  = PoolManager.Pools ["HealthPack"] ;
		if ( ! health_prefab )
			health_prefab = healthPackPool.prefabs["health pack holder"] ;
	}

	public function Spawn ( trs:Transform )
	{
	
		var spawnOnLoft:SpawnOnLoft = trs.GetComponent ( SpawnOnLoft ) ;
		var despawnTime:float = spawnOnLoft.despawnPoint ;
		
		if ( trs.name.Contains ( "mig") ) 
		{
			//fuel
			var newGas: Transform = gasTankPool.Spawn ( gas_prefab , trs.position , trs.rotation ) ;
			spawnOnLoft = newGas.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;
		}
	
	}



}