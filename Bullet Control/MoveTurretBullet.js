#pragma strict

class MoveTurretBullet extends MonoBehaviour {

	static private var player:Transform ;
	static private var rocksPool: SpawnPool ;
	private var despawnTime:double ;
	
	function Awake ( )
	{
		if ( ! player )
			player = GameObject.Find ( "plane" ).transform ;
	}
	
	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
	}
	

/*	function Update ( )
	{
		transform.position = Vector3.MoveTowards ( transform.position , player.position , Time.deltaTime * 90 ) ;
		if ( Time.time > despawnTime )
			rocksPool. Despawn ( transform ) ;
	}*/
	
	function Init ( )
	{
		despawnTime = Time.time + 0.8;
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
	
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var child:Transform ;
		var cname:String = collider.name ;

		if ( cname == "plane" )
			{
				Debug.LogError ( "HIT BY PROJECTILE" ) ;
				return ;
			}
	}


}