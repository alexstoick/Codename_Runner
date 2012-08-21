#pragma strict

class CreateBullet extends MonoBehaviour {

	var laserType:GameObject ;
	var particleEffect: GameObject ;
	static private var parent:Transform ;
	static private var number:int = 0 ;
	static private var bigGroup:Transform ;
	static private var bulletVector:BulletVector ;
	static private var rocksPool:SpawnPool ;
	static private var rockPrefab:Transform ;
	
	function Start ( )
	{
		if ( !bigGroup )
			bigGroup = GameObject.Find ( "BigGroup").transform;	
		if ( !parent )
			parent = GameObject.Find ( "Runner" ).transform ;
		if ( !bulletVector )
			bulletVector = GameObject.Find ( "Bullet Control").GetComponent ( BulletVector ) ;
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs["rock_refferencePoint"] ;
	}
	
	function createParticleEffect ( zPos:double , rotation:Quaternion )
	{
		var position:Vector3 = Vector3 ( 3.64 , -0.98 , zPos ) ;
		
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}

	
	function InstantiateBullet ( pozitieZ:int , rotation_for_bullet:Quaternion )
	{
		rocksPool.Spawn ( rockPrefab , Vector3 ( 3.76 , -0.98 , pozitieZ + 1 ) , rotation_for_bullet ) ;
	}
}
