#pragma strict

class EnemySpawn extends MonoBehaviour {

	private static var enemiesPool: SpawnPool ;
	private static var enemyPrefab: Transform ;
	private static var bigGroup:Transform ;
	
	function Awake ( )
	{
		if ( ! bigGroup  )
			bigGroup  = GameObject.Find ( "BigGroup").transform ;
	}
	
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
		newEnemy.rotation.eulerAngles.z = 15*(rot+1) ;
		var enemyPF: EnemyPathfinding = newEnemy.GetComponent ( EnemyPathfinding ) ;
		
		enemyPF.SetPosition ( _Line , rot + 1 ) ;
	}
	
	
	function Update ( )
	{
		
		var i:int ;
		var trs:Transform ;
		
		for ( i = 0 ; i < enemiesPool.Count ; ++ i )
		{
			trs = enemiesPool[i] ;
			if ( trs.position.z + 5 < bigGroup.position.z )
				enemiesPool.Despawn ( trs ) ;
		}		
		
		
	}
}