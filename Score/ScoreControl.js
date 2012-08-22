#pragma strict

class ScoreControl extends MonoBehaviour {

	static private var score:float = 0.0 ;
	static private var string :String = "" ;

	function Start ( ) 
	{
		guiText.text = "Score: 0 " ;
	}
	
	static public function addScore ( points : float )
	{
		score += points ;
		string = score.ToString ( "f2" ) ;
	}
	
	function Update ( )
	{
		guiText.text = "Score: " + string ;
	}

}