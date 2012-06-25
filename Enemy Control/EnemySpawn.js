#pragma strict

class EnemySpawn extends MonoBehaviour {

	private static var enemiesPool: SpawnPool ;
	private static var enemyPrefab: Transform ;
	
	function Start ( )
	{
		if ( ! enemiesPool )
			enemiesPool = PoolManager.Pools [ "Enemies" ] ;
		if ( ! enemyPrefab )
			enemyPrefab = enemiesPool.prefabs [ "soldier_refferencePoint" ] ;
	}

	public function handleEnemySpawn ( zPos:double , _Line:int , rot:int )
	{
		
		var newEnemy:Transform ;
		
		var position:Vector3 = Vector3 ( 3.64 , -1 , zPos ) ;
		var rotation:Quaternion = Quaternion ( 0 , 0 , 0 , 0 ) ;

		newEnemy = enemiesPool.Spawn ( enemyPrefab ) ;
		
		newEnemy.position = position ;
		newEnemy.rotation = rotation ;
		newEnemy.rotation.eulerAngles.z = 15*rot ;
		var enemyPF: EnemyPathfinding = newEnemy.GetComponent ( EnemyPathfinding ) ;
		
		enemyPF.SetPosition ( _Line , rot + 1 ) ;
	}
}