#pragma strict

class SpawnCylinder extends MonoBehaviour {

	var cubeMaterials:Material[] ;
	var cylinderMaterials:Material[] ;

	//static var _LineNumber:int = 0 ;
	static var numberOfCylinders:int = 0 ;
	var bigGroup:Transform ;
	private static var levelGen:LevelGeneration ; 
	private static var ammoBoxSpawn:AmmoBoxSpawn ;
	static var doSpawn:boolean = true ;
	
	
	
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
	
/*	private function transformGate ( level:Array , zPos:int , pare:Transform , impare:Transform )
	{
		var i:int;
		for ( i = 0 ; i < 24 ; ++ i )
		{
			
			var position:Vector3 = Vector3 ( 3.64 , -1 , zPos - (i%2) * 1.545 ) ;
			var rotation:Quaternion = Quaternion ( 0 , 0 , 0 , 0 ) ;
			var cubePrefab:Transform ;
			var currentCube:Transform ;
	
			switch ( level[i] )
			{
				case 0: 
					cubePrefab = cubesPool.prefabs["brad_refferencePoint"] ;
					break ;
				case 3: 
					cubePrefab = cubesPool.prefabs["triggerCube_refferencePoint"];
					break  ;
			}
			
			currentCube = cubesPool.Spawn ( cubePrefab ) ;
			currentCube.position = position ;
			currentCube.rotation = rotation ;
			currentCube.rotation.eulerAngles.z = i*15 ;
			if ( i % 2 )
				currentCube.parent = pare ;
			else
				currentCube.parent = impare ;
		}
	}*/
	
	private function Spawn ( ) 
	{
		var position: Vector3 ;
		position.z =  0.12 + ( 1.543 * ( numberOfCylinders + 1 ) ) ;
		position.x =  0 ;//11.68 ;
		position.y =  0 ;//-9.03 ;

//		++ _LineNumber ;
		
		var level:Array ; 
		level = levelGen.getLine (  ) ;
		
		var cylinderPrefab:Transform ; 
		var currentCylinder:Transform ;
		
		if ( level[24] )
		{
			//is Trigger

			position.x =  3.89 ;
			position.y = -1.030298 ;

			cylinderPrefab = cylinderPool.prefabs["triggerBoxes"] ;
			currentCylinder = cylinderPool.Spawn(cylinderPrefab);
			currentCylinder.position = position ;
			currentCylinder.position.z -= 1.5;
			//currentCylinder.position.x 
			

			/*var pare:Transform ;
			var impare:Transform ;
			cylinderPrefab = cylinderPool.prefabs["Cylinder Simple"] ;
			pare = cylinderPool.Spawn ( cylinderPrefab ) ;
			impare = cylinderPool.Spawn ( cylinderPrefab ) ;
			pare.position = position;
			position.z += 1.545 ;
			impare.position = position ;
			pare.gameObject.AddComponent ( SmoothMove ) ;
			impare.gameObject.AddComponent ( SmoothMove ) ;
			*/
			//transformGate ( level , position.z , pare , impare ) ;
			
			transformGate ( currentCylinder , level ) ;
			Debug.LogWarning ( "Gate transformation" ) ;
			var trs:Transform ; 
			
			trs = currentCylinder.GetChild(0) ;
			trs.rotation =  Quaternion ( 0 , 0 , 0 , 0 ) ;
//			Debug.Log ( trs.GetChild(12).name ) ;
			trs.GetChild(12).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;

			trs = currentCylinder.GetChild(1) ;					
			trs.rotation =  Quaternion ( 0 , 0 , 0 , 0 ) ;
//			Debug.Log ( trs.GetChild(12).name ) ;
			trs.GetChild(12).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			
			numberOfCylinders += 2 ;
	
			return ;
		}
		
		cylinderPrefab = cylinderPool.prefabs["Cylinder Simple"] ;
		currentCylinder = cylinderPool.Spawn(cylinderPrefab);
		currentCylinder.position = position ;
		
		Debug.LogWarning ( "Setting " + currentCylinder.name + "to material no:" + level[25] + " " + Time.time ) ;
		currentCylinder.GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
		
		++numberOfCylinders ;
		
		var string:String = "Line: " + LevelGeneration._Line ;
		
		for ( var i  = 0 ; i < 24 ; ++ i )
		{
			transformBox ( i ,level[i] , position.z ) ;
			if ( level[i] == 1 || level[i] == 2 )
				string += ( " " + i ) ;
		}
//		Debug.Log ( string + "  " + " " + Time.time ) ;

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
			{
				cylinderPool.Despawn ( trs ) ;
				if ( trs.name.Contains ( "trigger") )
				{	
					trs.GetChild(0).GetComponent ( SmoothMove ).shouldMove = false ;
					trs.GetChild(1).GetComponent ( SmoothMove ).shouldMove = false ;
				}
			}
		}
		for ( i = 0 ; i < cubesPool.Count ; ++ i )
		{
			trs = cubesPool[i] ;
			if ( trs.position.z + 5 < bigGroup.position.z )
				cubesPool.Despawn ( trs ) ;
		}
		
		if ( cylinderPool.Count < 40 && doSpawn )
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
				cubePrefab = cubesPool.prefabs["brad_refferencePoint"] ;
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