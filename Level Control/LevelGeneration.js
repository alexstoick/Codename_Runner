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
	static var LEVELS:int = 5 ;
	static private var currentLevel:int = 0 ;
	static private var getLevels:GetLevels ;
	static var _Line:int = 1 ;
	
	function Awake ( ) 
	{
		getLevels = GetComponent ( GetLevels ) ;
	}
	
	function splitText ()
	{
		stringArray = level.text.Split(","[0],"\n"[0]);
		MODULO = stringArray.length / 24 ;
		Debug.Log ( stringArray.length ) ;
	}
	
	function getLine ( )
	{
		var currentLine:Array = new Array[27];
		var triggerBox:boolean = false ;
		
		if ( _Line > MODULO )
		{
			_Line = 1 ;
			++currentLevel ;
			
			getLevels.newLevel ( ) ;
			if ( currentLevel == LEVELS )
				currentLevel = 0 ;
		}
		
		var lower:int = ((_Line-1)*24) ; 
		var upper:int = (_Line*24-1) ; 
		var abc:String = "" ;

//		Debug.Log ( "Getting line:" + _Line + " bounds:[" + lower + " , " + upper + "]" ) ;
				
		for ( var i = (_Line-1)*24 ; i <= _Line*24 - 1 ; ++ i )
		{
			currentLine [i-lower] = int.Parse ( stringArray [i] ) ; 
			if ( currentLine [i-lower] == 3)
				triggerBox = true ;
			abc += " , " + currentLine[i-lower] ;
		}
		
		currentLine[24] = triggerBox ;
		currentLine[25] = currentLevel ;
		
		++ _Line ;
		return currentLine ;
		
	}


}