#pragma strict

class CreateCylinder extends MonoBehaviour {

	var newObjectType: Transform[] ;
	var cubesType: Transform[] ;
	var cubeMaterials:Material[] ;
	var cylinderMaterials:Material[] ;

	
	static private var numberOfCylinders:int ;
	static private var ammoBoxSpawn: AmmoBoxSpawn ;
	static private var parent:Transform ;
	private static var MAX_CYLINDERS:int = 60 ;
	private var creating: boolean ; 
	static private var levelGen:LevelGeneration ;
	private static var _number:int = 0 ;
	static private var runner:Transform ;

	function Awake ( )
	{
		numberOfCylinders = 0 ;
		if ( ! parent )
			parent = GameObject.Find ( "Cylinder Control").transform ;
		if ( ! levelGen )
			levelGen = GameObject. Find ( "Level Control"). GetComponent ( LevelGeneration ) ;
		if ( ! ammoBoxSpawn )
			ammoBoxSpawn = GameObject. Find ( "Ammo Box Control").GetComponent ( AmmoBoxSpawn ) ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ).transform ;			
	}
	
	public function transformGate ( cilindru:Transform , level:Array )
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

	public function shiftVector ( poz:int ) 
	{
		Debug.Log ( "Deactivated:" + Cylinder[poz].name ) ;

		//if ( numberOfCylinders < 45 )
			createCylinder ( "from shift vector" , poz ) ;
	}

	function Update ( )
	{
		for ( var i = 0 ; i < cylinderLength; ++ i )
			if ( Cylinder[i].position.z + 5 <  runner.position.z && Cylinder[i].gameObject.active )
			{
				Cylinder[i].gameObject.active = false ;
				shiftVector ( i ) ;
			}
			
		for ( var i = 0 ; i < cubeLenght ; ++ i )
			if ( Cube[i].position.z + 5 < runner.position.z && Cube[i].gameObject.active )
				Cube.gameObject.active = false ;
				
	}

	function FixedUpdate ()
	{
		if ( numberOfCylinders < 45 && !creating )
			createCylinder ( "from fixed update" , -1 );
	} 
	
	static private var Cylinder:Transform[] = new Transform[50] ;
	static private var Cube:Transform[] = new Transform[150] ;
	static private var cubeType:int[] = new int[150] ;
	static private var type:int[] = new int[50] ; 	// 0 - normal ; 1 - gate 
	static private var cylinderLength:int = 0 ;
	static private var cubeLength:int = 0 ;
	static private var maxCylinder:int = 50 ;
	private var level:Array ;
	
	private function transformBox ( rot:int , code:int , zPos : double , parent: Transform  )
	{
		var newBox:Transform ;
		
		
		
		-- rot ;
		switch ( code )
		{
			case 0: break ;
			case 1: newBox = Instantiate ( cubesType [0] , Vector3 ( 3.64 , -1 , zPos ) , Quaternion ( 0 , 0 , 0 , 0) ) ;
				newBox.parent = parent ;
				newBox.rotation.eulerAngles.z = rot*15 ;
				break  ;
			case 2: newBox = Instantiate ( cubesType [1] , Vector3 ( 3.64 , -1 , zPos ) , Quaternion ( 0 , 0 , 0 , 0) ) ;
				newBox.parent = parent ;
				newBox.rotation.eulerAngles.z = rot*15 ;
				break  ;
			case 4:			
				ammoBoxSpawn.Spawn ( rot+1 , zPos ) ; //substring4
				break  ;
		}
	}

	
		
	private function getAvailableObject ( typeNeeded:int , poz:int )
	{
		var rotation:Quaternion = Quaternion(0,0,0,0) ;
		var newCylinder:Transform ;
		var position: Vector3 ;
		var i:int ;
		
		position.x =  3.64 ;
		position.y =  -1 ;
		position.z =  0.12 + ( 1.545 * ( numberOfCylinders + 1 ) ) ;
		
		if ( typeNeeded == 0 )
		{
			position.x =  11.68 ;
			position.y =  -9.03 ;
		}
		var found:boolean = false ;
		
		if ( poz != -1 && typeNeeded == type[poz] )
			found = true ;

		for ( i = 0 ; i < cylinderLength && ! found; ++ i )
			if ( type[i] == typeNeeded  && ! Cylinder[i].gameObject.active && Cylinder[i].position.z + 5 < runner.position.z ) 
			{
				found = true ;
				Cylinder [i].gameObject.active = true ;
			}
		-- i;
		if ( poz != -1 && typeNeeded == type[poz] )
		{
			i = poz ;
			if ( typeNeeded == 1 )
				Debug.LogWarning ( "cu poz" ) ;
		}
			
		if ( found )
		{
			Cylinder [i].gameObject.active = true ;
			Cylinder [i].position = position ;
			Debug.Log ( "Found: " + i + " current number:" + _number + " found free number:" + Cylinder[i].name + " time:" + Time.time) ;
			Cylinder [i].name = "Cylinder" + (_number) + " poz:"+i;
			if ( typeNeeded == 0 )
				Cylinder [i].gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			else
			{
				Cylinder [i].GetChild(0).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
				Cylinder [i].GetChild(1).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			}		
						
			newCylinder = Cylinder[i] ;
		}
		else
		{
			newCylinder = Instantiate ( newObjectType[typeNeeded] , position , rotation ) ;
			newCylinder.name = "Cylinder" + (_number) + " poz:"+cylinderLength ;
			newCylinder.parent = parent ;
			if ( typeNeeded == 0 )
				newCylinder.gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			else
			{
				newCylinder.GetChild(0).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
				newCylinder.GetChild(1).GetChild(0).gameObject.renderer.material = cylinderMaterials [ level[25] ] ;
			}

			Cylinder [cylinderLength] = newCylinder ;
			type [cylinderLength] = typeNeeded  ;
//			Debug.LogWarning ( "setted up cylinder" + _number ) ;
			++cylinderLength ;
		}
		
		return newCylinder ;
	}
	
	public function createCylinder ( message:String , poz:int )
	{
		Debug.LogWarning ( message + " " + Time.time) ;
		if ( creating )
			return ;
		creating = true ;
		
		++_number ;
		
		level = levelGen.getLine ( _number ) ;
		var currentCylinder:Transform ;
		var zPos:double = 0.12 + ( 1.545 * ( numberOfCylinders + 1 ) ) ;
		
		if ( level[24] )
		{
			//is Trigger
			currentCylinder = getAvailableObject  ( 1 , poz ) ;
			transformGate ( currentCylinder , level ) ;
			currentCylinder.GetChild(0).rotation.eulerAngles.z = 0 ;
			currentCylinder.GetChild(1).rotation.eulerAngles.z = 0 ;
			numberOfCylinders += 2 ;
			creating = false ;
			return ;
		}
		
		currentCylinder = getAvailableObject ( 0 , poz ) ;
		
		for ( var i  = 1 ; i < 25 ; ++ i )
		{
			transformBox ( i ,level[i] , zPos , currentCylinder ) ;
		}
		++numberOfCylinders ;
		creating = false ;
		
	}		
}