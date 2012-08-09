#pragma strict

class StartButton extends MonoBehaviour {
	
	static var Started:boolean = false ;
	
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
			GameOver.gText.text = "" ;
			HealthBar.percentage = -25 ;
			HealthBar.UpdateHealthBar ( ) ;
			moveRunner.setNormalSpeed ( ) ;
		}
	}

}