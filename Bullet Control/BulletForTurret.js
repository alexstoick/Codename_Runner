#pragma strict

class BulletForTurret extends MonoBehaviour {

	private var Target:Transform ;
	private var rocksPool: SpawnPool ;
	private var rockPrefab:Transform ;
	private var lastTime:double = -10.000 ;
	private var line:LineRenderer ;
	var aMaterial : Material;
	
	function Start  ( )
	{
		if ( ! Target )
			Target = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
			
		line = this.GetComponent(LineRenderer);

	}

	function Update ( )
	{
		if ( ! transform.gameObject.active )
			return ;
		if ( lastTime + 0.2 < Time.time  )
		{
			spawnBullets ( ) ;
			
		}
	}	
	function spawnBullets ( )
	{
	
		Debug.Log ( "shot a bullet from "+ transform.name ) ;
	    var hit : RaycastHit;
	    Physics.Linecast (transform.position, Target.position, hit) ;
	    
	    if ( hit.transform.name != "plane" )
	    {
	    	line.renderer.enabled = false ;
	    	return ;
	    }
	    //Debug.DrawRay ( transform.position , (Target.position-transform.position ), Color.green , 0.5) ;
	    
		var startWidth = 1;
		var endWidth = 1;
	
		var startPos = transform.position ;
		var length = ( Target.position-transform.position ) ;	

		
		var point01:Vector3 = startPos ; //+ length * Random.Range ( 0.6 , 0.8 ) ;
		var point02:Vector3 = startPos + length ;	
	
		line.SetWidth(startWidth, endWidth);
		line.SetVertexCount(2);
		line.material = aMaterial;
		
		line.renderer.enabled = true;
		line.SetPosition(0, point01);
		line.SetPosition(1, point02);

		lastTime = Time.time ;
		yield WaitForSeconds ( 0.05 ) ;
		line.renderer.enabled = false ;

/*		Debug.Log ( "can see the plane" ) ;
		
		var newRock:Transform;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		var v3RayDirection:Vector3 = Target.position-transform.position;
		newRock.rigidbody.AddForce(v3RayDirection * 100000 );

/*		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;
		
		yield WaitForSeconds (0.3) ;
		
		newRock = rocksPool.Spawn ( rockPrefab ) ;
		newRock.position = transform.position ;
		newRock.GetComponent ( MoveTurretBullet ).Init() ;*/
	}

}