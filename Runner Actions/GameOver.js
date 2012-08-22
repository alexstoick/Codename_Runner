#pragma strict

class GameOver extends MonoBehaviour {

	static var gText:GUIText ;
	
	function Start ( )
	{
		gText = guiText ;
	}
	
	static function Dead ( )
	{
		LoftMovement.Stop ( ) ;
		StartButton.Started = false ;
		gText.text = "Game Over !" ;
	}
}