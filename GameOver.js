#pragma strict

class GameOver extends MonoBehaviour {

	static var gText:GUIText ;
	
	var font28:Font ;
	var font16:Font ;
	
	function Start ( )
	{
		gText = guiText ;
		Debug.Log ( Screen.width ) ;
		if ( Screen.width > 780 )
			gText.font = font28 ;
		else
			gText.font = font16 ;
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