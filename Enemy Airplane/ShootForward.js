#pragma strict

class ShootForward extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	static private var rockPrefab:Transform ;
	private var lastTime:double = -10.000 ;
	private var bulletsInBurst:int = 0 ;
	var MAX_bulletsInBurst:int = 8 ;
	var TIME_BETWEEN_SHOTS:float = 0.1 ;
	var TIME_BETWEEN_BURSTS:float = 0.5 ;
	
	static private var plane:Transform ;
	
	public var enemy_shootSound: AudioClip ;


	function Start  ( )
	{
		if ( ! plane )
			plane = GameObject.Find ( "plane" ). transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
	}	

	function Update ( )
	{

		if ( LoftMovement.isDead )
			return ;
			
		if ( lastTime > Time.time )
			return ;
		
		var point01:Vector3 = transform.position ;
		var point02:Vector3 = transform.position + transform.forward * 50 ;
		
		var distance = Vector3.Distance ( transform.position , plane.position ) ;
		
		if ( distance > 50 ) 
			return ;
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		//AudioSource.PlayClipAtPoint( enemy_shootSound , transform.position );
		
		rockScript.Init ( point02 ) ;
		lastTime = Time.time + TIME_BETWEEN_SHOTS ;
		
		++bulletsInBurst ;			
		
		if ( bulletsInBurst > MAX_bulletsInBurst )
		{
			lastTime = Time.time + TIME_BETWEEN_BURSTS ;
			bulletsInBurst = 0 ;
		}
	}
	
}