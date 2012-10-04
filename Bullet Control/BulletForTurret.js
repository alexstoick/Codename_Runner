#pragma strict

class BulletForTurret extends MonoBehaviour {

	private var Target:Transform ;
	static private var rocksPool: SpawnPool ;
	static private var rockPrefab:Transform ;
	private var shootPoint:Transform ;
	private var lastTime:double = -10.000 ;
	
	function Start  ( )
	{
		if ( ! Target )
			Target = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager. Pools ["Rocks"] ;
		if ( ! rockPrefab )
			rockPrefab = rocksPool.prefabs[ "rock_for_loft_2" ] ;
		if ( ! shootPoint )
			shootPoint = transform.gameObject.GetComponentsInChildren(Transform)[2] ;
	}

	function Update ( )
	{
		if ( ! transform.gameObject.active )
			return ;
		if ( lastTime + 0.01 < Time.time  )
		{
			spawnBullets ( ) ;
		}
	}	

	function spawnBullets ( )
	{
	
		if ( LoftMovement.isDead )
			return ;
			
	    var hit : RaycastHit;
	    var raycastPosition:Vector3 = Target.position ;

	    if ( Physics.Linecast ( shootPoint.position , raycastPosition , hit ) )
	    {     	
   			if ( hit.transform.name == "Loft" || hit.transform.name.Contains ( "Plant" ) )
   				return ;
	  	}     
	
		var startPos:Vector3 = shootPoint.position ;
		var length = ( raycastPosition - startPos ) ;
		
		var point01:Vector3 = startPos + Vector3 ( Random.Range ( -1 , 1 ) , Random.Range ( -1 , 1 ) , Random.Range ( -1 , 1 ) ) ;
		var point02:Vector3 = raycastPosition ;
		
		//Spawning rock at point01 and then gonna animate it towards point02.
		
		var rock = rocksPool. Spawn ( rockPrefab , point01 , Quaternion ( 0 , 0 , 0 , 0 ) )  ;
		var rockScript : MoveTurretBullet = rock.GetComponent ( MoveTurretBullet ) ;
		
		rockScript.Init ( point02 ) ;
		lastTime = Time.time ;	
		
	}
}