#pragma strict

class SpawnMonster extends MonoBehaviour {

	static var monsterPool:SpawnPool ;
	static var prefab:Transform ;
	
	var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		if ( ! monsterPool ) 
			monsterPool = PoolManager.Pools ["Monsters"] ;
		if ( ! prefab )
			prefab = monsterPool.prefabs["monster_for_loft"] ;
	}
	
	function Update ( )
	{
		if ( ! StartButton.Started || LoftMovement.isStopped () )
			return ; 

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + 0.053 ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newMonster = monsterPool.Spawn ( prefab ) ;
			var spawn = newMonster.GetComponent ( SpawnOnLoft ) ;
			var PF = newMonster.GetComponentInChildren ( EnemyPathfinding ) ;
			PF.Init ( ) ;
			spawn.Init ( ) ;
		}
	}
}