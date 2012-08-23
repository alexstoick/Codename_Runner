#pragma strict

class LoftMovement extends MonoBehaviour {
	
	static var walk:MegaWalkLoft ;
	static var layer:MegaLoftLayerSimple ;
	function Start ( )
	{
		walk = GetComponent ( MegaWalkLoft ) ;
		layer = GameObject.Find ( "Loft"). GetComponent ( MegaLoftLayerSimple ) ;
	}
	
	public static var movementVariation : double = 0.0000 ;
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
		var zero:double = 0.0000 ;
		if ( movementVariation.Equals ( zero )  )
		{
			return true ;
		}
		return false ;
	}
	
	static public function setLowSpeed ( )
	{
		movementVariation = 0.00002  ;
	}
	static public function setNormalSpeed ( )
	{
		movementVariation = 0.0003 ;
	}
	static public function setHighSpeed ( )
	{
		movementVariation = 0.0004 ;
	}
	
	static public function increaseSpeed ( )
	{
		movementVariation += 0.0001 ;
	}
	
	static public function decreaseSpeed ( )
	{
		movementVariation -= 0.0001 ;
	}
	
	function Update ( )
	{
		speed = movementVariation ;
		layer.pathStart += movementVariation  ;
		if ( movementVariation) 
			ScoreControl.addScore ( 0.1 ) ;
		
		//no longer bugging out.
		if ( layer.pathStart >= 1 )
			layer.pathStart = -1.0 ;
	}

}