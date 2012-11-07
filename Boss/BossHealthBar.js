#pragma strict

class BossHealthBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	
	private var fullRect: Rect = new Rect ( Screen.width/2 - Screen.width/6 , Screen.height/8  - Screen.height/50 , Screen.width/3 , Screen.height/25 ) ; 
	static var currHealth: float = 100.0; 
	
	function OnGUI()
	{ 
		currHealth = Mathf.Clamp ( currHealth , 0 , 100 ) ;
		var healthFrac:float = currHealth / 100 ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * healthFrac, fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
	}
}