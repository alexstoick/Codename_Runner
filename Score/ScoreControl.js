#pragma strict

class ScoreControl extends MonoBehaviour {

	static private var score:int = 0 ;
	static private var string :String = "" ;

	function Start ( ) 
	{
		guiText.text = "Score: 0 " ;
	}
	
	static public function addScore ( points : int )
	{
		score += points ;
		string = score.ToString ( ) ;
	}
	
	function Update ( )
	{
		guiText.text = "Score: " + string ;
	}

}