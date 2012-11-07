#pragma strict

class PlaneShootForward extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	private var rockPrefab:Transform ;

	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "plane_bullet" ] ;
	}	

	function FireGun ( )
	{		
		
		var point01:Vector3 = transform.position ;
		var point02:Vector3 = transform.position + transform.forward * 150 ;
		
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MovePlaneBullet = rock.GetComponent ( MovePlaneBullet ) ;
		
		rockScript.Init ( point02 ) ;
		
		FireProgressBar.currCooldown += 0.3125 ;
		FireProgressBar.lastModified = Time.time ;
	}
}