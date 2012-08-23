#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;

	static private var enemiesPool: SpawnPool ;
	static private var boxPool: SpawnPool ;
	static private var bonusesPool: SpawnPool ;
	
	static public var bashOn:boolean = false ;
	
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
		LoftMovement.acceleration = 0.0000 ;
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		LoftMovement.setLowSpeed ( ) ;
		renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;

		renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;	
		LoftMovement.setNormalSpeed ( ) ;

	}
	
	function createParticleEffect ( position:Vector3 , rotation:Quaternion )
	{
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;

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
		
		if ( name.Contains ( "health" ) )
		{
			Debug.LogWarning ( "coliziune cu health pack" ) ;
			bonusesPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform ) ; 
			
			HealthBar.percentage = -25 ;
			HealthBar.UpdateHealthBar ( ) ;

			return ;
		}
		
		if ( bashOn )
			Debug.Log ( name) ;
		if ( bashOn && ( name == "crate" || name == "MONSTER" ) ) 
		{
			var parent:Transform = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			if ( name == "MONSTER" )
				enemiesPool.Despawn ( parent.parent ) ;
			else
			{
				boxPool. Despawn ( parent.parent ) ;
				powerUp.Spawn ( parent.GetChild(0) ) ;
			}
			createParticleEffect ( parent.parent.position , parent.rotation ) ;
			ScoreControl.addScore ( 400 ) ;
			return ;
		}
		
		if ( CollisionInfo.contacts[0].otherCollider.name == "MONSTER" )
		{
			parent = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			enemiesPool.Despawn ( parent.parent ) ;
			createParticleEffect ( parent.parent.position , parent.rotation ) ;
		}
		
		if ( HealthBar.percentage < 75 )
		{
			ScoreControl.addScore ( -400 ) ;
			HealthBar.UpdateHealthBar ( );
			blinkRunner ( ) ;
		}
		else
		{
			HealthBar.UpdateHealthBar ( ) ;
			GameOver.Dead ( );
		}
	}
}