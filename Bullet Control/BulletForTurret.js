#pragma strict

class BulletForTurret extends MonoBehaviour {

	static private var Target:Transform ;
	static private var rocksPool: SpawnPool ;
	static private var rockPrefab:Transform ;
	private var ownRotation:double ;
	private var lastTime:double = -10.000 ;
	
	function Start  ( )
	{
		if ( ! Target )
			Target = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
	}

	function Update ( )
	{
		if ( ! transform.gameObject.active )
			return ;
		if ( lastTime + 0.05 < Time.time  )
			spawnBullets ( ) ;
	}	
	
	function setRotation ( val )
	{
		ownRotation = val ;
	}

	function spawnBullets ( )
	{
	
		//Target.parent.parent == big group - rotatia
		//trebuie sa aflu rotatia turetei
	
		if ( LoftMovement.isDead )
			return ;
			
	    var hit : RaycastHit;
	    var raycastPosition:Vector3 = Target.position ;
	    
		var planeRotation:double = Target.parent.parent.localRotation.eulerAngles.z ;
    	var lowRot:double = planeRotation - 120.5 ;
		var highRot:double = planeRotation + 120.5 ;
		
		planeRotation = ownRotation ; //checking if ownRotation is between the boundries

		var found:boolean = false ;

		if ( highRot > 360 )
		{
			if ( lowRot <= planeRotation )
				found = true ;
			if ( planeRotation <= highRot - 360 )
				found = true ;
		}
		if ( lowRot < 0 )
		{
			if ( lowRot + 360 <= planeRotation )
				found = true ;
			if ( planeRotation <= highRot )
				found = true ;
		}
		
		if ( lowRot <= planeRotation && planeRotation <= highRot )
		{
			found = true ;
		}

		if ( ! found )
			return ;

	    if ( Physics.Linecast ( transform.position , raycastPosition , hit ) )
	    {     	
   			if ( hit.transform.name == "Loft" || hit.transform.name.Contains ( "Plant" ) )
   				return ;
	  	}     
	
		var startPos:Vector3 = transform.position ;
		var length = ( raycastPosition - startPos ) ;
		
		var point01:Vector3 = startPos ;
		var point02:Vector3 = Target.position ;
		
		//Spawning rock at point01 and then gonna animate it towards point02.
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( Target.position ) ;
		lastTime = Time.time ;	
		
	}
}