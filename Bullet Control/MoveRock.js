#pragma strict

class MoveRock extends MonoBehaviour {
	
	var particleEffect: GameObject ;
	private var rock:Transform ;
	static private var rocksPool: SpawnPool ;
//	static private var powerUp : PowerUp ;
	
	function Start ( )
	{
		if ( !rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		rock = transform ;
//		if ( ! powerUp)
//			powerUp = GameObject.Find ( "Power Up Control").GetComponent ( PowerUp ) ;
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
//		Debug.LogWarning ( "rock collision" + collider ) ;
		
		if ( collider.name == "Runner" )
			return ;
			
		if ( collider.name.Contains ( "ammo") || collider.name.Contains ( "health" ) )
			return ;
		
		
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
	    			return ;
		}
		else
			if ( collider.name == "crate" )
			{
	    		collider.gameObject.active = false ;
	    		createParticleEffect ( collider.gameObject.transform.position.z , collider.gameObject.transform.rotation ) ;	
			    ScoreControl.addScore ( 150 ) ;
			    //powerUp.Spawn ( collider.gameObject.transform.parent ) ;
			    return ;
			}
		if ( ! collider.name.Contains ( "bullet") )
			rocksPool . Despawn ( rock ) ;
		
	}
}