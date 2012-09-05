#pragma strict
class SwipeDetection2 extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;
	
	function Start () 
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ). GetComponent ( MoveRunnerNew ) ;
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

	private var startingTime:double ;
	private var shouldFire:boolean = false ;
	static public var continuousFire:boolean = false ;
	
	//consts	
	private var HORIZONTAL_TOUCH_LENGTH:int = 25 ;
	private var VERTICAL_TOUCH_LENGTH:int = 80 ;
	private var VELOCITY_THRESHOLD:int = 1500 ;


	private function touchBegan ( )	
	{
		touchPositions.push ( touch.position ) ;
		timeOfTouch.push ( Time.time ) ;
		startingTime = Time.time ;
		analyzedDuringMove = false ;
		Debug.LogError ( "began" ) ;
	}
	
	function startFiring ( )
	{
		while ( shouldFire )
		{
			moveRunner.fire ( true ) ;
			yield WaitForSeconds ( 0.2 ) ;
		}
	}
	
	
	private function analyzeHorizontally ( delta:double , deltaTime:double )
	{

		if ( (delta< -HORIZONTAL_TOUCH_LENGTH  || delta > HORIZONTAL_TOUCH_LENGTH  ) )
		{	
			
 			var velocity:double = delta/deltaTime ;
			
			if ( delta < 0 )
			{
				Debug.Log ( "±±±±±LEFT	: " + delta + " ; time: " + deltaTime + "			velocity: " + velocity ) ;

				moveRunner.action ( "left" ) ;
				if ( velocity > VELOCITY_THRESHOLD )
				{
					for ( var extra = 0 ; extra < velocity / VELOCITY_THRESHOLD ; ++ extra )
						moveRunner.action ( "left" ) ;
				}
			}
			else
				if (delta > 0 )
				{
					Debug.Log ( "±±±±RIGHT	: " + delta + " ; time: " + deltaTime + "			velocity: " + velocity ) ;
					
					moveRunner.action ( "right" ) ;
					if ( velocity > VELOCITY_THRESHOLD )
					{
						for ( extra = 0 ; extra < velocity / VELOCITY_THRESHOLD ; ++ extra )
							moveRunner.action ( "right" ) ;
					}
				}
				
			touchPositions.Clear ( ) ;
			timeOfTouch.Clear ( ) ;

			analyzedDuringMove = true ;
		}
	}
	
	private function analyzeVertically ( delta:double ) 
	{
	

		if ( (delta< - VERTICAL_TOUCH_LENGTH || delta > VERTICAL_TOUCH_LENGTH ) )
		{	
			
//			if ( analyzedDuringMove )
//					return ;
			Debug.LogWarning( "from vert:" + delta ) ;
			if ( delta < 0 )
			{
				moveRunner.action ( "down" ) ;
			}
			else
				if (delta > 0 )
				{
					moveRunner.action ( "up" ) ; 
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

		if ( continuousFire && ! shouldFire )
		{
			shouldFire = true ;
			startFiring ( ) ;
		}

		
		if ( deltaX && deltaY && shouldModify ) 
		{
			var deltaXX:double = deltaX;
			var deltaYY:double = deltaY;
			
			if ( deltaX < 0)
				deltaXX *= -1 ;
			if ( deltaY < 0 )
				deltaYY *= -1 ;
				
			shouldModify = false ;
//			Debug.Log ( "±±±± V:" + deltaYY + "original:" + deltaY + " H:" + deltaXX + " original:"+ deltaX + "			###" + (Time.time - startingTime) ) ;
			
/*
			if ( deltaYY > 5 ) 
				HORIZONTAL_TOUCH_LENGTH = 1000 ;
			else
				HORIZONTAL_TOUCH_LENGTH = 0 ;
*/
		}

//		Debug.Log ( "V: " + deltaY + " H:" + deltaX ) ;
		analyzeVertically ( deltaY ) ;  
		analyzeHorizontally ( deltaX , deltaTime ) ;
	}
	
	private function touchEnded ( ) 
	{
		if ( touch.tapCount >= 1 )
				moveRunner.fire ( true ) ;
		touchPositions.Clear ( ) ;
		timeOfTouch.Clear ( ) ;
//		HORIZONTAL_TOUCH_LENGTH = 0 ;
//		VERTICAL_TOUCH_LENGTH = 80 ;
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