#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;

	//Refferences to the spawnPools
	static private var enemiesPool: SpawnPool ;
	static private var boxPool: SpawnPool ;
	
	static private var pushBackDirection:String ;
	
	public var particleEffect_hitPlane:GameObject;
	public var particleEffect:GameObject ;
	public var particleEffect_hitCoin:GameObject ;
	
	
	static private var plane:Transform ;
	static private var bobbingEndTime:double = 0.0 ;
	
	static private var cameraTransform:Transform ;
	
	public var coinCollectSound: AudioClip ;
	public var rolloverSound: AudioClip ;
	public var bonusHealthSound: AudioClip ;
	public var hitByBulletSound:AudioClip ;

	var materials:Material[] ;

	function Awake ( )
	{
		if ( ! cameraTransform )
			cameraTransform  = GameObject.Find ( "Main Camera" ).transform ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
	}
	
	function Start ( )
	{ 
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Monsters"] ;
		if ( ! boxPool ) 
			boxPool = PoolManager.Pools["Boxes"] ;

	}

	function Update ( )
	{
		
		if ( bobbingEndTime > Time.time )
		{
			cameraTransform.localRotation = Quaternion.Euler( 335 + Mathf.PingPong(Time.time * 30.0, 1.5), 0.0 , 180.0 );
		}
	}
	
	function createParticleEffect_hitCoin ( position:Vector3 )
	{
		var instance = Instantiate( particleEffect_hitCoin , position, Quaternion ( 0 , 0 , 0 , 0 ) ) ;
		instance.transform.parent = plane ;
		instance.transform.localPosition = Vector3 ( 1 , 0 , 0 ) ;
		instance.transform.localRotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		Destroy(instance.gameObject, 1 );
	}
	
	function createParticleEffect ( position:Vector3 , rotation:Quaternion )
	{
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}

	function createParticleEffect_hitPlane ( position:Vector3 )
	{
		var instance = Instantiate ( particleEffect_hitPlane , position , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
		instance.transform.parent = plane ;
		AudioSource.PlayClipAtPoint( hitByBulletSound , transform.position );		
		bobbingEndTime = Time.time + 0.2 ;
	}
	
	function rolloverRunnner ( )
	{
	
		var oppositeDirection:String;
	
		HealthProgressBar.currHealth -= 30 ;	
		if ( pushBackDirection == "left" ) 
			oppositeDirection = "right" ;
		else
			oppositeDirection = "left" ;
		
		yield WaitForSeconds ( 0.1 ) ;
		moveRunner.action ( "loop" + pushBackDirection ) ;
		
		yield WaitForSeconds ( 0.3 ) ;
		LoftMovement.acceleration = 0 ;
		LoftMovement.timeModifier = 0.5 ;
		LoftMovement.setNormalSpeed ( ) ;
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;
		var planeHitArea:String = CollisionInfo.contacts[0].thisCollider.name ;
		
		if ( name.Contains ( "bullet" ) || name.Contains ( "mig" ) )
			return ;
		
		if ( planeHitArea.Contains ( "right" ) ) 
			pushBackDirection = "right" ;
		else
			if ( planeHitArea.Contains ( "left" ) ) 
				pushBackDirection = "left" ;
				
		if ( name.Contains ( "MONSTER") || name.Contains ( "crate" ) )
			return ;
		
		if ( name.Contains ( "sentry" ) )
			return ;

		if ( name.Contains ( "rock") ) 
		{
			createParticleEffect_hitPlane ( CollisionInfo.contacts[0].point ) ;
			HealthProgressBar.currHealth -= 5 ;
			return ;
		}
		
		if ( name.Contains ( "Coin" ) )
		{
			ScoreControl.addScore ( 100 ) ;
			CollisionInfo.contacts[0].otherCollider.gameObject.active = false ;
			createParticleEffect_hitCoin ( CollisionInfo.contacts[0].point ) ;
			AudioSource.PlayClipAtPoint( coinCollectSound , transform.position );
			return ;
		}
		
		if ( name.Contains ( "health" ) ) 
		{
			HealthProgressBar.currHealth += 25 ;
			AudioSource.PlayClipAtPoint( bonusHealthSound , transform.position );			
			return ;
		}
		
		if ( name.Contains ( "gas" ) )
		{
			FuelProgressBar.currFuel += 40 ;
			return ;
		}
				
		if ( planeHitArea.Contains ( "critical" ) )
		{
			GameOver.Dead ( ) ;
			return ;
		}
		
		//coliziune cu copac -- viitoare frunza
		if ( name.Contains ( "Plant") || name.Contains ( "mig" ) )
		{
			AudioSource.PlayClipAtPoint( rolloverSound , transform.position );
			rolloverRunnner ( ) ;
			return ;
		}
	}
}