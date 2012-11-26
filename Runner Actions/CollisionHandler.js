#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;

	//Refferences to the spawnPools
	static private var enemiesPool: SpawnPool ;
	static private var boxPool: SpawnPool ;
	
	//The direction in which the plane will roll-over.
	static private var rolloverDirection:String ;
	
	//Particle effects. Can be edited from the inspector.
	public var particleEffect_hitPlane:GameObject;
	public var particleEffect_dead:GameObject ;
	public var particleEffect_hitCoin:GameObject ;
	
	//Link to the 'plane' object in order to place explosions.
	static public var plane:Transform ;
	
	//The bobbing time that happens on collision.
	static private var bobbingEndTime:double = 0.0 ;
	
	//Used to restore the camera to the original rotation & animate it.
	static private var cameraTransform:Transform ;
	
	
	//Sounds for different events. Can be set from inspector.
	public var coinCollectSound: AudioClip ;
	public var rolloverSound: AudioClip ;
	public var bonusHealthSound: AudioClip ;
	public var hitByBulletSound:AudioClip ;

	function Awake ( )
	{
		//Initialize all the static variables.
		if ( ! cameraTransform )
			cameraTransform  = GameObject.Find ( "Main Camera" ).transform ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
	}
	
	function Start ( )
	{ 
		//Set-up the pools.
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Monsters"] ;
		if ( ! boxPool ) 
			boxPool = PoolManager.Pools["Boxes"] ;
	}

	function Update ( )
	{
		//Animate the camera if it is required.
		if ( bobbingEndTime > Time.time )
		{
			cameraTransform.localRotation = Quaternion.Euler( 335 + Mathf.PingPong(Time.time * 30.0, 1.5), 0.0 , 180.0 );
		}
	}
	
	//Creates the particle effect when the plane hits the coin.
	function createParticleEffect_hitCoin ( )
	{
		var instance = Instantiate( particleEffect_hitCoin , plane.position , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
		instance.transform.parent = plane ;
		instance.transform.localPosition = Vector3 ( 1 , 0 , 0 ) ;
		instance.transform.localRotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		Destroy(instance.gameObject, 1 );
	}
	
	//Create the particle effect when the plane dies.
	function createParticleEffect_dead ( )
	{
		var instance = Instantiate( particleEffect_dead , plane.position , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
		plane.gameObject.active = false ;
		DamageSmoke.doNotEmit = true ;
		Destroy(instance.gameObject, 1 );
	}
	
	//Creates the particle effect when the plane is hit, on @param:position.
	function createParticleEffect_hitPlane ( position:Vector3 )
	{
		var instance = Instantiate ( particleEffect_hitPlane , position , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
		instance.transform.parent = plane ;	
		bobbingEndTime = Time.time + 0.2 ;
	}
	
	//Used to make the runner roll over.
	function rolloverRunnner ( )
	{
		
		HealthProgressBar.currHealth -= Controller.HP_lost_onNonCriticalHit ;
		if ( HealthProgressBar.currHealth <= 0 )
			createParticleEffect_dead ( ) ;
		
		yield WaitForSeconds ( 0.1 ) ;
		moveRunner.action ( "loop" + rolloverDirection ) ;
		yield WaitForSeconds ( 0.3 ) ;
		LoftMovement.acceleration = 0 ;
		LoftMovement.timeModifier = 0.5 ;
		LoftMovement.setNormalSpeed ( ) ;
	}
	
	//Main function. This is used to analyze all the collisions that happen with the plane.
	//It takes into account the part of the plane that is hit and also what hits it.
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		//Name of the object that hit the plane.
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;
		
		//Name of the part of the plane that was hit.
		var planeHitArea:String = CollisionInfo.contacts[0].thisCollider.name ;
		
		//Ignore collisions with own bullets or enemy airplanes, monsters, crate and sentry.
		//This is useful because the collider on those objects is quite big in order to facilitate
		//killing them.
		if ( name.Contains ( "bullet" ) || name.Contains ( "mig" )  || name.Contains ( "MONSTER") 
					|| name.Contains ( "crate" ) || name.Contains ( "sentry" ) )
			return ;

		//Decide what direction we roll over.		
		if ( planeHitArea.Contains ( "right" ) ) 
			rolloverDirection = "right" ;
		else
			if ( planeHitArea.Contains ( "left" ) ) 
				rolloverDirection = "left" ;
	
		//If a collision with a rock happens, drop 5HP and create the particle effect & play sound.
		if ( name.Contains ( "rock") ) 
		{
			createParticleEffect_hitPlane ( CollisionInfo.contacts[0].point ) ;
			AudioSource.PlayClipAtPoint( hitByBulletSound , transform.position );	
			HealthProgressBar.currHealth -= 5 ;
			if ( HealthProgressBar.currHealth <= 0 )
				createParticleEffect_dead ( ) ;
			return ;
		}
		
		//If a collision with a coin happens, add 100 pints of score, deactivate the coin,
		//and also play the coinCollect sound.
		if ( name.Contains ( "Coin" ) )
		{
			ScoreControl.addScore ( 100 ) ;
			CollisionInfo.contacts[0].otherCollider.gameObject.active = false ;
			createParticleEffect_hitCoin ( ) ;
			AudioSource.PlayClipAtPoint( coinCollectSound , transform.position );
			return ;
		}
		
		//If a collision with a health pack happens, add XHP points ( value can be adjusted
		//from the Controller class).
		if ( name.Contains ( "health" ) ) 
		{
			HealthProgressBar.currHealth += Controller.HP_gained_onHealthPack ;
			AudioSource.PlayClipAtPoint( bonusHealthSound , transform.position );			
			return ;
		}
		
		//If a collision with a fuel pack happens, add X fuel ( value can be adjusted
		//from the Controller class).
		if ( name.Contains ( "gas" ) )
		{
			FuelProgressBar.currFuel += Controller.Fuel_gained_onFuelPack ;
			return ;
		}
				
		//If a collision with a plant is on the critical collider of the plane, the 
		//game ends.
		if ( planeHitArea.Contains ( "critical" ) )
		{
			createParticleEffect_dead ( ) ;
			GameOver.Dead ( ) ;
			return ;
		}
		
		//If the collision with the plant is not fatal, play the rollover sound and
		//roll the plane.
		if ( name.Contains ( "Plant")  )
		{
			AudioSource.PlayClipAtPoint( rolloverSound , transform.position );
			rolloverRunnner ( ) ;
			return ;
		}
	}
}