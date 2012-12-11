#pragma strict

class HealthProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	
	private var fullRect: Rect = new Rect ( Screen.width-Screen.width/25 , Screen.height/8 , Screen.width/25 , Screen.height/3 ) ; 
	var maxHealth: float; 
	static var currHealth: float = 100.0; 
	static var targetHealth:float = 100.0 ;
	
	function Update ( ) 
	{
		targetHealth = Mathf.Clamp ( targetHealth , 0 , 100 ) ;
		currHealth = Mathf.Lerp ( currHealth , targetHealth , Time.deltaTime * 0.6 ) ;
		if ( targetHealth <= 0 )
			GameOver.Dead ( ) ;
	}
	
	function OnGUI()
	{ 
		if ( ! Controller.showHealthBar ) 
			return ;
			
		currHealth = Mathf.Clamp ( currHealth , 0 , 100 ) ;
		var healthFrac:float = currHealth / 100 ; 
		
		var currRect = Rect(fullRect.x , fullRect.y + fullRect.height * ( 1 - healthFrac ) , fullRect.width , fullRect.height * healthFrac ); 
		var innerRect = Rect(fullRect.x , fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		
		if ( healthFrac == 0 )
			GameOver.Dead ( ) ;
	}
}