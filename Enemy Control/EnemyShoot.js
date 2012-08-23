#pragma strict

class EnemyShoot extends MonoBehaviour
{

	static private var bulletPool: SpawnPool ;
	static private var bulletPrefab: Transform ;
	
	private var parentProperty:SpawnOnLoft ;
	private var shootCooldownBar: LifeBar ;
	private var copil:Transform ;


	var shootOnCooldown:boolean = false ;
	var shouldShoot:boolean = false ;
	
	function Start ( )
	{
		if ( ! shootCooldownBar )
			shootCooldownBar = GetComponentInChildren ( LifeBar ) ;
		if ( ! bulletPool )
			bulletPool = PoolManager.Pools ["Bullets"] ;
			
		if ( ! bulletPrefab )
			bulletPrefab = bulletPool.prefabs [ "bullet_for_loft" ] ;
		
		copil = transform.GetChild ( 0 ) ;
		parentProperty = transform.parent.GetComponent ( SpawnOnLoft ) ;
	}

	function setOffCooldown ( )
	{
		shootOnCooldown = false ;
	}

	function Shoot ( )
	{
		if ( shootOnCooldown )
			return ;
		
		shootOnCooldown = true ;				
		
		shootCooldownBar.startEvent ( ) ;
		yield WaitForSeconds ( 0.95 ) ;

		var newBullet:Transform ;
		var position:Vector3 = Vector3 ( 3.64 , -1 , transform.position.z - 3 ) ;

		newBullet =  bulletPool. Spawn ( bulletPrefab ) ;
		var movement = newBullet.GetComponent ( BulletMovementOnLoft ) ;
		Debug.Log ( "called fire from" + transform.parent.name + " with startPoint:" + parentProperty.startPoint ) ;
		movement.Init ( transform.localRotation , parentProperty.startPoint ) ;
		shootOnCooldown = false ;

//		Debug.Log ( transform.name + " shoot should be ON cd:" + Time.time + " spawned: " + newBullet.name + " " + newBullet.position ) ;
//		Debug.Log ( transform.name + " shoot should be OFF cd:" + Time.time ) ;

	}
}