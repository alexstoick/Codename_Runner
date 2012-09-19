#pragma strict

class StartButton extends MonoBehaviour {
	
	static var Started:boolean = false ;
	
	function OnGUI()
	{
		if ( Started )
			return ;

		if(GUI.Button(Rect(100, 500, 150, 150), "Start"))
		{
			Started = true ;
			GameOver.gText.text = "" ;
			LoftMovement.isDead = false ;
			GiantControl.distance = 100 ;
			LoftMovement.acceleration = 0.0000 ;
			LoftMovement.setNormalSpeed ( ) ;
		}
	}

}