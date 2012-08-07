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
	private var shouldModify:boolean = false ;
	
	private var touchPositions:Array = new Array() ;
	private var timeOfTouch:Array = new Array () ;

	private var HORIZONTAL_TOUCH_LENGHT:int = 5 ;
	private var VERTICAL_TOUCH_LENGHT:int = 80 ;
	private var startingTime:double ;
	private var shouldFire:boolean = false ;

	private function touchBegan ( )	
	{
		touchPositions.push ( touch.position ) ;
		timeOfTouch.push ( Time.time ) ;
		startingTime = Time.time ;
		analyzedDuringMove = false ;
		Debug.LogError ( "began" ) ;
		shouldFire = true ;
		startFiring ( ) ;
	}
	
	function startFiring ( )
	{
		while ( shouldFire )
		{
			moveRunner.fire ( true ) ;
			yield WaitForSeconds ( 0.2 ) ;
		}
	}
	
	
	private function analyzeHorizontally ( delta:double  )
	{
		if ( (delta< -HORIZONTAL_TOUCH_LENGHT  || delta > HORIZONTAL_TOUCH_LENGHT  ) )
		{	
			
			if ( analyzedDuringMove )
				return ;
			
			if ( delta < 0 )
			{
				moveRunner.action ( "left" ) ; //left
			}
			else
				if (delta > 0 )
				{
					moveRunner.action ( "right" ) ; //right 
				}
				
			touchPositions.Clear ( ) ;
			timeOfTouch.Clear ( ) ;

			analyzedDuringMove = true ;
		}
		else
			moveRunner.fire ( true ) ;
	}
	
	private function analyzeVertically ( delta:double ) 
	{
	

		if ( (delta< - VERTICAL_TOUCH_LENGHT || delta > VERTICAL_TOUCH_LENGHT ) )
		{	
			
			if ( analyzedDuringMove )
					return ;
			Debug.LogWarning( "from vert:" + delta ) ;
			if ( delta < 0 )
			{
				moveRunner.action ( "down" ) ; //DOWN
			}
			else
				if (delta > 0 )
				{
					moveRunner.action ( "up" ) ; //UP 
				}
				
			touchPositions.Clear ( ) ;
			timeOfTouch.Clear ( ) ;
			
			analyzedDuringMove = true ;
		}


	}
	
	private function touchMoved ( )
	{
		var position:Vector2 = touch.position ;
		var time:double = Time.time ;
		touchPositions.push ( position ) ;
		timeOfTouch.push ( time ) ;
		
		var firstTouch:Vector2 = touchPositions[0] ;
		var firstTime:double = timeOfTouch[0] ;
		
		var deltaTime:double = time - firstTime ;
		var deltaX:double = position.x - firstTouch.x ;
		var	deltaY:double = position.y - firstTouch.y ;
		var ok:boolean = false ;
		
		if ( deltaX && deltaY && shouldModify ) 
		{
			var deltaXX:double = deltaX;
			var deltaYY:double = deltaY;
			
			if ( deltaX < 0)
				deltaXX *= -1 ;
			if ( deltaY < 0 )
				deltaYY *= -1 ;
				
			shouldModify = false ;
			Debug.Log ( "±±±± V:" + deltaYY + "original:" + deltaY + " H:" + deltaXX + " original:"+ deltaX + "			###" + (Time.time - startingTime) ) ;
			
			if ( deltaYY - deltaXX > 5 ) 
				HORIZONTAL_TOUCH_LENGHT = 1000 ;
			else
				HORIZONTAL_TOUCH_LENGHT = 0 ;
		}

		Debug.Log ( "V: " + deltaY + " H:" + deltaX ) ;
		analyzeVertically ( deltaY ) ;  
		analyzeHorizontally ( deltaX ) ;
	}
	
	private function touchEnded ( ) 
	{
		if ( touch.tapCount == 1 )
				moveRunner.fire ( true ) ;
		touchPositions.Clear ( ) ;
		timeOfTouch.Clear ( ) ;
		HORIZONTAL_TOUCH_LENGHT = 0 ;
		VERTICAL_TOUCH_LENGHT = 80 ;
		shouldModify =true  ;
		shouldFire = false ;
		Debug.LogError ( "ended" ) ;
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
	}
}