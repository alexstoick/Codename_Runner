#pragma strict

/* 0 - disabled
  1 - solid
  2 - destroyable
  3 - gate 
  4 - ammo
*/

class LevelGeneration extends MonoBehaviour {


	static var level:TextAsset ;
	private var stringArray:String[] ;
	static var MODULO:int = 105 ;
	static var LEVELS:int = 4 ;
	static private var currentLevel:int = 0 ;
	static private var getLevels:GetLevels ;
	static var _Line:int = 1 ;
	private var mat:Array = new Array ( );
	
	function Awake ( ) 
	{
		getLevels = GetComponent ( GetLevels ) ;
	}
	
	function splitText ()
	{
	
		var currentLine:Array = new Array[27];
		var triggerBox:boolean = false ;		
		stringArray = level.text.Split(","[0],"\n"[0]);
		MODULO = stringArray.length / 24 ;
		Debug.Log ( stringArray.length ) ;
		
		mat.Clear ( ) ;
		Debug.Log ( MODULO ) ;
		
		for ( var j:int  = 1 ; j < MODULO ; ++ j)
		{
		
			currentLine = new Array[26] ;
			triggerBox = false ;
			
			var lower:int = ((j-1)*24) ; 
			var upper:int = (j*24-1) ; 
	
			for ( var i:int = lower ; i <= upper ; ++ i )
			{
				currentLine [i-lower] = int.Parse ( stringArray [i] ) ; 
				if ( currentLine [i-lower] == 3)
					triggerBox = true ;
			}
			
			currentLine[24] = triggerBox ;
			currentLine[25] = currentLevel ;
			
			mat.push ( currentLine ) ;
		}
		_Line = 0 ;
	}
	
	function getLine ( )
	{
		if ( _Line == MODULO -2 )
		{
			_Line = 0 ;
			++currentLevel ;
			Debug.LogWarning ( "Changed level to:" + currentLevel ) ;
			getLevels.newLevel ( ) ;
			if ( currentLevel == LEVELS )
				currentLevel = 0 ;
			return mat[0] ;
			
		}
		++_Line ;
		if ( _Line >= mat.length) 
			return new Array[26] ;
			
		return mat[ _Line ] ;
	}
	
	public function GetMat ( )
	{
		return mat ;
	}


}