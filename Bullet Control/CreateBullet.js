#pragma strict

class CreateBullet extends MonoBehaviour {

	var laserType:GameObject ;
	var particleEffect: GameObject ;
	static private var parent:Transform ;
	static private var number:int = 0 ;
	static private var bigGroup:Transform ;
	static private var bulletVector:BulletVector ;
	static private var rocksPool:SpawnPool ;
	static private var rockPrefab:Transform ;
	
	function Start ( )
	{
		if ( !bigGroup )
			bigGroup = GameObject.Find ( "BigGroup").transform;	
		if ( !parent )
			parent = GameObject.Find ( "Runner" ).transform ;
		if ( !bulletVector )
			bulletVector = GameObject.Find ( "Bullet Control").GetComponent ( BulletVector ) ;
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs["rock_refferencePoint"] ;
	}
	
	function createParticleEffect ( zPos:double , rotation:Quaternion )
	{
		var position:Vector3 = Vector3 ( 3.64 , -0.98 , zPos ) ;
		
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}

	
	function InstantiateBullet ( pozitieZ:int , rotation_for_bullet:Quaternion )
	{
		rocksPool.Spawn ( rockPrefab , Vector3 ( 3.76 , -0.98 , pozitieZ + 1 ) , rotation_for_bullet ) ;
	}
	
	
	function InstantiateBullet ( positionZ:int , rotation_for_bullet:Quaternion , extraParam:boolean) //OLD
	{
		
		if ( ! bulletVector.availableBullet() )
			return ;
		
	    var hit : RaycastHit;
	    var xModifier:double;
	    
	    var rotatieZ:int = bigGroup.rotation.eulerAngles.z ;
	    
	    if (Physics.Raycast ( parent.position , parent.TransformDirection ( -Vector3.up ), hit,  30	 ) )
	    {
//	    	Debug.Log ( "COLIZIUNE" + hit.transform.name ) ; 
	    	var lovit:Transform = hit.transform ;
	    	//Debug.LogWarning ( lovit.gameObject.renderer.material.name ) ;
	    	if ( lovit.name != "Tree" )
	    	{
	    		if ( lovit.name == "MONSTER" )
	    		{
	    			PoolManager.Pools["Enemies"].Despawn ( lovit.parent ) ;
	    			createParticleEffect ( lovit.gameObject.transform.position.z , lovit.gameObject.transform.rotation ) ;
	    			ScoreControl.addScore ( 300 ) ;
	    		}
	    		else
			    	if ( lovit.gameObject.renderer.material.name == "crate_tex3 (Instance)" ) //destroyable crate
			    	{
			    		lovit.gameObject.active = false ;
			    		
			    		createParticleEffect ( lovit.gameObject.transform.position.z , lovit.gameObject.transform.rotation ) ;	

					    ScoreControl.addScore ( 150 ) ;
			    	}
			    	else
				    	if ( lovit.gameObject.renderer.material.name == "triggerBox (Instance)" )
				    	{
				    		//lovit.parent.parent.rotation.eulerAngles.z = 15 ;
				    		var smoothMove:SmoothMove = lovit.parent.GetComponent ( SmoothMove ) ;
				    		smoothMove.goActive ( ) ;
				    	}
	    	}
	    	
	    }
	    var newLaser:GameObject ;
	    newLaser = Instantiate ( laserType , parent.position - Vector3 ( 0 , 0 , 0 - 10 )  , parent.rotation ) ;
	    Destroy ( newLaser , 0.2 ) ;
	    Debug.DrawRay (parent.position , parent.TransformDirection ( -Vector3.up )*10, Color.green , 0.2 );
	    bulletVector.deactivateBullet () ;
	}
	
}
