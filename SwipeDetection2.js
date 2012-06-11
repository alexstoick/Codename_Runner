#pragma strict
class SwipeDetection2 extends MonoBehaviour {
	static private var moveRunner:MoveRunner ;
	
	function Start () 
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ). GetComponent ( MoveRunner ) ;
	}
	var Velocity_X:float;

	var lastId:int = -1 ;
	var haveToAnalyze:boolean = false ;
	private var touches:Array = new Array ( );
	private var ids:Array = new Array ( ) ;

	
	function Update() 
	{
		if ( Input.touchCount == 0 ) 
			return ;
			
	    if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved) 
	    {
    		var touch:Touch ;
			var id:int = Time.int ;
			
	    	touch = Input.GetTouch(0);
	    	touches.push ( touch ) ;
	    	ids.push ( id ) ;
	    	
	    	
			Velocity_X = touch.deltaPosition.x / touch.deltaTime;
			Debug.Log ( touch.fingerId ) ;
	    }
	    
	    if ( Input.GetTouch(0).phase == TouchPhase.Ended ) //haveToAnalyze ) //&& lastId != touch.fingerId )
	    {
			lastId = touch.fingerId ; 
			haveToAnalyze = false ;
				    
	    	Debug.Log ( Velocity_X ) ;
	    	
	    	if ( Velocity_X > 0 )
	    		moveRunner.move ( false , true , true ) ;
	    	else
	    		if ( Velocity_X < 0)
	    			moveRunner.move ( true , false , true ) ;
	    		else
	    			moveRunner.fire ( true ) ;
	    	Velocity_X = 0 ;
	    }
		/*if ( In)
		if ( Velocity )
	    {
	    	Debug.LogWarning ( "move right" + Time.time ) ;
	    	moveRunner.move ( false , true , true ) ;
	    }
	    else
	    {
	    	Debug.LogWarning ( "move left" + Time.time ) ;
 	    	moveRunner.move ( true , false , true ) ;
		}
		*/
	}
}