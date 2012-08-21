#pragma strict

class MoveRock extends MonoBehaviour {
	
	var particleEffect: GameObject ;
	private var rock:Transform ;
	static private var rocksPool: SpawnPool ;
//	static private var powerUp : PowerUp ;
	
	function Start ( )
	{
//		if ( !rocksPool )
//			rocksPool = PoolManager.Pools [ "Rocks" ] ;
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
		Debug.LogWarning ( "rock collision" + collider.name ) ;
		var cname:String = collider.name ;
		
		if ( cname.Contains ( "bullet") || cname == "Runner" ||
			 cname.Contains ( "ammo") || cname.Contains ( "health" ) )
				return ;
		

		
		if ( cname == "Tree" )
		{
			//rocksPool. Despawn ( rock ) ;
			return ;
		}
		
		if ( cname == "MONSTER")
		{
					child = CollisionInfo.contacts[0].otherCollider.gameObject.transform ;
					//CARE HERE
					PoolManager.Pools["Enemies"].Despawn ( child.parent ) ;
	    			createParticleEffect ( child.position.z , child.rotation ) ;
	    			ScoreControl.addScore ( 300 ) ;
		}
		else
			if ( cname == "crate" )
			{
	    		collider.gameObject.active = false ;
	    		createParticleEffect ( collider.gameObject.transform.position.z , collider.gameObject.transform.rotation ) ;	
			    ScoreControl.addScore ( 150 ) ;
			    //powerUp.Spawn ( collider.gameObject.transform.parent ) ;
			}
			
//		rocksPool . Despawn ( rock ) ;
		
	}
}