#pragma strict
class SpeedModifierButtons extends MonoBehaviour {
	
	static private var moveRunner:MoveRunner ;
	
	function Start ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject. Find ( "BigGroup"). GetComponent ( MoveRunner ) ;
	}
	
	function OnGUI()
	{
		if(GUI.Button(Rect(10, 50, 70, 70), "+"))
			LoftMovement.increaseSpeed() ;
		if(GUI.Button(Rect(100, 50, 70, 70), "-"))
			LoftMovement.decreaseSpeed ( ) ;
	}

}