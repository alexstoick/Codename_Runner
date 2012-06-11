#pragma strict
class SwipeDetection extends MonoBehaviour {


	var  swipeThresh      :    float  =   1.2;
	private var  swipeStart       :  Vector2  =   Vector2.zero;
	private var  swipeEnd         :  Vector2  =   Vector2.zero;
	private var  swipeWasActive   :  boolean  =   false;
	
	static private var moveRunner:MoveRunner ;
	
	function Start () 
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ). GetComponent ( MoveRunner ) ;
	}
	
	function Update ()
	{
	    if ( Input.touchCount == 1 ) {
	        processSwipe();
	    }
	}
	
	function processSwipe ()
	{
		Debug.Log ( "processing swipe") ;
	    if ( Input.touchCount != 1 ) {
	        return;
	    }
	
	    var theTouch : Touch = Input.touches[0];
	
	    /* skip the frame if deltaPosition is zero */
	
	    if ( theTouch.deltaPosition == Vector2.zero ) {
	        return;
	    }
	
	    var speedVec : Vector2 = theTouch.deltaPosition * theTouch.deltaTime;
	    var theSpeed :   float = speedVec.magnitude;
	
	    var swipeIsActive : boolean = ( theSpeed > swipeThresh );
	
	    if ( swipeIsActive ) {
	
	        if ( ! swipeWasActive ) {
	            swipeStart = theTouch.position;
	        }
	    }
	
	    else {
	
	        if ( swipeWasActive ) {
	            swipeEnd = theTouch.position;
	            SwipeEnded ( );
	        }
	    }
	
	    swipeWasActive = swipeIsActive;
	}
	
	function SwipeEnded ()
	{
		Debug.Log ( "Swipe Detection 1.0" ) ;
		if ( swipeEnd == Vector2.zero )
			return ;
		var st:Vector2 = swipeStart ;
		var sf:Vector2 = swipeEnd ;
		swipeStart = swipeEnd = Vector2.zero ;

	    if ( st.x < sf.x )
	    {
	    	Debug.LogWarning ( "move right" + Time.time ) ;
	    	moveRunner.move ( false , true , true ) ;
	    }
	    else
	    {
	    	Debug.LogWarning ( "move left" + Time.time ) ;
 	    	moveRunner.move ( true , false , true ) ;
		}
	}
	
}