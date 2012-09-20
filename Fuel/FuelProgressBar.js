#pragma strict

class FuelProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	private var fullRect: Rect = new Rect ( 5 , 200 , 200 , 20 ) ; 
	static var currFuel: float = 100.0f ; 
	static var lastTime:double = 0.0 ;
	function Update ( )
	{
		if ( LoftMovement.isStopped ( ) )
			return ;
			
		if ( lastTime + 1 < Time.time )
		{
			currFuel -= 0.8 ;
			lastTime = Time.time ;
		}
	}
	
	function OnGUI()
	{ 
		var fuelFrac:float = currFuel / 100f ; 
		
		fuelFrac  = Mathf.Clamp ( fuelFrac  , 0 , 100f ) ;
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * fuelFrac , fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		
		if ( fuelFrac == 0 )
			GameOver.Dead ( ) ;
	}
}