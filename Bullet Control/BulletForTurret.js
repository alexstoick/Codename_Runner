#pragma strict

class BulletForTurret extends MonoBehaviour {

	var rocksPool: SpawnPool ;
	var rockPrefab:Transform ;
	var lastTime:double = 0.000 ;

	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
	}

	function Update ( )
	{
		if ( lastTime + 5 < Time.time  )
		{
			var newRock = rocksPool.Spawn ( rockPrefab ) ;
			newRock.position = transform.position ;
			newRock.GetComponent ( MoveTurretBullet ).Init() ;
			lastTime = Time.time ;
		}
	}	

}