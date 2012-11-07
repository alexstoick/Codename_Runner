#pragma strict

class MoveTurretBullet extends MonoBehaviour {

	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	private var tParam:double = 0.0 ;
	static private var rocksPool: SpawnPool ;

	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
	}
	
	function Init ( target:Vector3 )
	{
		targetLocation = target ;
		despawnTime = Time.time + 1 ;
		tParam = 0.0 ;
	}
	
	function Update ()
	{
		if ( tParam >= 1 || Time.time > despawnTime )
		{
			rocksPool. Despawn ( transform ) ;
			despawnTime = 0.0 ;
			return ;
		}

		tParam += Time.deltaTime * 0.1 ;
		transform.position = Vector3.Lerp ( transform.position , targetLocation , tParam ) ;
		transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var cname:String = collider.name ;
		if ( cname.Contains ( "Plant" ) || name == "Loft" ) //|| cname.Contains ( "plane" ) )
		{
			rocksPool. Despawn ( transform ) ;
			return ;
		}
	}
}