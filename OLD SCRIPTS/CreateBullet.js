#pragma strict

class CreateBullet extends MonoBehaviour {

	var particleEffect: GameObject ;
	static private var rocksPool:SpawnPool ;
	static private var rockPrefab:Transform ;
	
	function Start ( )
	{
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs["rock_refferencePoint"] ;
	}

	function InstantiateBullet ( pozitieZ:int , rotation_for_bullet:Quaternion )
	{
		rocksPool.Spawn ( rockPrefab , Vector3 ( 3.76 , -0.98 , pozitieZ + 1 ) , rotation_for_bullet ) ;
	}
}
