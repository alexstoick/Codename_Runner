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
	static public var bashOn:boolean = false ;
	public var particleEffect:GameObject ;

	var materials:Material[] ;

	function Awake ( )
	{
		if ( ! bigGroup )
			bigGroup = GameObject.Find ( "BigGroup") ; 
		if ( ! runner )
			runner = GameObject.Find ( "Runner") ; 
		if ( ! moveRunner )
			moveRunner = bigGroup.GetComponent ( "MoveRunner" ) ;
		if ( !bulletVector )
			bulletVector = GameObject.Find ( "Bullet Control").GetComponent ( BulletVector ) ;
	}
	
	function Start ( )
	{ 
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Enemies"] ;
		if ( ! cubesPool ) 
			cubesPool = PoolManager.Pools["Cubes"] ;
	}
	
	function clearArrowsAndAmmo ( ) 
	{
		var trs:Transform = GameObject.Find ( "Arrows").transform ; //Ammo Boxes
		var i:int ;
		for ( i = 0 ; i < trs.GetChildCount ( ) ; ) 
		{
			var t:Transform = trs.GetChild ( i ) ;
			t.parent = null ;
			Destroy ( t.gameObject ) ;
		}
		
		trs = GameObject.Find ( "Ammo Boxes" ).transform ; //Ammo Boxes
		
		for ( i = 0 ; i < trs.GetChildCount ( ) ; ) 
		{
			t = trs.GetChild ( i ) ;
			t.parent = null ;
			Destroy ( t.gameObject ) ;
		}
	}
	
	function blinkRunner ( )
	{
		runner.gameObject.renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		runner.gameObject.renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;

		runner.gameObject.renderer.material = materials[0] ;
		yield WaitForSeconds ( 0.5 ) ;
		runner.gameObject.renderer.material = materials[1] ;
		yield WaitForSeconds ( 0.5 ) ;	
			
		moveRunner.movementVariation *= 2 ;
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

		if ( name == "ammoBox" ) 
		{
			bulletVector.initializeBullets ( ) ;
			var ammoBox:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
			var arrowControl:ArrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
			arrowControl.ArrowAndBox ( ammoBox.parent.name ) ;
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
				cubesPool. Despawn ( parent ) ;
			createParticleEffect ( parent.position.z , parent.rotation ) ;
			ScoreControl.addScore ( 400 ) ;
			return ;
		}
		
		if ( CollisionInfo.contacts[0].otherCollider.name == "MONSTER" )
		{
			parent = CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ;
			enemiesPool.Despawn ( parent ) ;
			createParticleEffect ( parent.position.z , parent.rotation ) ;
			moveRunner.movementVariation /= 2 ;
			blinkRunner ( ) ; //takes 2 seconds
			return ;
		}


		
		ScoreControl.addScore ( -400 ) ;
		runner.gameObject.renderer.material = materials[0] ;
		moveRunner.movementVariation = 0 ;
		
		yield WaitForSeconds ( 2 ) ;

		moveRunner.movementVariation = 0.2 ;

		runner.gameObject.renderer.material = materials[1] ;
		
	}
}