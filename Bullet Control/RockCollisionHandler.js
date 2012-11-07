#pragma strict

class RockCollisionHandler extends MonoBehaviour {
	
	var particleEffect: GameObject ;
	static private var rocksPool: SpawnPool ;
	static private var enemiesPool: SpawnPool ;
	static private var sentryPool: SpawnPool ;
	static private var migPool: SpawnPool ;
	static private var powerUpControl : PowerUpControl ; 

	static private var powerUp : PowerUp ;
	private var targetNo:int = 0;
	private var shouldLock:boolean = false ;

	
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
		if ( ! powerUpControl )
			powerUpControl = GameObject.Find ( "PowerUp").GetComponent ( PowerUpControl ) ;
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
				
		child = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;

		
		if ( cname.Contains ( "Plant" ) )
		{
			createParticleEffect ( CollisionInfo.contacts[0].point , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
			if ( transform.parent.parent.gameObject.active )
				rocksPool. Despawn ( transform.parent.parent ) ;
			return ;
		}
		


		
		if ( cname.Contains ( "sentry" ) )
		{
			createParticleEffect ( child.position , child.rotation ) ;
			powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;
			sentryPool.Despawn ( child.parent.parent ) ;
			if ( transform.parent.parent.gameObject.active )
				rocksPool. Despawn ( transform.parent.parent ) ;
			MonsterVector.removeFromArray (child.parent.parent.name , "collision with plane rock");
			return ;
		}	
		
		if ( cname.Contains ( "mig" ) )
		{
			createParticleEffect ( child.position, child.rotation ) ;
			powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;
			migPool.Despawn ( child.parent.parent ) ;
			ScoreControl.addScore ( 500 ) ;
			if ( transform.parent.parent.gameObject.active )
				rocksPool. Despawn ( transform.parent.parent ) ;
			MonsterVector.removeFromArray ( child.parent.parent.name ,"collision with plane rock" );
			return ;
		}
		
		if ( cname == "MONSTER")
		{
			//powerUpControl.Spawn ( child.parent.parent , CollisionInfo.contacts[0].point ) ;
			enemiesPool.Despawn ( child.parent.parent ) ;
			createParticleEffect ( child.position , child.rotation ) ;
			ScoreControl.addScore ( 300 ) ;
			if ( transform.parent.parent.gameObject.active )
				rocksPool. Despawn ( transform.parent.parent ) ;
			MonsterVector.removeFromArray (child.parent.parent.name ,"collision with plane rock" );
			return ;
		}
		else
			if ( cname == "crate" )
			{
	    		collider.gameObject.active = false ;
	    		createParticleEffect ( collider.gameObject.transform.position , collider.gameObject.transform.rotation ) ;	
			    ScoreControl.addScore ( 150 ) ;
			    if ( transform.parent.parent.gameObject.active )
				    rocksPool. Despawn ( transform.parent.parent ) ;
			    return ;
			}
	}
}