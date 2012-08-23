#pragma strict

class MoveBullet extends MonoBehaviour {
	
	static private var bulletPool: SpawnPool ;

	function Start ( )
	{
		if ( ! bulletPool ) 
			bulletPool = PoolManager. Pools [ "Bullets" ] ;
	}

	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var cname = CollisionInfo.contacts[0].otherCollider.name ;
		
		if ( cname.Contains ( "bullet" ) || cname.Contains ( "rock" ) )
			return ;
			
		bulletPool . Despawn ( transform.parent.parent ) ;
	}
}