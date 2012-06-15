#pragma strict
import System.IO ;

class GetLevels extends MonoBehaviour {


	static private var levelGen:LevelGeneration ;
	var levels : Object[] ;
	static private var lastLvl:int = -1 ;

	function Start ( )
	{
		if ( ! levelGen )	
			levelGen = GameObject.Find ( "Level Control").GetComponent ( LevelGeneration ) ;
		levels = Resources.LoadAll( "", TextAsset );
		newLevel ( ) ;

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
		if ( lastLvl == levels.Length )
			lastLvl = 0 ;
			
		levelGen.level = levels[lastLvl] ;
		levelGen.splitText ( ) ;
	}
}