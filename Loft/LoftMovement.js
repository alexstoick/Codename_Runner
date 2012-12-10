#pragma strict

class LoftMovement extends MonoBehaviour {
	
	//The WalkLoft script attached to the BigGroup that is used to go along the loft.
	static var walk:MegaWalkLoft ; 
	//The layer on which the movement is done.
	static var layer:MegaLoftLayerSimple ;
	
	function Start ( )
	{
		walk = GetComponent ( MegaWalkLoft ) ;
		layer = GameObject.Find ( "Loft"). GetComponent ( MegaLoftLayerSimple ) ;
	}

	//Accelaration, which increases over time.
	public static var acceleration:double = 0.0000 ;

	//No longer used; but can be increased when level up.
	//Was used with bash / slowdown.
	public static var movementVariation : double = 0.0000 ;

	//The time between 2 increases of the acceleration.
	public static var timeModifier:double = 0.5 ;

	//The last time the acceleration has increased.
	private var lastTime:double = 0 ;

	//Does what is expected.
	public static var isDead:boolean = false ;

	//Static link to the layer's current path.
	public static var currPath:double = 0.0 ;
	
	//Stops the movement.
	static public function Stop ( )
	{
		acceleration = 0.0000 ;
		movementVariation = 0 ;
	}
	
	static public function isStopped ( )
	{
		//due to float variables not being exactly 0 we need to do a fine interval.
		if (  - 0.00001 < movementVariation && movementVariation < 0.00001 )
		{
			return true ;
		}
		return false ;
	}
	
	//Was used for the pushback method.
	static public function setNegativeSpeed ( )
	{
		if ( isDead )
			return ;
		acceleration = 0.0000 ;
		movementVariation = - 0.0003 ;
	}

	//Was used for the slowdown method.
	static public function setLowSpeed ( )
	{
		if ( isDead )
			return ;
		movementVariation = 0.0001 ;
	}

	//Setting normal speed.
	static public function setNormalSpeed ( )
	{
		if ( isDead )
			return ;

		movementVariation = 0.0003 ; 
	}

	//Was used for the bash function.
	static public function setHighSpeed ( )
	{
		if ( isDead )
			return ;		
		movementVariation = 0.0005 ; 
	}
	
	//On PC when upkey is pressed increasing speed.
	static public function increaseSpeed ( )
	{	
		movementVariation += 0.0001 ;
	}
	
	//On PC when downkey is pressed decreasing speed.
	static public function decreaseSpeed ( )
	{	
		movementVariation -= 0.0001 ;
	}
	
	function Update ( )
	{
		
		//Increasing acceleration.
		if ( ! isStopped () && lastTime + timeModifier < Time.time )
		{
			
			if ( acceleration < 0.0003 )
			{
				acceleration += 0.000015 ;
			}
			else
			{
				//If has surpassed 0.0003 we increase the time so now the acceleration
				//goes up slower and with more delay between updates.
				acceleration += 0.00001 ;
				timeModifier = 5 ;
			}
			lastTime = Time.time ;
		}
		
		//Moving the layer.
		layer.pathStart += ( movementVariation + acceleration ) ;
		
		
		if ( movementVariation) 
			ScoreControl.addScore ( 0.5) ;
		
		if ( layer.pathStart >= 1 )
			layer.pathStart = -1.0 ;
		
		currPath = layer.pathStart ;
	}

}