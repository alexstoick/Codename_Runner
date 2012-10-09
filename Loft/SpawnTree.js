#pragma strict

class SpawnTree extends MonoBehaviour {

	static var treePool:SpawnPool ;
	static var prefab:Transform ;
	static var contor = 2 ;
	
	var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! treePool ) 
			treePool = PoolManager.Pools ["Trees"] ;

	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () )
			return ; 
			
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
			spawn.Init ( ) ;
		}
	}
}