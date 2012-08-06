#pragma strict

class MoveRock extends MonoBehaviour {
	
	var movementVariation = 0.5 ;
	var particleEffect: GameObject ;
	private var rock:Transform ;
	static private var runner : Transform ;
	static private var rocksPool: SpawnPool ;
	
	function Start ( )
	{
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! runner )
			runner = GameObject.Find ( "BigGroup" ) .transform ;
		rock = transform ;
	}
	
	function Update ( )
	{
		if ( rock.position.z < runner.position.z )
			rocksPool. Despawn ( rock ) ;
	}
	
	function FixedUpdate () //moving the Bullet!
	{
		transform.position.z += movementVariation ;
	}
	
	function createParticleEffect ( zPos:double , rotation:Quaternion )
	{
		var position:Vector3 = Vector3 ( 3.64 , -0.98 , zPos ) ;
		
   		var instance = Instantiate( particleEffect , position , rotation ) ;
	    Destroy(instance.gameObject, 1 );
	}


	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var child:Transform ;
		Debug.LogWarning ( "rock collision" + collider ) ;
		
		if ( collider.name == "Tree" )
		{
			rocksPool. Despawn ( rock ) ;
			return ;
		}
		
		if ( collider.name == "MONSTER")
		{
					child = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;
					PoolManager.Pools["Enemies"].Despawn ( child.parent ) ;
	    			createParticleEffect ( child.position.z , child.rotation ) ;
	    			ScoreControl.addScore ( 300 ) ;
		}
		else
			if ( collider.name == "crate" )
			{
	    		collider.gameObject.active = false ;
	    		createParticleEffect ( collider.gameObject.transform.position.z , collider.gameObject.transform.rotation ) ;	
			    ScoreControl.addScore ( 150 ) ;
			}
		if ( ! collider.name.Contains ( "bullet") )
			rocksPool . Despawn ( rock ) ;
		
	}
}