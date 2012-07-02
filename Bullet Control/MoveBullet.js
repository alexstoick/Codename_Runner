#pragma strict

class MoveBullet extends MonoBehaviour {
	
	var movementVariation = 0.5 ;
	private var bullet:Transform ;
	static private var runner : Transform ;
	static private var bulletPool: SpawnPool ;
	static private var cubesPool: SpawnPool ;
	
	function Start ( )
	{
		if ( ! bulletPool ) 
			bulletPool = PoolManager. Pools [ "Bullets" ] ;
		if ( ! cubesPool )
			cubesPool = PoolManager. Pools [ "Cubes" ] ; 
		if ( ! runner )
			runner = GameObject.Find ( "BigGroup" ) .transform ;
		bullet = transform ;
	}
	
	function Update ( )
	{
		if ( bullet.position.z < runner.position.z )
			bulletPool. Despawn ( bullet ) ;
	}
	
	function FixedUpdate () //moving the Bullet!
	{
		transform.position.z += movementVariation ;
	}

	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		Debug.Log ( "123 " + CollisionInfo.contacts[0].otherCollider.name ) ;
		bulletPool . Despawn ( bullet ) ;
	}
}