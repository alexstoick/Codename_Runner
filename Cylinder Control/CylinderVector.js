#pragma strict

class CylinderVector extends MonoBehaviour 
{
	static public var Cylinder:Array = new Array () ;
	
	public function addCylinder ( cilindru:Transform )
	{
		Cylinder.push ( cilindru ) ;
	}
	
	public function addCylinder ( cilindru:Transform , removeTeeth:boolean )
	{
		Cylinder.push ( cilindru ) ;
	}

	

}