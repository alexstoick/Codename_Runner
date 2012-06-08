#pragma strict

class ShiftingCylinders extends MonoBehaviour {

	static private var cylinderVector:Array ;
	static private var runner:Transform ;
	static private var createNewCylinderWithCubes:CreateNewCylinderWithCubes ;
	
	function Start ( )
	{
		if ( ! cylinderVector ) 
			cylinderVector = GameObject.Find ( "Cylinder Control").GetComponent ( CylinderVector ).Cylinder ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ).transform ;
		if ( ! createNewCylinderWithCubes )
			createNewCylinderWithCubes = GameObject.Find ( "Cylinder Control").GetComponent ( CreateNewCylinderWithCubes ) ;
	}

	function Update ( )
	{
		//Debug.Log ( cylinderVector.length ) ;
		
		if ( (cylinderVector [0] as Transform ).position.z + 10 <  runner.position.z )
		{
			
			var toRemove:Transform = cylinderVector.Shift ( ) as Transform ;
			toRemove.parent = null ;
			Destroy ( toRemove.gameObject) ;
//			Debug.LogWarning ( "POPPED FRONT" ) ;
			createNewCylinderWithCubes.createCylinder ( ) ;
		}
			
		//Debug.Log ( runner.position ) ;
	}

}