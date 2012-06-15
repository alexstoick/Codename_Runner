#pragma strict

class SpawnCylinder extends MonoBehaviour {

	private var nr:int = 0 ;
	private static var cylinderPool:SpawnPool ;
	var bigGroup:Transform ;
	
	private function Spawn ( ) 
	{
		var position: Vector3 ;
		position.z =  0.12 + ( 1.545 * ( nr + 1 ) ) ;
		position.x =  11.68 ;
		position.y =  -9.03 ;
		++ nr ;
		
		var cylinderPrefab:Transform = cylinderPool.prefabs["Cylinder Simple"];
		var cylinder:Transform = cylinderPool.Spawn(cylinderPrefab);
		cylinder.position = position ;
		Debug.Log("Spawned: " + cylinder.name); 		
	}
	
	function Start ( )
	{
		if ( ! cylinderPool )
			cylinderPool = PoolManager.Pools["Cylinder"] ;
		for ( var i:int = 0 ; i < 40 ; ++ i )
		{
			Spawn () ;
		}
		if ( ! cylinderPool )
			cylinderPool = PoolManager.Pools["Cylinder"] ;
	}

	function Update () 
	{
		for ( var i:int = 0 ; i < PoolManager.Pools["Cylinder"].Count ; ++ i )
		{
			var currentCylinder:Transform = cylinderPool[1] ;
			if ( currentCylinder.position.z + 5 < bigGroup.position.z )
				cylinderPool.Despawn ( currentCylinder ) ;
		}
		
		if ( cylinderPool.Count < 40 )
			Spawn() ;
	}
}