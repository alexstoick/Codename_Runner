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
		LoftMovement.isDead = true ;
		StartButton.Started = false ;
		if ( GameObject.Find ( "CrosshairPlane") )
			GameObject.Find ( "CrosshairPlane").SetActiveRecursively(false);
		gText.text = "Game Over !" ;
	}
}