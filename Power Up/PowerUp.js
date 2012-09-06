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
//			Debug.Log ( "random is too small" + random.ToString() ) ;
			return ;
		}
		
		var position:Vector3 = loc.position ;
		var rotation:Quaternion = loc.rotation ;
		var prefab:Transform ;
		//var rotation:Quaternion = Quaternion ( 0 , 0 , 0 ,0 ) ;
		
		
		random = Random.Range ( 0.0 , 1.0 ) ;
		
		
		if ( random < 0.5 )
			prefab = ammoBox ;
		else
			prefab = healthPack ;
			
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