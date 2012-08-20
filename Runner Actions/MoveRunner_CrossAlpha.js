#pragma strict
class MoveRunner_CrossAlpha extends MonoBehaviour {
	
	static private var movementVariation = 0.0 ;
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static private var sphereGroup:Transform ;
	static private var lastTime:double; 
	static private var runner:GameObject ;
	static private var walkLoft:MegaWalkLoft ;
	static private var shouldMove:boolean ;
	
	var materials:Material[] ;
	
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
		movementVariation = 0.1 ;
	}
	static public function setNormalSpeed ( )
	{
		movementVariation = 0.2 ;
	}
	static public function setHighSpeed ( )
	{
		movementVariation = 0.4 ;
	}
	static public function increaseSpeed ( )
	{
		movementVariation += 0.1 ;
	}
	static public function decreaseSpeed ( )
	{
		movementVariation -= 0.1 ;
	}
	private function activateBash ( )
	{
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		CollisionHandler.bashOn = true ;
		renderer.material = materials[1] ;
		setHighSpeed () ;
		yield WaitForSeconds ( 0.4 ) ;
		setNormalSpeed ( );
		yield WaitForSeconds ( 1.6 ) ;
		renderer.material = materials[0] ;
		CollisionHandler.bashOn = false ;
		//to be implemented

	}
	private function slowdown ( )
	{
		//to be implemented
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		renderer.material = materials[2] ;
		movementVariation /= 2 ;
		yield WaitForSeconds ( 2.0 ) ;
		renderer.material = materials[0] ;
		movementVariation *= 2 ;
	}

	var targetCross:double = 0.0;
	
	function Start ( )
	{
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ) ;
		if ( ! walkLoft )
		{
			walkLoft = GameObject.Find ( "walker" ).GetComponent ( MegaWalkLoft ) ;
			targetCross = walkLoft.crossalpha ;
		}
	}
	
	public function action ( act:String )
	{
		switch ( act )
		{
			case "left": move ( true ) ; break ;
			case "right": move ( false ) ; break ;
			case "up": activateBash ( ); break ;
			case "down": slowdown ( ) ; break ;
		}
	}
	
	
	private function move ( left:boolean )
	{
		var angle:int ;	
		
		if ( lastTime == Time.time )
		{
			Debug.LogError ( "refused move; time: " + Time.time ) ;
			return ;
		}
			
		lastTime = Time.time;
		
		if ( left )
		{
			targetCross -= 0.041 ;
			shouldMove = true ;
		}
		else
		{
			targetCross += 0.041 ;
			shouldMove = true ;
		}
	}
	
	function Update ( )
	{
		if ( Input.GetKeyDown ( KeyCode.LeftArrow) )
			action ( "left") ;
		if ( Input.GetKeyDown ( KeyCode.RightArrow) )
			action ( "right" ) ;
		if ( shouldMove )
		{
			if ( walkLoft.crossalpha != targetCross )
			{
				walkLoft.crossalpha = Mathf.Lerp( walkLoft.crossalpha , targetCross , Mathf.Sin( 0.04 * Mathf.PI * 0.5) ); 
			}
			else
				shouldMove = false ;
		}
		
	}
	
	
	function jump ( useTime : boolean )
	{
		if ( useTime && lastTime == Time.time )
			return ;
			
		lastTime = Time.time;
	}
	
	function fire ( useTime:boolean )
	{
		if ( useTime && lastTime == Time.time )
			return ;
			
		lastTime = Time.time;
	}
}