#pragma strict

class SpawnMonster extends MonoBehaviour {

	static var monsterPool:SpawnPool ; //link to the Monster pool from PoolManager
	static var prefab:Transform ; //prefab used to spawn monster.
	
	//This stores the last point at which a monster was spawned.
	static var lastPath:double = 0.0 ;
	
	function Start ( )
	{
		//Initializations
		if ( ! monsterPool ) 
			monsterPool = PoolManager.Pools ["Monsters"] ;
		if ( ! prefab )
			prefab = monsterPool.prefabs["monster_for_loft"] ;
	}
	
	function Update ( )
	{
		//Do not spawn is there is no movement or the boss is spawned.
		if ( ! StartButton.Started || LoftMovement.isStopped () || Controller.bossIsSpawned )
			return ; 

		//If the path has the same sign and enough distance has passed since the last monster (0.053) 
		//another one will be spawned.

		if ( LoftMovement.currPath * lastPath >= 0 && LoftMovement.currPath  > lastPath )
		{
		
			lastPath = LoftMovement.currPath + Controller.monster_spawn_distance ;
			
			if ( lastPath >= 1 )
			{
				lastPath -= 1f;
				lastPath = -1f + lastPath ; 
			}
			
			var newMonster = monsterPool.Spawn ( prefab ) ;
			var spawn = newMonster.GetComponent ( SpawnOnLoft ) ;
			var PF = newMonster.GetComponentInChildren ( EnemyPathfinding ) ;
			//Initialization for the monster Pathfinding. (which is only patrol)
			PF.Init ( ) ; 
			spawn.Init ( Random.value ) ;
		}
	}
}