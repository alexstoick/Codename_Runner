#pragma strict

class BulletForTurret extends MonoBehaviour {

	var Target:Transform ;
	var rocksPool: SpawnPool ;
	var rockPrefab:Transform ;
	var lastTime:double = -10.000 ;

	function Start  ( )
	{
		if ( ! Target )
			Target = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
	}

	function Update ( )
	{
		if ( lastTime + 4 < Time.time  )
		{
			spawnBullets ( ) ;
			
		}
	}	
	function spawnBullets ( )
	{
	
	    var hit : RaycastHit;
	    Physics.Linecast (transform.position, Target.position, hit) ;
//	       if ( hit.transform != Target )
//	       		return ;
		Debug.Log ( hit.transform.name ) ;
	    if ( hit.transform.name != "plane" )
	    	return ;
	    Debug.DrawRay ( transform.position , (Target.position-transform.position )* 10 , Color.green , 0.5) ;
	    


		lastTime = Time.time ;

		Debug.Log ( "can see the plane" ) ;
		
		var newRock:Transform;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		var v3RayDirection:Vector3 = Target.position-transform.position;
		newRock.rigidbody.AddForce(v3RayDirection * 100000 );

/*		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;*/
	}

}