#pragma strict

class MovePlaneBullet extends MonoBehaviour {

	var particleEffect: GameObject ;
	static private var rocksPool: SpawnPool ;
	static private var enemiesPool: SpawnPool ;
	static private var sentryPool: SpawnPool ;
	static private var migPool: SpawnPool ;
	static private var powerUpControl:PowerUpControl;

	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	private var tParam:double = 0.0 ;

	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Monsters"] ;
		if ( ! sentryPool )
			sentryPool = PoolManager.Pools [ "Sentry" ] ;
		if ( ! migPool ) 
			migPool = PoolManager.Pools [ "Enemy Airplane" ] ;
		if ( ! powerUpControl )
			powerUpControl = GameObject.Find ( "PowerUp").GetComponent ( PowerUpControl ) ;
	}
	
	function Init ( target:Vector3 )
	{
		targetLocation = target ;
		despawnTime = Time.time + 1 ;
		tParam = 0 ;
	}
	
	function Update ()
	{
		if ( Time.time > despawnTime )
		{
			rocksPool. Despawn ( transform ) ;
			despawnTime = 0.0 ;
			return ;
		}
	
		if ( despawnTime )
		{
			tParam +=  Time.deltaTime * 0.5 ;
			if ( Controller.bossIsSpawned && BossCrosshair.crosshair.active )
			{
				transform.position = Vector3.Lerp ( transform.position , BossCrosshair.crosshair.position , tParam ) ;
			}
			else
				transform.position = Vector3.Lerp ( transform.position , targetLocation , tParam ) ;
			transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		}
	}
	
	function createParticleEffect ( position:Vector3 , rotation:Quaternion )
	{
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 2 );
	}

	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var child:Transform = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;
		var cname:String = collider.name ;

		if ( cname.Contains ( "Plant" ) || name == "Loft" )
		{
			rocksPool. Despawn ( transform ) ;
			return ;
		}
		
		if ( ! child.gameObject.active )
			return ;
			
		if ( cname.Contains ( "sentry" ) )
		{
			powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;		
			createParticleEffect ( child.position , child.rotation ) ;
			sentryPool.Despawn ( child.parent.parent ) ;
			rocksPool. Despawn ( transform ) ;
			MonsterVector.removeFromArray (child.parent.parent.name , "collision with plane bullet (turret)");
			return ;
		}	
		
		if ( cname.Contains ( "mig" ) )
		{
			powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;
			createParticleEffect ( child.position, child.rotation ) ;
			migPool.Despawn ( child.parent.parent ) ;
			ScoreControl.addScore ( 500 ) ;
			rocksPool. Despawn ( transform ) ;
			MonsterVector.removeFromArray ( child.parent.parent.name , "collision with plane bullet (turret)" );
			return ;

		}
		
		if ( cname == "MONSTER")
		{
			//powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;		
			enemiesPool.Despawn ( child.parent.parent ) ;
			createParticleEffect ( child.position , child.rotation ) ;
			ScoreControl.addScore ( 300 ) ;
			rocksPool. Despawn ( transform ) ;
			MonsterVector.removeFromArray ( child.parent.parent.name ,"collision with plane bullet (turret)" );
			return ;
		}
		
		if ( cname == "crate" )
		{
    		collider.gameObject.active = false ;
    		createParticleEffect ( collider.gameObject.transform.position , collider.gameObject.transform.rotation ) ;	
		    ScoreControl.addScore ( 150 ) ;
			rocksPool. Despawn ( transform ) ;
			return ;
		}
	}
}