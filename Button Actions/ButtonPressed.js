#pragma strict
class ButtonPressed extends MonoBehaviour {
	
	static private var moveRunner:MoveRunner ;
	function Start ( )
	{
		if ( !moveRunner )
			moveRunner = GameObject.Find ( "BigGroup" ).GetComponent ( MoveRunner ) ;
	}

	function MouseDown ( ) //OnMouseDown - computer; MouseDown - iOS
	{
//		Debug.LogWarning ( "in mouseDown") ;
		switch ( transform.name )
		{
			case "rightButton":
				moveRunner.move ( false , true ) ;
				break ;
			case "leftButton": 
				moveRunner.move ( true , false ) ;
				break ;
			case "jumpButton": 
				moveRunner.jump ( ) ;
				break ;
			case "fireButton":
				moveRunner.fire ( ) ;
				break;
		}
	}
}