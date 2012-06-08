#pragma strict

class CylinderVector extends MonoBehaviour 
{
	var firstCylinder: Transform ;
	static public var Cylinder:Array = new Array () ;

	private var removeTeethFromCylinder: RemoveTeethFromCylinder ;
	private var teethPositions: TeethPositions ;

	public function Start ( )
	{
		removeTeethFromCylinder = GetComponent ( RemoveTeethFromCylinder) ;
		teethPositions = GetComponent ( TeethPositions ) ;
		
		teethPositions.saveTeethPositions ( firstCylinder ) ;
		
	//	Cylinder.push ( firstCylinder ) ;
	//	removeTeethFromCylinder.removeTeeth ( firstCylinder ) ;
	}
	
	public function addCylinder ( cilindru:Transform )
	{
		Cylinder.push ( cilindru ) ;
		removeTeethFromCylinder.removeTeeth ( cilindru ) ;
	}
	
	public function addCylinder ( cilindru:Transform , removeTeeth:boolean )
	{
		Cylinder.push ( cilindru ) ;
	}

	

}