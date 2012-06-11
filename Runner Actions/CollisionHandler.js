#pragma strict

class CollisionHandler extends MonoBehaviour {

	static private var cylinderVector: Array ;
	static private var moveRunner:MoveRunner ;
	static private var bigGroup:GameObject ;
	static private var runner:GameObject ;
	static private var bulletVector:BulletVector ;
	var materials:Material[] ;

	function Start ( )
	{
		if ( ! cylinderVector ) 
			cylinderVector = GameObject.Find ( "Cylinder Control").GetComponent ( CylinderVector ).Cylinder ;
		if ( ! bigGroup )
			bigGroup = GameObject.Find ( "BigGroup") ; 
		if ( ! runner )
			runner = GameObject.Find ( "Runner") ; 
		if ( ! moveRunner )
			moveRunner = bigGroup.GetComponent ( "MoveRunner" ) ;
		if ( !bulletVector )
			bulletVector = GameObject.Find ( "Bullet Control").GetComponent ( BulletVector ) ;
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
//		Debug.Log(CollisionInfo.contacts[0].thisCollider.name+" hit "+CollisionInfo.contacts[0].otherCollider.name); 
		
		if ( CollisionInfo.contacts[0].otherCollider.name == "ammoBox") 
		{
//			Debug.LogWarning ( "AMMO BOX TOUCHED" ) ;
			bulletVector.initializeBullets ( ) ;
			var ammoBox:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
//			Debug.LogWarning ( ammoBox.parent.name + " " + ammoBox.parent.parent.name ) ;
			var arrowControl:ArrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
			arrowControl.ArrowAndBox ( ammoBox.parent.name ) ;
			return ;
		}
		
		if ( CollisionInfo.contacts[0].otherCollider.transform.gameObject.renderer.material.name == "triggerBox" )
		{
			//trebuie miscat
			Debug.LogError ( "TOUCHED TRIGGER BOX" ) ;
			var trigger:Transform = CollisionInfo.contacts[0].otherCollider.transform ;
			trigger.parent.parent.rotation.eulerAngles.z = 15 ;
			
		}
		

		//CylinderVector.Cylinder.Shift( );
		
		runner.gameObject.renderer.material = materials[0] ;
		yield WaitForSeconds ( 1.5 ) ;
		runner.gameObject.renderer.material = materials[1] ;
		
		//Debug.Log ( cylinderVector.length ) ;
		/* RESPAWN
		var firstCylinder:Transform = cylinderVector[0] as Transform ;
		bigGroup.transform.position.z = firstCylinder.position.z ;
		runner.transform.position.z = firstCylinder.position.z ;*/
		
	}
}