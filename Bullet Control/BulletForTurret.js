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
			spawnBullets ( ) ;
			lastTime = Time.time ;
		}
	}	
	
	function spawnBullets ( )
	{
	
		var newRock:Transform;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;
	}

}