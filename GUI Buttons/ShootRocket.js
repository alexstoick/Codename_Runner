#pragma strict

class ShootRocket extends MonoBehaviour {
	
	private var moveRunner:MoveRunnerNew ;
	static var width:int ;
	static var height:int ;
	private var texture:GUITexture ;
	private var lastTime:double =0.0 ;
	
	var onTexture: Texture2D ;
	var offTexture: Texture2D ;
	
	function Awake ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
			
		texture = transform.GetComponent ( GUITexture ) ;		
		
		width = Screen.width ;
		height = Screen.height ;

		texture.pixelInset.height = width / 8 ;
		texture.pixelInset.width = width / 8 ;
		texture.pixelInset.x = 10 + -width/2 ;
		texture.pixelInset.y = -height/4 ;
	}
	
	function Update()
	{
		if ( Input.touchCount > 0 )		
		{
			var i :int;
			for ( i = 0 ; i < Input.touchCount ; ++ i )
			{
				var touch: Touch = Input.touches[i] ;
				if ( touch.phase == TouchPhase.Began && texture.HitTest ( touch.position ) ) 
				{
					moveRunner.fire ( ) ; 
					return ;
				}
			}
		}
		if ( RocketAvailable.isRocketAvailable () )
			texture.texture = onTexture ;
		else
			texture.texture = offTexture ; 
    }
}
