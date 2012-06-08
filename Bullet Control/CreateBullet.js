#pragma strict

class CreateBullet extends MonoBehaviour {

	var laserType:GameObject ;
	var particleEffect: GameObject ;
	static private var parent:Transform ;
	static private var number:int = 0 ;
	static private var bigGroup:Transform ;
	static private var bulletVector:BulletVector ;
	function Start ( )
	{
		if ( !bigGroup )
			bigGroup = GameObject.Find ( "BigGroup").transform;	
		if ( !parent )
			parent = GameObject.Find ( "Runner" ).transform ;
		if ( !bulletVector )
			bulletVector = GameObject.Find ( "Bullet Control").GetComponent ( BulletVector ) ;
	
	}
	
	function InstantiateBullet ( positionZ:int , rotation_for_bullet:Quaternion )
	{
		
		if ( ! bulletVector.availableBullet() )
			return ;
		
	    var hit : RaycastHit;
	    var xModifier:double;
	    
	    var rotatieZ:int = bigGroup.rotation.eulerAngles.z ;
	    
	    if (Physics.Raycast ( parent.position , parent.TransformDirection ( -Vector3.up ), hit, 15	 ) )
	    {
	    
	    
	    	Debug.Log ( "COLIZIUNE" + hit.transform.name ) ; 
	    	var lovit:Transform = hit.transform ;
	    	//Debug.LogWarning ( lovit.gameObject.renderer.material.name ) ;
	    	if ( lovit.gameObject.renderer.material.name == "destroyableBox (Instance)" )
	    	{
	    		Destroy ( lovit.gameObject ) ;
	    		lovit.parent = null ;
	    		
	    		var instance = Instantiate( particleEffect , lovit.gameObject.transform.position , lovit.gameObject.transform.rotation);
			    Destroy(instance.gameObject, 1 );
			    Destroy(lovit.gameObject , 1 );
	    	}
	    	
	    	if ( lovit.gameObject.renderer.material.name == "triggerBox (Instance)" )
	    	{
	    		//lovit.parent.parent.rotation.eulerAngles.z = 15 ;
	    		var smoothMove:SmoothMove = lovit.parent.parent.GetComponent ( SmoothMove ) ;
	    		smoothMove.goActive ( ) ;
	    	}
	    	
	    }
	    var newLaser:GameObject ;
	    newLaser = Instantiate ( laserType , parent.position - Vector3 ( 0 , 0 , -8 )  , parent.rotation ) ;
	    Destroy ( newLaser , 0.2 ) ;
	    Debug.DrawRay (parent.position , parent.TransformDirection ( -Vector3.up )*10, Color.green , 0.2 );
	    bulletVector.deactivateBullet () ;
	}
	
}


	
	/*	var newBullet:GameObject ;
		var parentPosition = parent.position ;
		var newPosition = Vector3 ( parentPosition.x + 0.30 , parentPosition.y + 0.00 , parentPosition.z + 0.30) ;
		
		newBullet =  Instantiate ( bulletType , newPosition , rotation_for_bullet ) ;
		newBullet.transform.parent = parent ;
		++number ;
		newBullet.name = "bulletABC" + number  ;
		
		Debug.Log ( "newPosition: " + newPosition ) ;
		Debug.Log ( newBullet.transform.position ) ;
		Debug.Log ( "parent: " + parentPosition ) ;
		
		Debug.Log ( "trying: " + GameObject.Find ( "bulletABC" + number ).transform.position ) ;
		
		//newBullet.transform.position.x = .30 ;
		//newBullet.transform.position.y = 8.06 ;
		//newBullet.transform.position.z = 0 ;
		
		newBullet.AddComponent ( MoveBullet ) ;
		var moveBullet:MoveBullet = newBullet.GetComponent ( MoveBullet ) ;
		
		moveBullet.SendGameObject ( newBullet )	;
		moveBullet.movementVariation = 0.0 ;*/