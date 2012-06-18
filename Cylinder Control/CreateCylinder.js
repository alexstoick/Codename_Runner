/*#pragma strict

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
				for ( var j = 0 ; j < Cylinder[i].GetChildCount () ; ++ j )
				{
					Cylinder[i].GetChild (j).gameObject.active = false ;
				}
				shiftVector ( i ) ;
			}
			
		for ( i = 0 ; i < cubeLength ; ++ i )
		{
			if ( cube_Zpos[i] + 5 < runner.position.z )
			{
				Cube[i].gameObject.active = false ;
				for ( j = 0 ; j < Cube[i].GetChildCount () ; ++ j )
				{
					Cube[i].GetChild (j).gameObject.active = false ;
				}

			}
		}
				
	}

	function FixedUpdate ()
	{
		if ( numberOfCylinders < 45 && !creating )
			createCylinder ( "from fixed update" , -1 );
	} 
	
	static private var Cylinder:Transform[] = new Transform[50] ;
	static private var Cube:Transform[] = new Transform[150] ;
	static private var cubeType:int[] = new int[150] ;
	static private var cube_Zpos:int[] = new int[150] ;
	static private var type:int[] = new int[50] ; 	// 0 - normal ; 1 - gate 
	static private var cylinderLength:int = 0 ;
	static private var cubeLength:int = 0 ;
	static private var maxCylinder:int = 50 ;
	private var level:Array ;
	
	
	
	public function createCylinder ( message:String , poz:int )
	{
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
		
//		for ( var i  = 1 ; i < 25 ; ++ i )
//		{
//			transformBox ( i ,level[i] , zPos , currentCylinder ) ;
//		}
		++numberOfCylinders ;
		creating = false ;
		
	}		
	}*/