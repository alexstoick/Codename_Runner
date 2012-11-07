#pragma strict
class SwipeDetection2 extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;
	static private var plane:Transform ;
	static private var leftShooter:PlaneShootForward ;
	static private var rightShooter:PlaneShootForward ;	
	static private var shootRocket:GUITexture ;

			
	function Start () 
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ). GetComponent ( MoveRunnerNew ) ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
		if ( ! leftShooter )
			leftShooter = GameObject.Find ( "planeShooter left").GetComponent ( PlaneShootForward ) ;
		if ( ! rightShooter )
			rightShooter = GameObject.Find ( "planeShooter right").GetComponent ( PlaneShootForward ) ;
		if ( ! shootRocket )
			shootRocket = GameObject.Find ( "Shoot Rocket").GetComponent ( GUITexture ) ;
	}
	
	private var Velocity_X:float;
	private var touch:Touch;
	private var newTouch:Touch ;
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
	private var altitudeModifier:double = 0.0 ;
	private var touchActive:boolean = false ;
	private var lastTime:double = 0.0 ;
	
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
		touchActive = true ;
		modifyAltitude ( ) ;
	}
	
	function modifyAltitude ( )
	{
		yield WaitForSeconds (0.7) ;
		if ( touchActive )
		altitudeModifier = 0.007 ;
	}
	
	private function analyzeHorizontally ( delta:double , deltaTime:double )
	{
		var extra : int = 0 ;
		if ( (delta< -HORIZONTAL_TOUCH_LENGTH  || delta > HORIZONTAL_TOUCH_LENGTH  ) )
		{	
			
 			var velocity:double = delta/deltaTime ;
 			var lim:int ;
 			var nr:int = 0 ;
			
			if ( delta < 0 )
			{
				moveRunner.action ( "left" ) ;
				velocity *= -1 ;
				nr = 0 ;
				if ( velocity > VELOCITY_THRESHOLD )
				{
					lim = ( velocity / VELOCITY_THRESHOLD ) ;
					for ( extra = 0 ; extra < lim ; ++ extra )
					{
						moveRunner.action ( "left" ) ;
						++nr ;
					}
				}
			}
			else
				if (delta > 0 )
				{
					moveRunner.action ( "right" ) ;
					nr = 0;
					if ( velocity > VELOCITY_THRESHOLD )
					{
						lim = velocity / VELOCITY_THRESHOLD  ;
						for ( extra = 0 ; extra < lim ; ++ extra )
						{
							moveRunner.action ( "right" ) ;
							++nr ;
						}
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

		if ( deltaX && deltaY && shouldModify ) 
		{
			var deltaXX:double = deltaX;
			var deltaYY:double = deltaY;
			
			if ( deltaX < 0)
				deltaXX *= -1 ;
			if ( deltaY < 0 )
				deltaYY *= -1 ;
				
			shouldModify = false ;
		}

		analyzeVertically ( deltaY ) ;  
		analyzeHorizontally ( deltaX , deltaTime ) ;
	}
	
	private function touchEnded ( ) 
	{
		touchPositions.Clear ( ) ;
		timeOfTouch.Clear ( ) ;
		touchActive = false ;
		shouldModify =true  ;
		shouldFire = false ;
		altitudeModifier = -0.007 ;
	}

	function FireGuns ( )
	{
		if ( lastTime > Time.time )
			return ;
			
		lastTime = Time.time + 0.1 ;
		
		if ( shootRocket.HitTest ( Input.touches[1].position ) )
			return ;
		
		if ( ( FireProgressBar.currCooldown + 0.3125*2 ) > 10 && ! Controller.bossIsSpawned )
			return ;	
		leftShooter.FireGun ( ) ;
		rightShooter.FireGun ( ) ;
	}

	function Update() 
	{
		if ( ! MoveRunnerNew.doingLoop )
		{
			plane.localRotation.eulerAngles.z  += -1*altitudeModifier*100 ;
			plane.localPosition.y += altitudeModifier ;
			plane.localRotation.eulerAngles.z = Mathf.Clamp ( plane.localRotation.eulerAngles.z , 150 , 180 ) ;
			plane.localPosition.y = Mathf.Clamp ( plane.localPosition.y , 0 , 1 ) ;
		}

		if ( Input.touchCount == 0 )		
			return ;

		if ( Input.touchCount == 2)		
		{
			FireGuns ( ) ;
		}
			
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