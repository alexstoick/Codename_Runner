#pragma strict

class PowerUp extends MonoBehaviour {

	static private var BonusesPool:SpawnPool ;
	static private var ammoBox:Transform ;
	static private var healthPack:Transform ;
	
	function Start ( )
	{
		if ( ! BonusesPool ) 
			BonusesPool = PoolManager.Pools ["Bonuses"] ;
		if ( ! ammoBox )
			ammoBox = BonusesPool.prefabs["ammoBox_Holder"] ;
		if ( ! healthPack )
			healthPack = BonusesPool.prefabs["health pack"];
	}

	public function Spawn ( loc:Transform )
	{
		var random:float = Random.Range ( 0.0 , 1.0) ;
		
		
		if ( random < 0.85 ) 
		{
			return ;
		}
		
		var position:Vector3 = loc.position ;
		var rotation:Quaternion = loc.rotation ;
		var prefab:Transform ;
		
		prefab = ammoBox ;

		var newBonus = BonusesPool.Spawn ( prefab , position, rotation ) ;
		var despawn = newBonus.GetComponent ( DespawnPowerUp ) ;
		var despawnPoint:float ;
		
		despawnPoint = LoftMovement.position ( ) + 0.17f;
		if (despawnPoint > 1) {
			despawnPoint -= 1f;
			despawnPoint = -1f + despawnPoint;
		}
		
		despawn.point = despawnPoint ;
	}
}