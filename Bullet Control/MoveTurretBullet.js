#pragma strict

class MoveTurretBullet extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	private var followPlane:boolean ;
	static private var plane:Transform ;
	
	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
	}
	
	function Init ( target:Vector3 , shouldFollow:boolean )
	{
		targetLocation = target ;
		despawnTime = Time.time + 0.8 ;
		followPlane = shouldFollow ;
	}
	
	function Update ()
	{
//		if ( followPlane )
//			targetLocation = plane.position ;
			
		if ( Time.time > despawnTime )
		{
			rocksPool. Despawn ( transform ) ;
			despawnTime = 0.0 ;
		}
	
		if ( despawnTime )
		{
			transform.position = Vector3.Lerp ( transform.position , targetLocation , 5* Time.deltaTime ) ;
			transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		}
	}
	
	function OnCollisionEnter(CollisionInfo:Collision) 
	{
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;
		
		if ( name == "Loft" || name.Contains ( "Plant" ) )
		{
			rocksPool. Despawn ( transform ) ;
		}
	}
}