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

	public function Spawn ( trs:Transform , position:Vector3 )
	{
	
		var spawnOnLoft:SpawnOnLoft = trs.GetComponent ( SpawnOnLoft ) ;
		var despawnTime:float = spawnOnLoft.despawnPoint ;
		
		if ( trs.name.Contains ( "mig") ) 
		{
			//fuel
			var newGas: Transform = gasTankPool.Spawn ( gas_prefab , trs.position , trs.rotation ) ;
			Debug.Log ( trs.name + "		" +  trs.position + "		" +  trs.rotation + "		" +newGas.name) ;
			
			spawnOnLoft = newGas.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;

			newGas.position = trs.position ;
			newGas.rotation = trs.rotation ;
			var copil:Transform ;
			copil = newGas.GetChild ( 0 ) ;
			copil.localRotation = trs.GetChild(0).localRotation ;
		}
		if ( trs.name.Contains ( "sentry") ) 
		{
			//health
			var newHealth: Transform = healthPackPool.Spawn ( health_prefab , trs.position , trs.rotation ) ;
			Debug.Log ( trs.name + "		" +  trs.position + "		" +  trs.rotation + "		" +newHealth.name) ;

			spawnOnLoft = newHealth.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;

			newHealth.position = trs.position ;
			newHealth.rotation = trs.rotation ;
		}
		
	}



}