#pragma strict

class SpawnTree extends MonoBehaviour {

	static var treePool:SpawnPool ; //link to the Tree pool from PoolManager
	static var prefab:Transform ; //prefab used to spawn

	//We got 5 different types of leafs - this is used to cycle through those
	static var contor = 2 ;
	
	//Last point where a plant was spawned.
	static var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! treePool ) 
			treePool = PoolManager.Pools ["Trees"] ;

	}
	
	function Update ( )
	{
		//Do not spawn is there is no movement or the boss is spawned.
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ; 
			
		//If the path has the same sign and enough distance has passed since the last leaf (0.0175) 
		//another one will be spawned.

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + 0.0175 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			prefab = treePool.prefabs["leaf_for_loft_"+contor] ;
			++contor ;
			if ( contor == 7 )
				contor = 2 ;

			var newTree = treePool.Spawn ( prefab ) ;
			var spawn = newTree.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( Random.value ) ;
		}
	}
}