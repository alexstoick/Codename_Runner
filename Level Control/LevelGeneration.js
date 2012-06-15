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
	
	function splitText ()
	{
		stringArray = level.text.Split(","[0],"\n"[0]);
		MODULO = stringArray.length / 24 ;
		Debug.Log ( stringArray.length ) ;
	}
	
	function getLine ( line:int )
	{
		var currentLine:Array = new Array[27];
		var triggerBox:boolean = false ;
		
		line = line % MODULO ; 
		if ( line == 0 ) 
		{
			line = 1 ;
			++ currentLevel ;
			if ( currentLevel == LEVELS )
				currentLevel = 0 ;
		}
		
		var lower:int = ((line-1)*24) ; 
		var upper:int = (line*24-1) ; 
		var abc:String = "" ;
		
		for ( var i = (line-1)*24 ; i <= line*24 - 1 ; ++ i )
		{
			currentLine [i-lower] = int.Parse ( stringArray [i] ) ; 
			if ( currentLine [i-lower] == 3)
				triggerBox = true ;
			abc += " , " + currentLine[i-lower] ;
		}
		
		currentLine[24] = triggerBox ;
		currentLine[25] = currentLevel ;
		
		return currentLine ;
	}


}