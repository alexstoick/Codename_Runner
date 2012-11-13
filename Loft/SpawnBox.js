#pragma strict

class SpawnBox extends MonoBehaviour {

	static var boxPool:SpawnPool ;
	static var prefab:Transform ;
	
	static var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! boxPool  ) 
			boxPool  = PoolManager.Pools ["Boxes"] ;
		if ( ! prefab )
			prefab = boxPool.prefabs["box_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ;

		if ( lastPath + 0.030 < LoftMovement.currPath  )
		{
			lastPath = LoftMovement.currPath ;
			var newBox = boxPool.Spawn ( prefab ) ;
			var spawn = newBox.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( Random.value ) ;
		}
	}
}