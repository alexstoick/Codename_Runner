#pragma strict

class FuelProgressBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	
	private var fullRect: Rect = new Rect ( Screen.width - Screen.width/10 , Screen.height/6 , Screen.width/25 , Screen.height/3 ) ; 
	
	static var currFuel: float = 100.0f ; 
	static var lastTime:double = 0.0 ;
	
	static var targetFuel:float = 100.0f ;
	
	function Update ( )
	{
		if ( LoftMovement.isStopped ( ) )
			return ;
			
		if ( lastTime + 1 < Time.time )
		{
			targetFuel -= 1.5 ;
			lastTime = Time.time ;
		}
		currFuel = Mathf.Lerp ( currFuel , targetFuel , Time.deltaTime * 0.6 ) ;
	}
	
	function OnGUI()
	{ 
		if ( ! Controller.showFuelBar )
			return ;
			
		currFuel = Mathf.Clamp ( currFuel , 0 , 100 ) ;

		var fuelFrac:float = currFuel / 100f ; 
		
		var currRect = Rect(fullRect.x , fullRect.y + fullRect.height * ( 1 - fuelFrac ) , fullRect.width , fullRect.height * fuelFrac ); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		
		if ( fuelFrac == 0 )
			GameOver.Dead ( ) ;
	}
}