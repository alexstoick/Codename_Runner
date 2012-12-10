#pragma strict

class MovePlaneBullet extends MonoBehaviour {

	//This is used on the plane miniturrets and
	//handles the collisions and destruction of different 
	//game objects.

	static private var rocksPool: SpawnPool ;
	static private var enemiesPool: SpawnPool ;
	static private var sentryPool: SpawnPool ;
	static private var migPool: SpawnPool ;
	static private var powerUpControl:PowerUpControl;

	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	private var tParam:double = 0.0 ;
	
	var particleEffect: GameObject ;
	public var explosionSound:AudioClip ;

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
			
			//If the boss is active and we can see a targeted area, aim the bullets at that position.
			if ( Controller.bossIsSpawned && BossCrosshair.crosshair.gameObject.active && BossShootPlayer.isShootingPlayer )
			{
				transform.position = Vector3.Lerp ( transform.position , BossCrosshair.crosshair.position , tParam ) ;
			}
			else
			//Animate the bullets towards the front of the plane in a straight line.
				transform.position = Vector3.Lerp ( transform.position , targetLocation , tParam ) ;
			transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		}
	}
	
	//Particle effect that is showed when the sentry/plane/monster are destroyed.
	function createParticleEffect ( position:Vector3 , rotation:Quaternion )
	{
   		var instance = Instantiate( particleEffect , position , rotation ) ;
		AudioSource.PlayClipAtPoint( explosionSound , transform.position );
	    Destroy(instance.gameObject, 2 );
	}

	
	//Handles collision with: snetry, plane, monster, crate.
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var child:Transform = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;
		var cname:String = collider.name ;

		if ( cname.Contains ( "Plant" ) || cname == "Loft" || cname.Contains ( "boss" ) )
		{
			rocksPool. Despawn ( transform ) ;
			return ;
		}
		
		if ( ! child.gameObject.active )
			return ;
			
		//If there is a collision with a sentry, spawn a powerUp, create a particle effect
		//despawn both the sentry and the rock; and remove the sentry from the array of
		//targetable monsters.
		if ( cname.Contains ( "sentry" ) )
		{
			powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;		
			createParticleEffect ( child.position , child.rotation ) ;
			sentryPool.Despawn ( child.parent.parent ) ;
			rocksPool. Despawn ( transform ) ;
			ScoreControl.addScore ( 500 ) ;
			MonsterVector.removeFromArray (child.parent.parent.name , "collision with plane bullet (turret)");
			return ;
		}	
		
		
		//If there is a collision with a plane, spawn a powerUp, create a particle effect
		//despawn both the plane and the rock; and plane the sentry from the array of
		//targetable monsters.
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
		
		//If there is a collision with a monsters, spawn a powerUp, create a particle effect
		//despawn both the monster and the rock; and remove the monster from the array of
		//targetable monsters.
		if ( cname == "MONSTER")
		{
			enemiesPool.Despawn ( child.parent.parent ) ;
			createParticleEffect ( child.position , child.rotation ) ;
			ScoreControl.addScore ( 300 ) ;
			rocksPool. Despawn ( transform ) ;
			MonsterVector.removeFromArray ( child.parent.parent.name ,"collision with plane bullet (turret)" );
			return ;
		}
	}
}