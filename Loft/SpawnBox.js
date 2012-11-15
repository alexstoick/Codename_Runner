#pragma strict

class SpawnBox extends MonoBehaviour {

	static var boxPool:SpawnPool ; //link to the boxPool from PoolManager
	static var prefab:Transform ; //the prefab for the box
	
	static var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		//Initializations
		if ( ! boxPool  ) 
			boxPool  = PoolManager.Pools ["Boxes"] ;
		if ( ! prefab )
			prefab = boxPool.prefabs["box_for_loft"] ;
	}
	
	function Update ( )
	{
		//Do not spawn is there is no movement or the boss is spawned.
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ;

		//Spawn a new box if enough distance (0.030) has passed
		if ( lastPath + 0.030 < LoftMovement.currPath  )
		{
			lastPath = LoftMovement.currPath ;
			var newBox = boxPool.Spawn ( prefab ) ;
			var spawn = newBox.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( Random.value ) ;
		}
	}
}