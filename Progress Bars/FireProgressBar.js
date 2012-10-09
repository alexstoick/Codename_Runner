#pragma strict

class FireProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	private var fullRect: Rect = new Rect ( 450 , 150 , 200 , 20 ) ; 
	static var currCooldown: float = 0;
	static var lastModified: double = 0.0 ;
	var pbl_CD:float = 0;
	
	function OnGUI()
	{ 
		currCooldown = Mathf.Clamp ( currCooldown , 0 , 10 ) ;
		var cooldown:float = currCooldown / 10 ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * cooldown, fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
	}
	
	function Update ( )
	{
		if ( currCooldown > 0 && lastModified + 0.2 < Time.time ) 
			currCooldown -= Time.deltaTime ;
		pbl_CD = currCooldown ;
	}
}