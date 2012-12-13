#pragma strict

class BossShootPlayer extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	static private var plane: Transform ;
	static private var rockPrefab:Transform ;
	
	private var lastTime:double = -10.000 ;
	private var bulletsInBurst:int = 0 ;
	var MAX_bulletsInBurst:int = 8 ;
	var TIME_BETWEEN_SHOTS:float = 0.1 ;
	var TIME_BETWEEN_BURSTS:float = 0.5 ;
	static var isShootingPlayer:boolean = false ;
	
	function Start  ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_3" ] ;
		if ( ! plane )
			plane = GameObject. Find ( "plane critical hit area" ).transform ;
	}	
	
	function canSeePlane() : boolean
	{
	
		var planeRotation:double = plane.parent.parent.parent.localEulerAngles.z ;
    	var lowRot:double = planeRotation - 50 ;
		var highRot:double = planeRotation + 50 ;
		var ownRotation:double ;
		
		ownRotation = transform.parent.parent.localEulerAngles.z ; 
		
		//Special cases when the rotation goes over 360.
		//For example if the target is at 345 we should check the interval (285,45), but unf we cannot do that.
		//Therefore, we check if the angle > 285 or lower than 45.

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
		
		//Normal case.
		if ( lowRot <= ownRotation && ownRotation <= highRot )
			return true ;

		return false ;
	
	}

	function Update ( )
	{

		if ( ! canSeePlane() )
			return ;
		
		if ( BossMovementOnLoft.alpha > 0.45 )
			return ;

		//Do no shoot the player if he is dead, or the boss is not active or still
		//animating the change in FOV.
		if ( LoftMovement.isDead ||  ! gameObject.active || SpawnBoss.changeCameraFOV )
			return ;
			
		isShootingPlayer = true ;
			
		if ( lastTime > Time.time )
			return ;
		
		//Initialize the starting point & final point for the bullets.
		var point01:Vector3 = transform.position ;
		var fin:Vector3 = plane.position ;
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveBossBullet = rock.GetComponent ( MoveBossBullet ) ;
		
		rockScript.Init ( ) ;
		
		lastTime = Time.time + TIME_BETWEEN_SHOTS ;
		
		++bulletsInBurst ;			
		
		//If exceeded the number of bullets in burst, delay the next bullet with the correct time.
		if ( bulletsInBurst > MAX_bulletsInBurst )
		{
			lastTime = Time.time + TIME_BETWEEN_BURSTS ;
			bulletsInBurst = 0 ;
		}
	}
	
}