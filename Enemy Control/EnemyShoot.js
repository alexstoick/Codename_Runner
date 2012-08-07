#pragma strict

class EnemyShoot extends MonoBehaviour
{

	static private var bulletPool: SpawnPool ;
	static private var bulletPrefab: Transform ;
	
	private var shootCooldownBar: LifeBar ;


	var shootOnCooldown:boolean = false ;
	var shouldShoot:boolean = false ;
	
	function Start ( )
	{
		if ( ! shootCooldownBar )
			shootCooldownBar = GetComponentInChildren ( LifeBar ) ;
		if ( ! bulletPool )
			bulletPool = PoolManager.Pools ["Bullets"] ;
			
		if ( ! bulletPrefab )
			bulletPrefab = bulletPool.prefabs [ "bullet_refferencePoint" ] ;
	}

	function setOffCooldown ( )
	{
		shootOnCooldown = false ;
	}

	//function Update ( )
	//{
	//	Shoot ( ) ;
	//}

	function Shoot ( )
	{
		if ( shootOnCooldown )
			return ;
		
		shootOnCooldown = true ;				
		
		shootCooldownBar.startEvent ( ) ;
		yield WaitForSeconds ( 0.95 ) ;

		var newBullet:Transform ;
		var position:Vector3 = Vector3 ( 3.64 , -1 , transform.position.z - 3 ) ;

		newBullet =  bulletPool. Spawn ( bulletPrefab , position , transform.rotation ) ;
		shootOnCooldown = false ;

//		Debug.Log ( transform.name + " shoot should be ON cd:" + Time.time + " spawned: " + newBullet.name + " " + newBullet.position ) ;
//		Debug.Log ( transform.name + " shoot should be OFF cd:" + Time.time ) ;

	}
}