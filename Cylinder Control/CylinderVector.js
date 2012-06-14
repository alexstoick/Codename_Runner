#pragma strict

class CylinderVector extends MonoBehaviour 
{
	static public var Cylinder:Array = new Array (50) ;
	static public var Gate:Array = new Array ( 10 ) ;
	static public var cylinderLegth:int = 0 ;
	static public var gateLength:int = 0 ;
	
	
	public function addCylinder ( cilindru:Transform )
	{
		Cylinder.push ( cilindru ) ;
	}
	
	public function addCylinder ( cilindru:Transform , removeTeeth:boolean )
	{
		Cylinder.push ( cilindru ) ;
	}

	

}