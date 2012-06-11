#pragma strict
class SwipeDetection2 extends MonoBehaviour {

	static private var moveRunner:MoveRunner ;
	
	function Start () 
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ). GetComponent ( MoveRunner ) ;
	}
	
	private var Velocity_X:float;

	private var touch:Touch;
	private var moved:boolean ;
	private var lastVelocity:float;
	private var init:boolean = false ;

	function Update() 
	{
		if ( Input.touchCount == 0 ) 
			return ;
		
	    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) 
	    {
			
	    	touch = Input.GetTouch ( 0 ) ;

			Velocity_X = touch.deltaPosition.x / touch.deltaTime;
			if ( ! init )
			{
				lastVelocity = Velocity_X * -1 ;
				init = true ;
			}
				
			if ( ( Velocity_X < 0 && lastVelocity > 0 ) || (Velocity_X > 0 && lastVelocity < 0 ) )
			{
				if ( Velocity_X > 0 )
		    		moveRunner.move ( false , true , true ) ;
		    	else
		    		if ( Velocity_X < 0)
		    			moveRunner.move ( true , false , true ) ;
				lastVelocity = Velocity_X ;
			}
	    }
		if ( Input.GetTouch(0).phase == TouchPhase.Ended )
		{
			init = false ;
			if ( Input.GetTouch(0).tapCount == 1 )
				moveRunner.fire ( true ) ;
		}

	}
}