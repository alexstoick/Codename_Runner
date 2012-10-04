#pragma strict

class MoveTurretBullet extends MonoBehaviour {

	var particleEffect: GameObject ;
	static private var rocksPool: SpawnPool ;
	static private var enemiesPool: SpawnPool ;
	static private var sentryPool: SpawnPool ;
	static private var migPool: SpawnPool ;

	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	private var isPlaneBullet: boolean = false ;

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
			
		if ( transform.name.Contains ( "bullet" ) )
			isPlaneBullet = true ;
	}
	
	function Init ( target:Vector3 )
	{
		targetLocation = target ;
		despawnTime = Time.time + 0.8 ;
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
			transform.position = Vector3.Lerp ( transform.position , targetLocation , 5* Time.deltaTime ) ;
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
		var child:Transform ;
		var cname:String = collider.name ;

		
		if ( isPlaneBullet )
		{

			if ( cname.Contains ( "Plant" ) || name == "Loft" )
			{
				rocksPool. Despawn ( transform.parent ) ;
				return ;
			}
			
			child = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;
	
			if ( cname.Contains ( "sentry" ) )
			{
			
				createParticleEffect ( child.position , child.rotation ) ;
				sentryPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent ) ;
				return ;
			}	
			
			if ( cname.Contains ( "mig" ) )
			{
				createParticleEffect ( child.position, child.rotation ) ;
				migPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.parent ) ;
				return ;
			}
			
			if ( cname == "MONSTER")
			{
						enemiesPool.Despawn ( child.parent.parent ) ;
		    			createParticleEffect ( child.position , child.rotation ) ;
		    			ScoreControl.addScore ( 300 ) ;
			}
			else
				if ( cname == "crate" )
				{
		    		collider.gameObject.active = false ;
		    		createParticleEffect ( collider.gameObject.transform.position , collider.gameObject.transform.rotation ) ;	
				    ScoreControl.addScore ( 150 ) ;
//				    powerUp.Spawn ( collider.gameObject.transform ) ;
				}
		}
	}
}