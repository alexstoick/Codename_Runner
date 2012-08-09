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
			ammoBox = BonusesPool.prefabs["ammoBox_group"] ;
		if ( ! healthPack )
			healthPack = BonusesPool.prefabs["healthPack_group"];
	}

	public function Spawn ( loc:Transform )
	{
		var random:float = Random.Range ( 0.0 , 1.0) ;
		
		if ( random < 0.75 ) 
		{
//			Debug.Log ( "random is too small" + random.ToString() ) ;
			return ;
		}
		
		var position:Vector3 = Vector3 ( 3.64 , -1.03 , loc.position.z ) ;
		var rotation:Quaternion = loc.rotation ;
		
		random = Random.Range ( 0.0 , 1.0 ) ;
		
		if ( random < 0.5 )
			BonusesPool.Spawn ( ammoBox , position , rotation ) ;
		else
			BonusesPool.Spawn ( healthPack , position, rotation ) ;
		
	}
}