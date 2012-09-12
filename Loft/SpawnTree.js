#pragma strict

class SpawnTree extends MonoBehaviour {

	private var limit:int = 50 ;
	static var treePool:SpawnPool ;
	static var prefab:Transform ;
	var activ:int = 0 ;
	static var contor = 2 ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! treePool ) 
			treePool = PoolManager.Pools ["Trees"] ;

	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ; 
		if ( ! onCooldown )
		{
			prefab = treePool.prefabs["leaf_for_loft_"+contor] ;
			++contor ;
			if ( contor == 7 )
				contor = 2 ;
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
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 0.5 * extraTime ) ;
		onCooldown = false ;
	}
	
}