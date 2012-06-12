#pragma strict

class LevelModifierButton extends MonoBehaviour {

	static private var getLvl:GetLevels ;
	
	function Start ( )
	{
		if ( ! getLvl )
			getLvl = GameObject.Find ( "Level Control"). GetComponent ( GetLevels ) ;
	}
	
	function OnGUI()
	{
		if(GUI.Button(new Rect(10, 50, 70, 35), "Change"))
			getLvl.newLevel ( ) ;
	}

	

}