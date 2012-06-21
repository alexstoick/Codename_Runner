#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var cylinderVector: Array ;
	static private var moveRunner:MoveRunner ;
	static private var bigGroup:GameObject ;
	static private var runner:GameObject ;
	static private var bulletVector:BulletVector ;
	static private var spawnCylinder:SpawnCylinder ;
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
	
	function clearPools ( )
	{
		var i : int ;
		var cylinderPool:SpawnPool = PoolManager.Pools["Cylinder"] ;
		var cubesPool:SpawnPool = PoolManager.Pools["Cubes"] ;

		SpawnCylinder.doSpawn = false ;

		for ( i = 0 ; i < cubesPool.Count ; )
			cubesPool.Despawn ( cubesPool[i] ) ;

		for ( i = 0 ; i < cylinderPool.Count ;  )
		{
			cylinderPool.Despawn ( cylinderPool[i] ) ;
			yield WaitForSeconds (0.005) ;
		}
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
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		if ( CollisionInfo.contacts[0].otherCollider.name == "ammoBox") 
		{
			bulletVector.initializeBullets ( ) ;
			var ammoBox:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
			var arrowControl:ArrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
			arrowControl.ArrowAndBox ( ammoBox.parent.name ) ;
			return ;
		}
		
		if (  CollisionInfo.contacts[0].otherCollider.name != "Brad" )
			if ( CollisionInfo.contacts[0].otherCollider.transform.gameObject.renderer.material.name == "triggerBox" )
			{
				//trebuie miscat
				Debug.LogError ( "TOUCHED TRIGGER BOX" ) ;
				var trigger:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
				trigger.parent.parent.rotation.eulerAngles.z = 15 ;
				return ;
			}
		

		runner.gameObject.renderer.material = materials[0] ;
		moveRunner.movementVariation = 0 ;
		clearPools ( ) ;
		clearArrowsAndAmmo ( ) ;
		
		yield WaitForSeconds ( 1 ) ;
		bigGroup.transform.position.z = 0 ;
		SpawnCylinder.numberOfCylinders = 0 ;
		LevelGeneration._Line = 1 ;
		SpawnCylinder.doSpawn = true ;
		moveRunner.movementVariation = 0.2 ;

		runner.gameObject.renderer.material = materials[1] ;
		
	}
}