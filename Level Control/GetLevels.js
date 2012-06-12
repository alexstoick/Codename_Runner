#pragma strict
import System.IO ;

class GetLevels extends MonoBehaviour {


	var levelGen:LevelGeneration ;
	var levels : Object[] ;

	function Start ( )
	{
		if ( ! levelGen )	
			levelGen = GameObject.Find ( "Level Control").GetComponent ( LevelGeneration ) ;
		levels = Resources.LoadAll( "", TextAsset );

	}
			
	/*{	
		var path:String = Application.dataPath + "/Scripts/Level Control";
		var info = new DirectoryInfo(path);
		var fileInfo = info.GetFiles("*.txt");
		var i:int = 0 ;
		for (file in fileInfo) 
		{
			++ i ;
			if ( i == 2 )
				levelGen.level = file as TextAsset;
	}*/
	
	function loadRes () 
	{
	    
	    levelGen.level = levels[1] ;
	    levelGen.MODULO = 1 ;
	    levelGen.splitText ( ) ;
	}
	function getLevel ( var x:int )
	{
		
	}
}