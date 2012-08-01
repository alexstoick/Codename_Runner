#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var cylinderVector: Array ;
	static private var moveRunner:MoveRunner ;
	static private var bigGroup:GameObject ;
	static private var runner:GameObject ;
	static private var bulletVector:BulletVector ;
	static private var spawnCylinder:SpawnCylinder ;
	static private var enemiesPool: SpawnPool ;

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
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		if ( CollisionInfo.contacts[0].otherCollider.name == "ammoBox" ) 
		{
			bulletVector.initializeBullets ( ) ;
			var ammoBox:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
			var arrowControl:ArrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
			arrowControl.ArrowAndBox ( ammoBox.parent.name ) ;
			return ;
		}

		ScoreControl.addScore ( -400 ) ;
		
		if ( CollisionInfo.contacts[0].otherCollider.name == "MONSTER" )
		{
			enemiesPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.transform ) ;			
			moveRunner.movementVariation /= 2 ;
			blinkRunner ( ) ; //takes 2 seconds
			return ;
		}
		runner.gameObject.renderer.material = materials[0] ;
		moveRunner.movementVariation = 0 ;
		
		yield WaitForSeconds ( 2 ) ;

		moveRunner.movementVariation = 0.2 ;

		runner.gameObject.renderer.material = materials[1] ;
		
	}
}