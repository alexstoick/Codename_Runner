#pragma strict

class EnemyShoot extends MonoBehaviour
{

	static private var bulletPool: SpawnPool ;
	static private var bulletPrefab: Transform ;


	var shootOnCooldown:boolean = false ;

	
	function Start ( )
	{
		if ( ! bulletPool )
			bulletPool = PoolManager.Pools ["Bullets"] ;
			
		if ( ! bulletPrefab )
			bulletPrefab = bulletPool.prefabs [ "bullet_refferencePoint" ] ;
	}

	function setOffCooldown ( )
	{
		shootOnCooldown = false ;
	}

	function Shoot ( )
	{
	
		if ( shootOnCooldown )
			return ;
		
		var newBullet:Transform ;
		var position:Vector3 = Vector3 ( 3.64 , -1 , transform.position.z - 3 ) ;

		newBullet =  bulletPool. Spawn ( bulletPrefab , position , transform.rotation ) ;
		
		shootOnCooldown = true ;
		Debug.Log ( transform.name + " shoot should be ON cd:" + Time.time + " spawned: " + newBullet.name + " " + newBullet.position ) ;
		yield WaitForSeconds ( 1 ) ;
		Debug.Log ( transform.name + " shoot should be OFF cd:" + Time.time ) ;
		shootOnCooldown = false ;
	}
}