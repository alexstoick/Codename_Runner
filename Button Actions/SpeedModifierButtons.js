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
		if(GUI.Button(Rect(10, 50, 35, 35), "+"))
			moveRunner.movementVariation += 0.1 ;
		if(GUI.Button(Rect(50, 50, 35, 35), "-"))
			moveRunner.movementVariation -= 0.1 ;
	}

}