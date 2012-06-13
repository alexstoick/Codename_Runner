#pragma strict
/*
class InputTouches_Listener extends MonoBehaviour {

	
	private var moveRunner:MoveRunner ;
	function Start ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ).GetComponent ( MoveRunner ) ;
	}
			
	function OnEnable(){
		Gesture.onSwipeE += onSwipe;
	}
	
	function OnDisable(){
		Gesture.onSwipeE -= onSwipe;
	}

	function onSwipe ( swipeInfo:SwipeInfo )	
	{
		Debug.LogWarning ( "Input.Touches swipe" ) ; 
		
		if ( swipeInfo.direction.x > 0 )
		{
			moveRunner.move ( false , true , true ) ;
			Debug.LogWarning ( "called swipe right" + Time.time ) ;
		}
		else
		{
			moveRunner.move ( true , false , true ) ;
			Debug.LogWarning ( "called swipe left" + Time.time) ;
		}
	}
}*/