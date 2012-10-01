#pragma strict

class MoveTurretBullet extends MonoBehaviour {

	static private var rocksPool: SpawnPool ;
	private var despawnTime:double = 0.0 ;
	private var targetLocation:Vector3 ;
	
	function Start ( )
	{
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools [ "Rocks" ] ;
	}
	
	function Init ( target:Vector3 )
	{
		targetLocation = target ;
		despawnTime = Time.time + 0.8 ;
	}
	
	function Update ()
	{
		if ( Time.time > despawnTime )
		{
			rocksPool. Despawn ( transform ) ;
			despawnTime = 0.0 ;
			return ;
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