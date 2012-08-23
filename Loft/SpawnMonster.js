#pragma strict

class SpawnMonster extends MonoBehaviour {

	private var limit:int = 25 ;
	static var monsterPool:SpawnPool ;
	static var prefab:Transform ;
	var activ:int = 0 ;
	
	var onCooldown:boolean = false ;
	
	function Start ( )
	{
		if ( ! monsterPool ) 
			monsterPool = PoolManager.Pools ["Monsters"] ;
		if ( ! prefab )
			prefab = monsterPool.prefabs["monster_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started ) 
			return ;
		if (  LoftMovement.isStopped () )
			return ;

		if ( monsterPool.Count < limit && ! onCooldown )
		{
			var newMonster = monsterPool.Spawn ( prefab ) ;
			var spawn = newMonster.GetComponent ( SpawnOnLoft ) ;
			var PF = newMonster.GetComponentInChildren ( EnemyPathfinding ) ;
			PF.Init ( ) ;
			spawn.Init ( ) ;
			activ = monsterPool.Count ;
			startCooldown ( );
		}
	}

	function startCooldown ( )
	{
		onCooldown = true ;
		yield WaitForSeconds ( 3.61 ) ;
		onCooldown = false ;
	}




}