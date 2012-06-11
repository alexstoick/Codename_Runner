#pragma strict
import System.IO ;

class GetLevels extends MonoBehaviour {

	var path;
	
	function Start ( )
	{
		var path:String = Application.dataPath + "/Scripts/Level Control";
		var info = new DirectoryInfo(path);
		var fileInfo = info.GetFiles("*.txt");
		for (file in fileInfo) 
			Debug.Log ( file ) ;
	}
}