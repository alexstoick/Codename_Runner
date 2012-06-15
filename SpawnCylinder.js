#pragma strict

class SpawnCylinder extends MonoBehaviour {

	var cubeMaterials:Material[] ;
	var cylinderMaterials:Material[] ;

	static private var _LineNumber:int = 0 ;
	static private var numberOfCylinders:int = 0 ;
	var bigGroup:Transform ;
	private static var levelGen:LevelGeneration ; 
	private static var ammoBoxSpawn:AmmoBoxSpawn ;
	
	
	
	private static var cylinderPool:SpawnPool ; 
	private static var cubesPool:SpawnPool ;
	
	
	function Awake ( )
	{
		if ( ! levelGen )
			levelGen = GameObject. Find ( "Level Control"). GetComponent ( LevelGeneration ) ;
		if ( ! ammoBoxSpawn )
			ammoBoxSpawn = GameObject. Find ( "Ammo Box Control").GetComponent ( AmmoBoxSpawn ) ;
	}
	
	private function transformGate ( cilindru:Transform , level:Array )
	{
	
		var transforms = cilindru.GetComponentsInChildren(Transform);
		
		for ( var i = 0 ; i < 24 ; ++ i )
		{		
    		var name:String = "Cube" + (i+1) ;
    		for (var t : Transform in transforms)
	    	{
		    	if (t.name == name) 
		    	{
					t.gameObject.renderer.material = cubeMaterials [Mathf.Min ( 1 , level[i])] ;
		    	}
			}
		}
	}
	
	private function Spawn ( ) 
	{
		var position: Vector3 ;
		position.z =  0.12 + ( 1.545 * ( numberOfCylinders + 1 ) ) ;
		position.x =  11.68 ;
		position.y =  -9.03 ;

		++ _LineNumber ;
		
		var level:Array ; 
		level = levelGen.getLine ( _LineNumber ) ;
		
		var cylinderPrefab:Transform ; //cylinderPool.prefabs["Cylinder Simple"];
		var currentCylinder:Transform ;// cylinderPool.Spawn(cylinderPrefab);
		
		if ( level[24] )
		{
			//is Trigger

			position.x =  3.64 ;
			position.y =  -1 ;

			cylinderPrefab = cylinderPool.prefabs["triggerBoxes"] ;
			currentCylinder = cylinderPool.Spawn(cylinderPrefab);
			currentCylinder.position = position ;
			
			transformGate ( currentCylinder , level ) ;
			currentCylinder.GetChild(0).rotation.eulerAngles.z = 0 ;
			currentCylinder.GetChild(1).rotation.eulerAngles.z = 0 ;
			
			currentCylinder.GetChild(0).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			currentCylinder.GetChild(1).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			
			numberOfCylinders += 2 ;
	
			return ;
		}
		
		cylinderPrefab = cylinderPool.prefabs["Cylinder Simple"] ;
		currentCylinder = cylinderPool.Spawn(cylinderPrefab);
		currentCylinder.position = position ;
		currentCylinder.gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
		
		++numberOfCylinders ;
		
		for ( var i  = 1 ; i < 25 ; ++ i )
		{
			transformBox ( i ,level[i] , position.z ) ;
		}

	}
	
	function Start ( )
	{
		if ( ! cylinderPool )
			cylinderPool = PoolManager.Pools["Cylinder"] ;
		if ( ! cubesPool )
			cubesPool = PoolManager.Pools["Cubes"] ;
		yield WaitForSeconds(2) ;
	}

	function Update () 
	{
		var trs:Transform ;
		for ( var i:int = 0 ; i < cylinderPool.Count ; ++ i )
		{
			trs = cylinderPool[i] ;
			if ( trs.position.z + 5 < bigGroup.position.z )
				cylinderPool.Despawn ( trs ) ;
		}
		for ( i = 0 ; i < cubesPool.Count ; ++ i )
		{
			trs = cubesPool[i] ;
			if ( trs.position.z + 5 < bigGroup.position.z )
				cubesPool.Despawn ( trs ) ;
		}
		
		if ( cylinderPool.Count < 40 )
			Spawn() ;
	}
	
	private function transformBox ( rot:int , code:int , zPos : double )
	{
		var newBox:Transform ;
		
		var i:int ;

		if ( code == 4 )
		{
			ammoBoxSpawn.Spawn ( rot , zPos ) ;
			return ;
		}
		if ( code == 0 )
			return ;

		-- rot ;
		var position:Vector3 = Vector3 ( 3.64 , -1 , zPos ) ;
		var rotation:Quaternion = Quaternion ( 0 , 0 , 0 , 0 ) ;
		var cubePrefab:Transform ;
		var currentCube:Transform ;

		switch ( code )
		{
			case 1: 
				cubePrefab = cubesPool.prefabs["cube_refferencePoint"] ;
				break ;
			case 2: 
				cubePrefab = cubesPool.prefabs["destroyableCube_refferencePoint"];
				break  ;
		}
		
		currentCube = cubesPool.Spawn ( cubePrefab ) ;
		currentCube.position = position ;
		currentCube.rotation = rotation ;
		currentCube.rotation.eulerAngles.z = rot*15 ;
		
	}
	
}