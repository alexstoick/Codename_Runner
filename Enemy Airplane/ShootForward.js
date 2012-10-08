#pragma strict

class ShootForward extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	private var rockPrefab:Transform ;
	private var lastTime:double = -10.000 ;
	private var isPlaneShooter:boolean = false ;
	private var bulletsInBurst:int = 0 ;
	private var MAX_bulletsInBurst:int = 2 ;


	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			if ( transform.name.Contains ( "planeShooter" ) )
			{
				Debug.Log ( transform.name ) ;
				rockPrefab = rocksPool.prefabs[ "plane_bullet" ] ;
				isPlaneShooter = true ;
			}
			else
			{
				Debug.Log ( transform.name ) ;
				rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
			}
	}	

	function Update ( )
	{

		if ( LoftMovement.isDead )
			return ;
			
		if ( isPlaneShooter && ! SwipeDetection2.isTouching ) 
			return ;
			
		if ( lastTime > Time.time )
			return ;
		
		var point01:Vector3 = transform.position ;
		var point02:Vector3 = transform.position + transform.forward * 50 ;
		
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( point02 ) ;
		lastTime = Time.time + 0.03 ;

		++bulletsInBurst ;			
		
		if ( bulletsInBurst > MAX_bulletsInBurst )
		{
			lastTime = Time.time + 0.5 ;
			bulletsInBurst = 0 ;
		}

		
	}
	
}