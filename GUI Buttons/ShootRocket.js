#pragma strict

class ShootRocket extends MonoBehaviour {
	
	var moveRunner:MoveRunnerNew ;
	
	function Awake ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
	}
	
	function OnGUI()
	{
	
		var width = Screen.width ;
		var height = Screen.height ;
		Debug.Log ( width + "		" + height ) ;
		
		if(GUI.Button(Rect(0, height-100 , width/3 , 100 ), "Start"))
		{
			moveRunner.fire ( true ) ;
		}
	}

}