#pragma strict
class SwipeDetection2 extends MonoBehaviour {

	static private var moveRunner:MoveRunnerNew ;
	//Used to change the distance when touch starts.
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
	//Stores the current touch
	private var touch:Touch;

	//Array for touch positions	
	private var touchPositions:Array = new Array() ;
	//Array for the time of touch
	private var timeOfTouch:Array = new Array () ;

	//Wether we should go down or up.
	private var altitudeModifier:double = 0.0 ;

	//If there is a touch active
	private var touchActive:boolean = false ;

	//Used to track the time between two following shoots of the miniturrets
	private var lastTime:double = 0.0 ;
	
	//Constants
	//If the length of the horizontal swipe is lower than this it is ignored.
	private var HORIZONTAL_TOUCH_LENGTH:int = 25 ;

	//If the length of the vertical swipe is lower than this it is ignored.
	private var VERTICAL_TOUCH_LENGTH:int = 80 ;

	//What goes over this will be counted towards another move,
	//so that if the move is quick enough, there will be several movements
	//towards left or right.
	private var VELOCITY_THRESHOLD:int = 1500 ;
	

	private function touchBegan ( )	
	{
		//Adds the current time & touch position to the vector. 
		touchPositions.push ( touch.position ) ;
		timeOfTouch.push ( Time.time ) ;
		touchActive = true ;
		modifyAltitude ( ) ;
	}
	
	function modifyAltitude ( ) //Changes the modifier for the altitude.
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
			
			if ( delta < 0 )
			{
				moveRunner.action ( "left" ) ;
				//Velocity is negative towards left, therefore we make it positive,
				//to be able to use it more easier.
				velocity *= -1 ;
				if ( velocity > VELOCITY_THRESHOLD )
				{
					lim = ( velocity / VELOCITY_THRESHOLD ) ;
					//What goes over the velocity threshold is a new move.
					for ( extra = 0 ; extra < lim ; ++ extra )
					{
						moveRunner.action ( "left" ) ;
					}
				}
			}
			else
				if (delta > 0 )
				{
					moveRunner.action ( "right" ) ;
					if ( velocity > VELOCITY_THRESHOLD )
					{
						lim = velocity / VELOCITY_THRESHOLD  ;
						//What goes over the velocity threshold is a new move.
						for ( extra = 0 ; extra < lim ; ++ extra )
						{
							moveRunner.action ( "right" ) ;
						}
					}
				}

			//Clearing the existing positions&time;
			//Getting ready for a new TouchEvent.Move
			touchPositions.Clear ( ) ;
			timeOfTouch.Clear ( ) ;
		}
	}
	
	//Not used.
	private function analyzeVertically ( delta:double ) 
	{
	

		if ( (delta< - VERTICAL_TOUCH_LENGTH || delta > VERTICAL_TOUCH_LENGTH ) )
			if ( delta < 0 )
			{
				//Down
			}
			else
				if (delta > 0 )
				{
					//Up 
				}
	}
	

	private function touchMoved ( )
	{
		//Calculates the time between the start of the gesture and now
		//Also calculates the distance that was traveled.
		var position:Vector2 = touch.position ;
		var time:double = Time.time ;

		touchPositions.push ( position ) ;
		timeOfTouch.push ( time ) ;
		
		var firstTouch:Vector2 = touchPositions[0] ;
		var firstTime:double = timeOfTouch[0] ;
		
		var deltaTime:double = time - firstTime ;
		var deltaX:double = position.x - firstTouch.x ;
		var	deltaY:double = position.y - firstTouch.y ;

		analyzeVertically ( deltaY ) ;  //DOES NOTHING
		analyzeHorizontally ( deltaX , deltaTime ) ;
	}
	
	private function touchEnded ( ) 
	{
		//Clear all time & positions, reset the altitudeModifier.
		touchPositions.Clear ( ) ;
		timeOfTouch.Clear ( ) ;
		touchActive = false ;
		altitudeModifier = -0.007 ;
	}

	function FireGuns ( )
	{
		if ( lastTime > Time.time )
			return ;
			
		lastTime = Time.time + 0.2 ;
		
		//If the rocket button is not touched go back.
		if ( shootRocket.HitTest ( Input.touches[1].position ) )
			return ;
		
		//If the cooldown has been reached, do not shoot.
		if ( ( FireProgressBar.targetCooldown + 0.3125*2 ) > 10 && ! Controller.bossIsSpawned )
			return ;	

		//Shoot the miniturrets.
		leftShooter.FireGun ( ) ;
		rightShooter.FireGun ( ) ;
	}

	function Update() 
	{
		if ( ! MoveRunnerNew.doingLoop )
		{
			//If not doing a loop, clamp the plane local rotation.
			//Also modify the altitute & clamp it.
			plane.localPosition.y += altitudeModifier ;
			plane.localPosition.y = Mathf.Clamp ( plane.localPosition.y , 0 , 1 ) ;
			plane.localRotation.eulerAngles.z  += -1*altitudeModifier*100 ;
			plane.localRotation.eulerAngles.z = Mathf.Clamp ( plane.localRotation.eulerAngles.z , 150 , 180 ) ;
		}

		if ( Input.touchCount == 0 )		
			return ;

		//If 2 fingers on the screen fire miniturrets.
		if ( Input.touchCount == 2)		
		{
			FireGuns ( ) ;
		}

		//Analyze the first finger on the screen.
			
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