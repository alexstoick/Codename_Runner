#pragma strict

class BossShootPlayer extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	static private var plane: Transform ;
	static private var rockPrefab:Transform ;
	
	private var lastTime:double = -10.000 ;
	private var bulletsInBurst:int = 0 ;
	var MAX_bulletsInBurst:int = 8 ;
	var TIME_BETWEEN_SHOTS:float = 0.5 ;
	var TIME_BETWEEN_BURSTS:float = 0.5 ;


	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
		if ( ! plane )
			plane = GameObject. Find ( "plane" ).transform ;
	}	
	
	function canSeePlane() : boolean
	{
	
		var planeRotation:double = plane.parent.parent.localEulerAngles.z ;
    	var lowRot:double = planeRotation - 50 ;
		var highRot:double = planeRotation + 50 ;
		var ownRotation:double ;
		
		ownRotation = transform.parent.parent.localEulerAngles.z ; //checking if ownRotation is between the boundries

		if ( highRot > 360 )
		{
			if ( lowRot <= ownRotation )
				return true ;
			if ( ownRotation <= highRot - 360 )
				return true ;
		}
		if ( lowRot < 0 )
		{
			if ( lowRot + 360 <= ownRotation )
				return true ;
			if ( ownRotation <= highRot )
				return true ;
		}
		
		if ( lowRot <= ownRotation && ownRotation <= highRot )
			return true ;

		return false ;
	
	}

	function Update ( )
	{

		if ( LoftMovement.isDead || ! canSeePlane() || !gameObject.active || BossMovementOnLoft.alpha > 0.3 )
			return ;
			
		if ( lastTime > Time.time )
			return ;
		
		var point01:Vector3 = transform.position ;
		var point02:Vector3 = transform.position + transform.forward * 50 ;
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( plane.position ) ;
		
		lastTime = Time.time + TIME_BETWEEN_SHOTS ;
		
		++bulletsInBurst ;			
		
		if ( bulletsInBurst > MAX_bulletsInBurst )
		{
			lastTime = Time.time + TIME_BETWEEN_BURSTS ;
			bulletsInBurst = 0 ;
		}
	}
	
}