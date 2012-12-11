#pragma strict

class FireProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	
	private var fullRect: Rect = new Rect ( 0 , Screen.height/6 , Screen.width/25 , Screen.height/3 ) ; 
	static var currCooldown: float = 0;
	static var lastModified: double = 0.0 ;
	static var targetCooldown:float = 0.0 ;
	var pbl_CD:float = 0;
	
	function OnGUI()
	{ 
		if ( ! Controller.showFireCooldownBar )
			return ;
			
		currCooldown = Mathf.Clamp ( currCooldown , 0 , 10 ) ;
		var cooldown:float = currCooldown / 10 ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width , fullRect.height* cooldown); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height ); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
	}
	
	function Update ( )
	{
		if ( currCooldown > 0 && lastModified + 0.2 < Time.time ) 
			targetCooldown -= Time.deltaTime ;
		targetCooldown = Mathf.Clamp ( targetCooldown , 0 , 10 ) ;
		currCooldown = Mathf.Lerp ( currCooldown , targetCooldown , Time.deltaTime * 0.6 ) ;
		pbl_CD = currCooldown ;
	}
}