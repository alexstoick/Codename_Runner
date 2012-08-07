#pragma strict

class PowerUp extends MonoBehaviour {

	static private var BonusesPool:SpawnPool ;
	static private var bonusPrefab:Transform ;
	
	function Start ( )
	{
		if ( ! BonusesPool ) 
			BonusesPool = PoolManager.Pools ["Bonuses"] ;
		if ( ! bonusPrefab )
			bonusPrefab = BonusesPool.prefabs["ammoBox_group"] ;
	}

	public function Spawn ( loc:Transform )
	{
		var random:float = Random.RandomRange ( 0.0 , 1.0) ;
		
		if ( random < 0.7 ) 
		{
			Debug.Log ( "random is too small" + random.ToString() ) ;
			return ;
		}
		
		var position:Vector3 = Vector3 ( 3.64 , -1.03 , loc.position.z ) ;
		var rotation:Quaternion = loc.rotation ;
		
		BonusesPool.Spawn ( bonusPrefab , position , rotation ) ;
		
	}
}