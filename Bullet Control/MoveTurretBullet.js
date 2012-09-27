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
		}
	
		if ( despawnTime )
		{
			Debug.Log ( transform.position + "			" +  targetLocation ) ;
			transform.position = Vector3.Lerp ( transform.position , targetLocation , 5* Time.deltaTime ) ;
			transform.rotation = Quaternion ( 0 , 0 , 0 , 0 ) ;
		}
	}
}