#pragma strict

class MoveRock extends MonoBehaviour {
	
	var particleEffect: GameObject ;
	static private var rocksPool: SpawnPool ;
	static private var enemiesPool: SpawnPool ;
	static private var sentryPool: SpawnPool ;
	static private var migPool: SpawnPool ;

	static private var powerUp : PowerUp ;

	
	function Start ( )
	{
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools["Monsters"] ;
		if ( ! sentryPool )
			sentryPool = PoolManager.Pools [ "Sentry" ] ;
		if ( ! migPool ) 
			migPool = PoolManager.Pools [ "Enemy Airplane" ] ;
		if ( ! powerUp)
			powerUp = GameObject.Find ( "Power Up Control").GetComponent ( PowerUp ) ;
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
		
		if ( cname.Contains ( "bullet") || cname == "Runner" ||
			 cname.Contains ( "ammo") || cname.Contains ( "health" ) || cname.Contains ( "rock" ) )
				return ;
		
		if ( cname.Contains ( "Plant" ) )
		{
			rocksPool. Despawn ( transform.parent.parent ) ;
			return ;
		}
		
		child = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;

		
		if ( cname.Contains ( "sentry" ) )
		{
		
			createParticleEffect ( child.position , child.rotation ) ;
			sentryPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent ) ;
			rocksPool. Despawn ( transform.parent.parent ) ;
			return ;
		}	
		
		if ( cname.Contains ( "mig" ) )
		{
			createParticleEffect ( child.position, child.rotation ) ;
			migPool.Despawn ( CollisionInfo.contacts[0].otherCollider.gameObject.transform.parent.parent ) ;
			ScoreControl.addScore ( 500 ) ;
			return ;
		}
		
		if ( cname == "MONSTER")
		{
			enemiesPool.Despawn ( child.parent.parent ) ;
			createParticleEffect ( child.position , child.rotation ) ;
			ScoreControl.addScore ( 300 ) ;
			rocksPool. Despawn ( transform.parent.parent ) ;
			return ;
		}
		else
			if ( cname == "crate" )
			{
	    		collider.gameObject.active = false ;
	    		createParticleEffect ( collider.gameObject.transform.position , collider.gameObject.transform.rotation ) ;	
			    ScoreControl.addScore ( 150 ) ;
			    powerUp.Spawn ( collider.gameObject.transform ) ;
			    rocksPool. Despawn ( transform.parent.parent ) ;
			    return ;
			}
	}
}