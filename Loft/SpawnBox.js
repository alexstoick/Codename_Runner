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

		if ( ! onCooldown )
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
		var extraTime = Mathf.Max ( ( 0.0003 / LoftMovement.movementVariation ) , 1 ) ;
		yield WaitForSeconds ( 0.5 * Mathf.Min ( extraTime , 3 ) ) ;
		onCooldown = false ;
	}



}