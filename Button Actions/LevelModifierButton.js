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
		if(GUI.Button(Rect(10, 90, 70, 35), "Change"))
			getLvl.newLevel ( ) ;
	}

	

}