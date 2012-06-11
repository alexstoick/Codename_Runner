#pragma strict
class InputTouches_Listener extends MonoBehaviour {

	
	private var moveRunner:MoveRunner ;
	function Start ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ).GetComponent ( MoveRunner ) ;
	}
			
	function OnEnable(){
//		Gesture.onSwipeE += onSwipe;
		Gesture.onDoubleTapE += onShortTap ;
	}
	
	function OnDisable(){
//		Gesture.onSwipeE -= onSwipe;
		Gesture.onDoubleTapE -= onShortTap ;
	}

/*	function onSwipe ( swipeInfo:SwipeInfo )	
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
	}*/
	function  onShortTap ( pos:Vector2 )
	{
		Debug.LogWarning ( "long tap" ) ;
	//	moveRunner.fire ( false );
	}
}