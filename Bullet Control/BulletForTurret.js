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
		if ( lastTime + 5 < Time.time  )
		{
			spawnBullets ( ) ;
			
		}
	}	
	function spawnBullets ( )
	{
	
	    var hit : RaycastHit;
	    var startPosition:Vector3 = Target.position ;
	    if ( Physics.Linecast (transform.position, Target.position, hit) )
		    if ( hit.transform.name != "plane" )
		    {
		    	line.renderer.enabled = false ;
		    	return ;
		    }
	    //Debug.DrawRay ( transform.position , (Target.position-transform.position ), Color.green , 0.5) ;
	    
		var startWidth = 0.03;
		var endWidth = 0.03;
	
		var startPos:Vector3 = transform.position ;
		var length = ( Target.position-transform.position ) ;	

//		Debug.Log ( "shot a bullet from "+ transform.name ) ;
//		Debug.Log ( startPos + "		" + length ) ;
		var point01:Vector3 = startPos + length * Random.Range ( 0.6 , 0.8 ) ;
		var point02:Vector3 = startPos + length ;	
	
		line.SetWidth(startWidth, endWidth);
		line.SetVertexCount(2);
		line.material = aMaterial;
		
		line.renderer.enabled = true;
		line.SetPosition(0, point01);
		line.SetPosition(1, point02);

		lastTime = Time.time ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = false ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = true ;
		yield WaitForSeconds ( 0.2) ;
		line.renderer.enabled = false ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = true ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = false ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = true ;
		yield WaitForSeconds ( 0.2 ) ;
		line.renderer.enabled = false ;

		if ( Physics.Linecast ( transform.position , Target.position , hit ) )
			if ( hit.transform.name == "plane" ) 
			{
				HealthProgressBar.currHealth -= 5 ;
				Debug.Log ( HealthProgressBar.currHealth ) ;
			}


	}

}