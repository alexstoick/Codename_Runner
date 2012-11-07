#pragma strict

class MoveBossBullet extends MonoBehaviour {

	private var tParam:double = 0.0 ;
	static private var rocksPool: SpawnPool ;
	static private var plane: Transform ;
	private var despawnTime:double = 0.0 ;

	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! plane )
			plane = GameObject. Find ( "plane critical hit area" ).transform ;
	}
	
	function Init ( )
	{
		tParam = 0.0 ;
		despawnTime = Time.time + 0.8 ;
	}
	
	function Update ()
	{
		if ( tParam >= 1 || despawnTime < Time.time )
		{
			rocksPool. Despawn ( transform ) ;
			tParam = 0.0 ;
			return ;
		}
	
		tParam += Time.deltaTime * 0.3 ;
		transform.position = Vector3.Lerp ( transform.position , plane.position , tParam ) ;
		transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var collider:Collider = CollisionInfo.contacts[0].otherCollider ;
		var cname:String = collider.name ;
		if ( cname.Contains ( "Plant" ) || name == "Loft" )
		{
			rocksPool. Despawn ( transform ) ;
			return ;
		}
	}
}