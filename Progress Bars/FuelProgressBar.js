#pragma strict

class FuelProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	private var fullRect: Rect = new Rect ( 5 , Screen.height/6+Screen.height/20 , Screen.width/3 , Screen.height/25 ) ; 
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
		if ( ! Controller.showFuelBar )
			return ;
			
		currFuel = Mathf.Clamp ( currFuel , 0 , 100 ) ;

		var fuelFrac:float = currFuel / 100f ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * fuelFrac , fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		
		if ( fuelFrac == 0 )
			GameOver.Dead ( ) ;
	}
}