#pragma strict

/* 0 - disabled
  1 - solid
  2 - destroyable
  3 - gate 
  4 - ammo
*/

class LevelGeneration extends MonoBehaviour {


	static var level:TextAsset ;
	private var stringArray:Array ;
	static var MODULO:int = 105 ;
	
	function splitText ()
	{
	
		/* split the contents of the file into an array of pieces separated by commas */
		
		stringArray = level.text.Split(","[0],"\n"[0]);
//		Debug.Log ( stringArray.length ) ;
		//for ( var i = 0; i < stringArray.length; i ++ ) 
		//	Debug.Log ( i + ": " + stringArray[i]); 
	}
	
	function getLine ( line:int )
	{
		var currentLine:Array = new Array(26);
		var triggerBox:boolean = false ;
		
		line = line % MODULO ; 
		if ( line == 0 ) 
			line = 1 ;
		
		var lower:int = ((line-1)*24) ; 
		var upper:int = (line*24-1) ; 
		var abc:String = "" ;
		
//		Debug.Log ( "Getting line:" + line + " bounds:[" + lower + " , " + upper + "]" ) ;
		for ( var i = (line-1)*24 ; i <= line*24 - 1 ; ++ i )
		{
			currentLine [i-lower] = int.Parse ( stringArray [i] ) ; 
			if ( currentLine [i-lower] == 3)
				triggerBox = true ;
			abc += " , " + currentLine[i-lower] ;
		}
		
		currentLine[24] = triggerBox ;
			
		return currentLine ;
	}
	
	//function Start () 
	//{
	//	splitText ( ) ;
	//}	

}