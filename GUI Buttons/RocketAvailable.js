#pragma strict

class RocketAvailable extends MonoBehaviour {

	static public var rockets:Array = [ true , true , true , true , true ] ;
	
	var onTexture:Texture2D ;
	var offTexture:Texture2D ;
	
	static var width:int ;
	static var height:int ;
	private var trsname:String ;
	private var texture:GUITexture;
	private var number:int ;
	
	function Awake ( ) 
	{
		trsname = transform.name ;
		texture = transform.GetComponent(GUITexture) ;
		
		if ( trsname.Contains ( "1" ) )
			number = 1;
		if ( trsname.Contains ( "2" ) )
			number = 2 ;
		if ( trsname.Contains ( "3" ) )
			number = 3 ;
		if ( trsname.Contains ( "4" ) )
			number = 4 ;
		if ( trsname.Contains ( "0" ) )
			number = 0 ;
			
		width = Screen.width ;
		height = Screen.height ;

		texture.pixelInset.height = height / 20 ;
		texture.pixelInset.width = height / 20 ;
		texture.pixelInset.x = 10 + -width/2 ;
		texture.pixelInset.y = -height/2 + number*height/20 ;
	}
	
	function Update ( ) 
	{

			
		if ( rockets[number] )
			texture.texture = onTexture ;
		else
			texture.texture = offTexture ;
	}
	
	static function isRocketAvailable ( ) 
	{
		for ( var i = 0 ; i < 5 ; ++ i )
			if ( rockets[i] )
				return true ;
		return false ;
	}
	
	static function setAllTrue ( )
	{
		for ( var i = 0 ; i < 5 ; ++ i )
			rockets[i] = true ;
	}
	
	static function deactivateRocket ( )
	{
		for ( var i = 0 ; i < 5 ; ++ i )
			if ( rockets[i] )
			{
				rockets[i] = false ;
				return ;
			}
	}

}