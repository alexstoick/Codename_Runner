#pragma strict

class GameOver extends MonoBehaviour {

	static var gText:GUIText ;
	
	function Start ( )
	{
		gText = guiText ;
	}
	
	static function Dead ( )
	{
		LoftMovement.acceleration = 0.0000 ;
		LoftMovement.Stop ( ) ;
		LoftMovement.isDead = true ;
		StartButton.Started = false ;
		gText.text = "Game Over !" ;
	}
}