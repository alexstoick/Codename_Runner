#pragma strict

class HealthProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	private var fullRect: Rect = new Rect ( 5 , 150 , 200 , 20 ) ; 
	var maxHealth: float; 
	static var currHealth: float = 100.0; 
	
	function OnGUI()
	{ 
		currHealth = Mathf.Clamp ( currHealth , 0 , 100 ) ;
		var healthFrac:float = currHealth / 100 ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * healthFrac, fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		
		if ( healthFrac == 0 )
			GameOver.Dead ( ) ;
	}
}