#pragma strict

class LoftMovement extends MonoBehaviour {
	
	static var walk:MegaWalkLoft ;
	static var layer:MegaLoftLayerSimple ;
	function Start ( )
	{
		walk = GetComponent ( MegaWalkLoft ) ;
		layer = GameObject.Find ( "Loft"). GetComponent ( MegaLoftLayerSimple ) ;
	}
	
	public static var movementVariation : double = 0.0001 ;
	var speed:double ;
	
	static public function position ( )
	{
		return layer.pathStart ;
	}
		
	static public function Stop ( )
	{
		movementVariation = 0 ;
	}
	
	static public function isStopped ( )
	{
		return movementVariation == 0 ;
	}
	
	static public function setLowSpeed ( )
	{
		movementVariation = 0.00005  ;
	}
	static public function setNormalSpeed ( )
	{
		movementVariation = 0.00015 ;
	}
	static public function setHighSpeed ( )
	{
		movementVariation = 0.00025 ;
	}
	
	static public function increaseSpeed ( )
	{
		movementVariation += 0.00005 ;
	}
	
	static public function decreaseSpeed ( )
	{
		movementVariation -= 0.00005 ;
	}
	
	function Update ( )
	{
		speed = movementVariation ;
		layer.pathStart += movementVariation  ;
		
		//no longer bugging out.
		if ( layer.pathStart >= 1 )
			layer.pathStart = -1.0 ;
	}

}