#pragma strict

class ShootRocket extends MonoBehaviour {
	
	var moveRunner:MoveRunnerNew ;
	static var width:int ;
	static var height:int ;
	var texture:GUITexture ;
	
	function Awake ( )
	{
		if ( ! moveRunner )
			moveRunner = GameObject.Find ( "BigGroup").GetComponent ( "MoveRunnerNew" ) ;
			
		texture = transform.GetComponent ( GUITexture ) ;		
		
		width = Screen.width ;
		height = Screen.height ;
		
		Debug.Log ( width + "	" + height ) ;
		
		texture.pixelInset.height = height / 8 ;
		texture.pixelInset.width = width / 5 ;
		texture.pixelInset.x = -width/2 ;
		texture.pixelInset.y = -height/2 ;
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
					moveRunner.fire ( true ) ; 
			}
		}
    }
}
