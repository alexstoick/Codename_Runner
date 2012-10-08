#pragma strict

class ShootRocket extends MonoBehaviour {
	
	var moveRunner:MoveRunnerNew ;
	static var width:int ;
	static var height:int ;
	
	function Awake ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
		width = Screen.width ;
		height = Screen.height ;
	}
	
	function OnGUI()
	{
		if(GUI.Button(Rect(0, height-100 , width/3 , 100 ), "SHOOT!"))
		{
			moveRunner.fire ( true ) ;
		}
	}

}