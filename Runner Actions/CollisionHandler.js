#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var cylinderVector: Array ;
	static private var moveRunner:MoveRunner ;
	static private var bigGroup:GameObject ;
	static private var runner:GameObject ;
	static private var bulletVector:BulletVector ;
	static private var spawnCylinder:SpawnCylinder ;
	static private var enemiesPool: SpawnPool ;
	static private var cubesPool: SpawnPool ;
	static private var bonusesPool: SpawnPool ;
	static public var bashOn:boolean = false ;
	public var particleEffect:GameObject ;
	static private var powerUp:PowerUp ;

	var materials:Material[] ;

	function Awake ( )
	{
		if ( ! bigGroup )
			bigGroup = GameObject.Find ( "BigGroup") ; 
		if ( ! runner )
			runner = GameObject.Find ( "Runner") ; 
		if ( ! moveRunner )
			moveRunner = bigGroup.GetComponent ( "MoveRunner" ) ;
		if ( ! powerUp )
			powerUp = GameObject.Find ( "Power Up Control").GetComponent ( PowerUp ) ;
	}
	
	function Start ( )
	{ 
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Enemies"] ;
		if ( ! cubesPool ) 
			cubesPool = PoolManager.Pools["Cubes"] ;
		if ( ! bonusesPool )
			bonusesPool = PoolManager.Pools["Bonuses"] ;
	}
	
	function blinkRunner ( )
	{
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		MoveRunner.setLowSpeed ( ) ;
		renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;

		renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;	
		MoveRunner.setNormalSpeed ( ) ;

	}
	
	function createParticleEffect ( zPos:double , rotation:Quaternion )
	{
		var position:Vector3 = Vector3 ( 3.64 , -0.98 , zPos ) ;
		
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
			HealthBar.percentage = -25 ;
			HealthBar.UpdateHealthBar ( ) ;
			bonusesPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ) ; 
			return ;
		}
		
		if ( bashOn )
			Debug.Log ( name) ;
		if ( bashOn && ( name == "crate" || name == "MONSTER" ) ) 
		{
			var parent:Transform = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			if ( name == "MONSTER" )
				enemiesPool.Despawn ( parent ) ;
			else
			{
				cubesPool. Despawn ( parent ) ;
				powerUp.Spawn ( parent ) ;
			}
			createParticleEffect ( parent.position.z , parent.rotation ) ;
			ScoreControl.addScore ( 400 ) ;
			return ;
		}
		
		if ( CollisionInfo.contacts[0].otherCollider.name == "MONSTER" )
		{
			parent = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			enemiesPool.Despawn ( parent ) ;
			createParticleEffect ( parent.position.z , parent.rotation ) ;
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