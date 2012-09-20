#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;

	static private var enemiesPool: SpawnPool ;
	static private var boxPool: SpawnPool ;
	static private var bonusesPool: SpawnPool ;
	
	static public var bashOn:boolean = false ;
	static private var pushBackDirection:String ;
	
	public var particleEffect:GameObject ;
	static private var runner:GameObject ;

	static private var powerUp:PowerUp ;

	var materials:Material[] ;

	function Awake ( )
	{

		if ( ! runner )
			runner = GameObject.Find ( "Runner") ;
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
		if ( ! powerUp )
			powerUp = GameObject.Find ( "Power Up Control").GetComponent ( PowerUp ) ;
	}
	
	function Start ( )
	{ 

		if ( ! bonusesPool )
			bonusesPool = PoolManager.Pools["Bonuses"] ;
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Monsters"] ;
		if ( ! boxPool ) 
			boxPool = PoolManager.Pools["Boxes"] ;

	}
	
	function blinkRunner ( )
	{
		LoftMovement.setLowSpeed ( ) ;
		LoftMovement.timeModifier = 1000 ;
		
		for ( var i = 0 ; i < 20 ; ++ i )
		{
			//should blink.
			yield WaitForSeconds ( 0.1 ) ;
		}
		
		HealthProgressBar.currHealth -= 30 ;
		LoftMovement.timeModifier = 0.8 ;
		LoftMovement.setNormalSpeed ( ) ;
	}
	
	function createParticleEffect ( position:Vector3 , rotation:Quaternion )
	{
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}
	
	function pushRunnerBack ( )
	{
	
		var oppositeDirection:String;
	
		LoftMovement.setNegativeSpeed ( ) ;
		HealthProgressBar.currHealth -= 30 ;	
		if ( pushBackDirection == "left" ) 
			oppositeDirection = "right" ;
		else
			oppositeDirection = "left" ;
		
	
		moveRunner.action ( oppositeDirection ) ;
		moveRunner.action ( oppositeDirection ) ;
		moveRunner.action ( oppositeDirection ) ;
		moveRunner.action ( oppositeDirection ) ;
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
		
		Debug.Log ( planeHitArea + "		" + Time.time ) ;
		
		if ( planeHitArea.Contains ( "right" ) ) 
			pushBackDirection = "right" ;
		else
			if ( planeHitArea.Contains ( "left" ) ) 
				pushBackDirection = "left" ;
		

		if ( name.Contains ( "rock") ) 
			return ;		

		if ( name == "ammoBox" ) 
		{
			Debug.LogWarning ( "coliziune cu ammo box" ) ;
			SwipeDetection2.continuousFire = true ;
			
			FireCountdown.startEvent() ;
			
			bonusesPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ) ; 
			return ;
		}
		
		if ( bashOn && ( name == "crate" || name == "MONSTER" ) ) 
		{
			var parent:Transform = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			if ( name == "MONSTER" )
				enemiesPool.Despawn ( parent.parent ) ;
			else
			{
				boxPool. Despawn ( parent ) ;
				powerUp.Spawn ( parent.GetChild(0) ) ;
			}
			createParticleEffect ( parent.parent.position , parent.rotation ) ;
			ScoreControl.addScore ( 400 ) ;
			return ;
		}
		
		if ( name.Contains ( "health" ) ) 
		{
			HealthProgressBar.currHealth = 100 ;
			return ;
		}
				
		if ( planeHitArea.Contains ( "critical" ) )
		{
			GameOver.Dead ( ) ;
			return ;
		}

		if ( name == "MONSTER" )
		{
			parent = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			enemiesPool.Despawn ( parent.parent ) ;
			createParticleEffect ( parent.parent.position , parent.rotation ) ;
			ScoreControl.addScore ( -400 ) ;
			blinkRunner ( ) ;
			return ;
		}
		
		//coliziune cu copac -- viitoare frunza
		if ( name.Contains ( "Plant") )
		{
			pushRunnerBack ( );
		}
		else
		{
			ScoreControl.addScore ( -400 ) ;
			blinkRunner () ;
		}
	}
}