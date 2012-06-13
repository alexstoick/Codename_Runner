#pragma strict

class CreateCylinder extends MonoBehaviour {

	var newObjectType: Transform[] ;
	var cubesType: Transform[] ;
	var materials:Material[] ;

	
	static private var numberOfCylinders:int ;
	static private var cylinderVector : CylinderVector ;
	static private var ammoBoxSpawn: AmmoBoxSpawn ;
	static private var parent:Transform ;
	private static var MAX_CYLINDERS:int = 60 ;
	private var creating: boolean ; 
	static private var levelGen:LevelGeneration ;
	private static var _number:int = 0 ;
	

	
	function Start ( )
	{
		numberOfCylinders = 0 ;
		if ( ! parent )
			parent = GameObject.Find ( "Cylinder Control").transform ;
		if ( ! cylinderVector )
			cylinderVector = GetComponent ( CylinderVector ) ;
		if ( ! levelGen )
			levelGen = GameObject. Find ( "Level Control"). GetComponent ( LevelGeneration ) ;
		if ( ! ammoBoxSpawn )
			ammoBoxSpawn = GameObject. Find ( "Ammo Box Control").GetComponent ( AmmoBoxSpawn ) ;
	}
	
	public function transformGate ( cilindru:Transform , level:Array )
	{
		var transforms = cilindru.GetComponentsInChildren(Transform);

		for ( var i = 0 ; i < 24 ; ++ i )
			if ( level[i] == 3)
			{		
	    		var name:String = "Cube" + (i+1) ;
	    		for (var t : Transform in transforms)
		    	{
			    	if (t.name == name) 
			    	{
						//avem cubul potrivit
						t.gameObject.renderer.material = materials [1] ;
			    	}
				}
			}

	}

	
	public function createCylinder ( )
	{
		var rotation:Quaternion = Quaternion(0,0,0,0) ;
		var newCylinder:Transform ;

		creating = true ;
		var position: Vector3 ;
		position.x =  11.68 ;
		position.y =  -9.03 ;
		position.z =  0.12 + ( 1.545 * ( numberOfCylinders + 1 ) ) ;
		
		++_number ;
		var isTrigger:boolean ;
		var level = levelGen.getLine ( _number ) ;
		//Debug.LogWarning ( "createCylinder:" + _number ) ;
		
		if ( level[24] )
		{
			//is Trigger
			newCylinder = Instantiate ( newObjectType[1] , Vector3 ( 3.64 , -1 , position.z ) , Quaternion ( 0 , 0 , 0 , 0 ) ) ;
			++numberOfCylinders;
			newCylinder.name = "Cylinder" + (_number) ;
			newCylinder.parent = parent ;
			++ numberOfCylinders ;
			cylinderVector.addCylinder ( newCylinder , false );
			creating = false ;
			transformGate ( newCylinder , level ) ;
			return ;
		}

		newCylinder = Instantiate ( newObjectType[0] , position , rotation ) ;
			
		newCylinder.name = "Cylinder" + (_number) ;
		newCylinder.parent = parent ;
		++ numberOfCylinders ;
		
		for ( var i  = 1 ; i < 25 ; ++ i )
		{
			transformBox ( i ,level[i] , position.z , newCylinder ) ;
		}

		cylinderVector.addCylinder ( newCylinder );
		
		creating = false ;
	}
	
	
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

	
	
	function FixedUpdate ()
	{
		if ( numberOfCylinders < 45 && !creating )
		{
			createCylinder ( );
		}
	} 
}