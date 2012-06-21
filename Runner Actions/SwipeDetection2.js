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
	private var analyzedDuringMove:boolean = false ;
	
	private var touchPositions:Array = new Array() ;
	private var timeOfTouch:Array = new Array () ;

	private function touchBegan ( )	
	{
		Debug.LogWarning ( "Touch began" ) ;
		touchPositions.Clear ( ) ;
		timeOfTouch.Clear ( ) ;
		touchPositions.push ( touch.position ) ;
		timeOfTouch.push ( Time.time ) ;
		analyzedDuringMove = false ;
	}
	
	private function touchMoved ( )
	{
		//Debug.Log ( "Touch moved" ) ;
		var position:Vector2 = touch.position ;
		var time:double = Time.time ;
		touchPositions.push ( position ) ;
		timeOfTouch.push ( time ) ;
		Debug.Log ( touch.position + " " + Time.time ) ;
		
		var firstTouch:Vector2 = touchPositions[0] ;
		var delta:double = position.x - firstTouch.x ;
		
		if ( delta< -50 || delta > 50 )
		{	
			if ( delta < 0 )
				moveRunner.move ( true , false ,true ) ; //left
			else
				moveRunner.move ( false , true , true ) ; //right 
				
			touchPositions.Clear ( ) ;
			timeOfTouch.Clear ( ) ;
			touchPositions.push ( position ) ;
			timeOfTouch.push ( time ) ;
			analyzedDuringMove = true ;
		}
			
	}
	
	private function touchEnded ( ) 
	{
		Debug.LogWarning ( "Touch ended" ) ;
		if ( touch.tapCount == 1 )
				moveRunner.fire ( true ) ;
		if ( ! analyzedDuringMove )
		{
			
			var firstTouch:Vector2 = touchPositions[0] ;
			var delta:double = touch.position.x - firstTouch.x ;
			
			if ( delta < 0 )
				moveRunner.move ( true , false ,true ) ; //left
			else
				if ( delta > 0 )
					moveRunner.move ( false , true , true ) ; //right 
		}
	}

	function Update() 
	{
		if ( Input.touchCount == 0 ) 
			return ;
			
		touch = Input.GetTouch ( 0 ) ;
		
		switch ( touch.phase )
		{
			case TouchPhase.Began:
				touchBegan ( ) ; break ;
			case TouchPhase.Moved:
				touchMoved ( ) ; break ;
			case TouchPhase.Ended:
				touchEnded ( ) ; break ;
		}
		
		
		
	/*    if ( Input.GetTouch(0).phase == TouchPhase.Moved) 
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
		*/

	}
}