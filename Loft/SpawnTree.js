#pragma strict

class SpawnTree extends MonoBehaviour {

	private var limit:int = 50 ;
	static var treePool:SpawnPool ;
	static var prefab:Transform ;
	var activ:int = 0 ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! treePool ) 
			treePool = PoolManager.Pools ["Trees"] ;
		if ( ! prefab )
			prefab = treePool.prefabs["tree_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ; 
		if ( treePool.Count < limit && ! onCooldown )
		{
			var newTree = treePool.Spawn ( prefab ) ;
			var spawn = newTree.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			activ = treePool.Count ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		yield WaitForSeconds ( 0.31 ) ;
		onCooldown = false ;
	}
	
}