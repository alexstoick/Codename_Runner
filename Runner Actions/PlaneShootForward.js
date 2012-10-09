#pragma strict

class PlaneShootForward extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	private var rockPrefab:Transform ;
	private var lastTime:double = -10.000 ;
	private var bulletsInBurst:int = 0 ;
	private var MAX_bulletsInBurst:int = 8 ;


	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "plane_bullet" ] ;
	}	

	function FireGun ( )
	{		
		if ( ( FireProgressBar.currCooldown + 0.625*2 ) > 10 )
			return ;			
		
		var point01:Vector3 = transform.position ;
		var point02:Vector3 = transform.position + transform.forward * 50 ;
		
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( point02 ) ;
		
		FireProgressBar.currCooldown += 0.625 ;
		FireProgressBar.lastModified = Time.time ;
	}
}