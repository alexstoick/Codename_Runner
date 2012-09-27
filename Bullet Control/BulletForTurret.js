#pragma strict

class BulletForTurret extends MonoBehaviour {

	private var Target:Transform ;
	private var rocksPool: SpawnPool ;
	private var rockPrefab:Transform ;
	private var lastTime:double = -10.000 ;
	private var line:LineRenderer ;
	private var muzzleFlash:Transform ;
	var aMaterial : Material;
	
	function Start  ( )
	{
		if ( ! Target )
			Target = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
		if ( ! muzzleFlash )
			muzzleFlash = transform.gameObject.GetComponentsInChildren(Transform)[4] ;
			
		line = this.GetComponent(LineRenderer);
	}

	function Update ( )
	{
		if ( ! transform.gameObject.active )
			return ;
		if ( lastTime + 0.5 < Time.time  )
		{
			spawnBullets ( ) ;
			
		}
	}	
	
	function setRendererFalse ( )
	{
		yield WaitForSeconds ( 0.1) ;
		line.renderer.enabled = false ;
		muzzleFlash.renderer.enabled = false ;
	}
	function spawnBullets ( )
	{
	
	    var hit : RaycastHit;
	    var raycastPosition:Vector3 = Target.position ;//+ Vector3 ( Random.Range ( 3 , 8 ) , Random.Range ( 0  , 3 ) , Random.Range ( 0 , 3 ) );
	    
/*   		if ( Physics.Linecast ( transform.position , raycastPosition , hit ) )
	    {     	
	    	Debug.Log ( hit.transform.name ) ;
   			if ( hit.transform.name == "Loft" || hit.transform.name.Contains ( "Plant" ) )
   				return ;
			if ( hit.transform.name.Contains ( "plane" ) )
    		{
				HealthProgressBar.currHealth -= 1 ;
				Debug.Log ( "hit by turret:" + HealthProgressBar.currHealth ) ;
				//ring of smoke + sunet
				return ;
			}
	  	}*/

	
		var startPos:Vector3 = transform.position ;
		var length = ( raycastPosition - startPos ) ;	

		var point01:Vector3 = startPos + Vector3 ( Random.Range ( 0 , 3 ) , Random.Range ( 0 , 3 ) , Random.Range ( 0 , 3 ) ) ;
		var point02:Vector3 = raycastPosition ;
		
		//Spawning rock at point01 and then gonna animate it towards point02.
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( point02 ) ;
		lastTime = Time.time ;	

/*		line.SetWidth( 0.03 , 0.03 );
		line.SetVertexCount(2);
		line.material = aMaterial;
		muzzleFlash.renderer.enabled = true ;
		
		line.renderer.enabled = true;
		line.SetPosition(0, point01);
		line.SetPosition(1, point02);

				
	   	setRendererFalse ( );
*/	  
	}
}