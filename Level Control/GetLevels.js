#pragma strict
import System.IO ;

class GetLevels extends MonoBehaviour {


	var levelGen:LevelGeneration ;
	var levels : Object[] ;
	static private var lastLvl:int = 0 ;

	function Start ( )
	{
		if ( ! levelGen )	
			levelGen = GameObject.Find ( "Level Control").GetComponent ( LevelGeneration ) ;
		levels = Resources.LoadAll( "", TextAsset );

	}

	function loadRes () 
	{
	    
	    levelGen.level = levels[1] ;
	    levelGen.MODULO = 1 ;
	    levelGen.splitText ( ) ;
	}
	function newLevel ( )
	{
		++ lastLvl ;
		if ( lastLvl > levels.Length )
			lastLvl = 0 ;
			
		levelGen.level = levels[lastLvl] ;
		levelGen.splitText ( ) ;
	}
}