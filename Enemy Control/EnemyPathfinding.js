#pragma strict

class EnemyPathfinding extends MonoBehaviour {

	private var myLine:int ;
	private var myRow:int ;
	static private var levelGen: LevelGeneration ;
	private var mat:Array = new Array( ) ;
	static var runner:Transform ;
	private var shouldMove:boolean = false ;
	
	
	
	public function SetPosition ( _line , _row )
	{
		myLine = _line ;
		myRow = _row ;
		Debug.Log ( "Setted enemy line to: " + myLine + " row:" + myRow) ;
		myLine -= 2 ;
		mat = levelGen.GetMat ( ) ;
		yield 1 ;
		shouldMove = true ;
		
//		Debug.Log ( "14:" + mat[14] ) ;
//		Debug.Log ( "15:" + mat[15] ) ;
//		Debug.Log ( "16:" + mat[16] ) ;
//		Debug.Log ( "17:" + mat[17] ) ;
	}
	
	var dx:int[] = new int [4] ;
	var dy:int[] = new int [4] ;
	var direction:String[] = new String[4] ;
	

	
	function Awake ( )
	{
		if ( ! levelGen )		
			levelGen = GameObject.Find ( "Level Control" ). GetComponent ( LevelGeneration ) ;
		if ( ! runner )
			runner = GameObject. Find ( "BigGroup").transform ;
			
		// 0 , 0 , 1 , -1
		//1 , -1 , 0 , 0
		dx[2] =  0 ; dy[2] =  1 ; direction[2] = "right" ;
		dx[3] =  1 ; dy[3] =  0 ; direction[3] = "backward" ;
		dx[1] =  0 ; dy[1] = -1 ; direction[1] = "left" ;
		dx[0] = -1 ; dy[0] =  0 ; direction[0] = "forward" ;
		
		
	}
	
	function GetRunnerPosition ( )
	{
		var row:int = runner.rotation.eulerAngles.z / 15 ;
		var line:int = runner.position.z / 1.53 ;
		Debug.Log ( "Runner: " + line + " " + row ) ;
		return Vector2 ( line , row ) ;
	}
	
	var target:Quaternion ;
	
	function Update ( )
	{
		if ( shouldMove )
			Move ( ) ;
			
		if ( ! ( target.x || target.y || target.z || target.w ))
			return ;
		if ( transform.rotation == target )
		{
			target = Quaternion ( 0 , 0 , 0 , 0 ) ;
			return ;
		}
		transform.rotation = Quaternion.Slerp( transform.rotation, target, Mathf.Sin( 0.08 * Mathf.PI * 0.5) ); 
		
	}
	
	var LS1:Vector2 = new Vector2(-1 , -1 ) ;
	var LS2:Vector2 = new Vector2(-1 , -1 ) ;

	function Move ( )
	{
		var c:int ;
		var newX:int ;
		var newY:int ;
		var level:Array ;
		var runnerPos:Vector2; 
		
		runnerPos = GetRunnerPosition () ;
		
		//if ( 0 <= myRow - runnerPos.y < 12 )
			
		
		for ( c = 0 ; c < 4 ; ++ c )
		{
			newX = myLine + dx[c] ;
			newY = myRow + dy[c] ;
			
			if ( newX < 0 )
				continue ;
				
			if ( newY == -1 )
				newY = 24 ;
			if ( newY == 25 )
				newY = 1 ;
				
//			Debug.Log ( "newX:" + newX + " newY:" + newY ) ;
			level = mat[newX] ;
			
			var newPos:Vector2 = new Vector2 ( newX , newY ) ;
			
			if ( level[newY] == 0 && ( newPos != LS1 && newPos != LS2 ) )
			{
				//move our enemy there
				
				target = Quaternion.Euler ( 0 , 0 , transform.rotation.eulerAngles.z + dy[c] * 15 ) ;
//				Debug.LogWarning  ( direction [c] ) ;
				transform.position.z = transform.position.z + dx[c] * 1.53 ;
				myLine = newX ;
				myRow = newY ;
				shouldMove = false ;
				
				
				LS2 = LS1 ;
				LS1 = Vector2 ( myLine , myRow ) ;
				
				yield WaitForSeconds ( 0.5 ) ;
				shouldMove = true ;
				return ;
			}
		}
	}
}