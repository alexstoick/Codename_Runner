#pragma strict

class CylinderVector extends MonoBehaviour 
{
	static public var Cylinder:Array = new Array () ;

	private var removeTeethFromCylinder: RemoveTeethFromCylinder ;

	public function Start ( )
	{
		if ( ! removeTeethFromCylinder )
			removeTeethFromCylinder = GetComponent ( RemoveTeethFromCylinder) ;
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