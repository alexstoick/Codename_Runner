#pragma strict

class PowerUpControl extends MonoBehaviour {

	static var gasTankPool:SpawnPool ;
	static var gas_prefab:Transform ;
	
	static var healthPackPool:SpawnPool ;
	static var health_prefab:Transform ;
	
	static var ammoPackPool:SpawnPool ;
	static var ammoPrefab:Transform ;
		
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
		if ( ! ammoPackPool ) 
			ammoPackPool = PoolManager.Pools["Ammo"] ;
		if ( ! ammoPrefab )
			ammoPrefab = ammoPackPool.prefabs["ammo Holder"] ;
	}

	public function Spawn ( trs:Transform , position:Vector3 )
	{
	
		var spawnOnLoft:SpawnOnLoft = trs.GetComponent ( SpawnOnLoft ) ;
		var despawnTime:float = spawnOnLoft.despawnPoint ;
		
		var rnd:double = Random.value ;
		

		
		if ( trs.name.Contains ( "mig") ) 
		{
			//fuel
			if ( rnd < 0.7 )
				return ;
			var newGas: Transform = gasTankPool.Spawn ( gas_prefab , trs.position , trs.rotation ) ;
			
			spawnOnLoft = newGas.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;

			newGas.position = trs.position ;
			newGas.rotation = trs.rotation ;
			var copil:Transform ;
			copil = newGas.GetChild ( 0 ) ;
			copil.localRotation = trs.GetChild(0).localRotation ;
			return ;
		}
		if ( trs.name.Contains ( "sentry") ) 
		{
			//health
			if ( rnd < 0.7 )
				return ;
			var newHealth: Transform = healthPackPool.Spawn ( health_prefab , trs.position , trs.rotation ) ;

			spawnOnLoft = newHealth.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;

			newHealth.position = trs.position ;
			newHealth.rotation = trs.rotation ;
			return ;
		}

		if ( trs.name.Contains ( "monster" ) ) 
		{
			Debug.Log ( "spawned ammo" + trs.name ) ;
			//ammo
			var newAmmo: Transform = ammoPackPool.Spawn ( ammoPrefab , trs.position , trs.rotation ) ;

			spawnOnLoft = newAmmo.GetComponent ( SpawnOnLoft ) ;
			spawnOnLoft.despawnPoint = despawnTime ;

			newAmmo.position = trs.position ;
			newAmmo.rotation = trs.rotation ;
			
			copil = newAmmo.GetChild ( 0 ) ;
			copil.localRotation = trs.GetChild(0).localRotation ;
			return ;
		}
	}
}