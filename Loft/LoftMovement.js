#pragma strict

class LoftMovement extends MonoBehaviour {
	
	static var walk:MegaWalkLoft ;
	static var layer:MegaLoftLayerSimple ;
	function Start ( )
	{
		walk = GetComponent ( MegaWalkLoft ) ;
		layer = GameObject.Find ( "Loft"). GetComponent ( MegaLoftLayerSimple ) ;
	}
	
	public static var acceleration:double = 0.0000 ;
	public static var movementVariation : double = 0.0000 ;
	public static var timeModifier:double = 0.5 ;
	private var speed:double ;
	private var lastTime:double = 0 ;
	
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
		if (  - 0.00001 < movementVariation && movementVariation < 0.00001 )
		{
			return true ;
		}
		return false ;
	}
	
	static public function setLowSpeed ( )
	{
		movementVariation = 0.00002 + acceleration ;
	}
	static public function setNormalSpeed ( )
	{
		movementVariation = 0.0003 + acceleration ;
	}
	static public function setHighSpeed ( )
	{
		movementVariation = 0.0004 + acceleration ;
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
		
		if ( ! isStopped () && lastTime + timeModifier < Time.time )
		{
			
			if ( acceleration < 0.0010 )
			{
				acceleration += 0.000015 ;
				Debug.Log ( "accelerated:" + movementVariation + acceleration ) ;
			}
			else
			{
				acceleration += 0.00001 ;
				timeModifier += 10 ;
			}
			lastTime = Time.time ;
		}
		
		speed = movementVariation + acceleration ;
		layer.pathStart += ( movementVariation + acceleration ) ;
		if ( movementVariation) 
			ScoreControl.addScore ( 0.5) ;
		
		//no longer bugging out.
		if ( layer.pathStart >= 1 )
			layer.pathStart = -1.0 ;
	}

}