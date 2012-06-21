#pragma strict

class StartButton extends MonoBehaviour {
	
	static private var Started:boolean = false ;
	
	static private var moveRunner:MoveRunner ;
	
	function Start ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject. Find ( "BigGroup"). GetComponent ( MoveRunner ) ;
	}

	
	function OnGUI()
	{
		if ( Started )
			return ;

		if(GUI.Button(Rect(100, 500, 150, 150), "Start"))
		{
			Started = true ;
			moveRunner.movementVariation = 0.2 ;
		}
	}

}