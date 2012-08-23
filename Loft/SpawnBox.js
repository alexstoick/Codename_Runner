#pragma strict

class SpawnBox extends MonoBehaviour {

	private var limit:int = 75 ;
	static var boxPool:SpawnPool ;
	static var prefab:Transform ;
	var activ:int = 0 ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! boxPool  ) 
			boxPool  = PoolManager.Pools ["Boxes"] ;
		if ( ! prefab )
			prefab = boxPool.prefabs["box_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( boxPool.Count < limit && ! onCooldown )
		{
			var newBox = boxPool.Spawn ( prefab ) ;
			var spawn = newBox.GetComponent ( SpawnOnLoft ) ;
			spawn.Init ( ) ;
			activ = boxPool.Count ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		yield WaitForSeconds ( 0.43 ) ;
		onCooldown = false ;
	}



}