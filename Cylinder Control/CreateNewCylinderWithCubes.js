#pragma strict

class CreateNewCylinderWithCubes extends MonoBehaviour {

	var newObjectType: Transform[] ;
	
	static private var numberOfCylinders:int ;
	static private var cylinderVector : CylinderVector ;
	static private var ammoBoxSpawn: AmmoBoxSpawn ;
	static private var parent:Transform ;
	private static var MAX_CYLINDERS:int = 60 ;
	private var creating: boolean ; 
	static private var levelGen:LevelGeneration ;
	private static var _number:int = 0 ;
	static private var removeTeeth:RemoveTeethFromCylinder ;

	
	function Start ( )
	{
		numberOfCylinders = 0 ;
		if ( ! parent )
			parent = GameObject.Find ( "Cylinder Control").transform ;
		if ( ! cylinderVector )
			cylinderVector = GetComponent ( CylinderVector ) ;
		if ( ! levelGen )
			levelGen = GameObject. Find ( "Level Control"). GetComponent ( LevelGeneration ) ;
		if ( ! removeTeeth )
			removeTeeth = GameObject.Find ( "Cylinder Control"). GetComponent ( RemoveTeethFromCylinder ) ;
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
			removeTeeth.transformGate ( newCylinder , level ) ;
			return ;
		}

		newCylinder = Instantiate ( newObjectType[0] , position , rotation ) ;
			
		newCylinder.name = "Cylinder" + (_number) ;
		newCylinder.parent = parent ;
		++ numberOfCylinders ;

		cylinderVector.addCylinder ( newCylinder );
		

		creating = false ;
	}
	
	function FixedUpdate ()
	{
		if ( numberOfCylinders < 45 && !creating )
		{
			createCylinder ( );
		}
	} 
}