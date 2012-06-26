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
		(mat[myLine] as Array)[myRow] = 0 ;
		
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
		var row:int = System.Math.Ceiling ( runner.rotation.eulerAngles.z ) / 15 ;
		var line:int = runner.position.z / 1.53 ;
		if ( row == 24 )
			row = 0 ;
//		Debug.Log ( "Runner: " + line + " " + row ) ;
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
		var runnerPos:Vector2 ;
		
		runnerPos = GetRunnerPosition () ;
		
//		Debug.Log ( runnerPos.y + " current:" + myRow ) ;
		
		if ( myRow != runnerPos.y )
		{
			var newRow:int ; 
			
			newRow = myRow + 1 ;
			if ( newRow == 24 )
				newRow = 0 ;
			
			if ( newRow == runnerPos.y )
			{
				if ( computeDirection ( 2 , "compute for right" , false ) )
				{
					//yield WaitForSeconds ( 2 ) ;				
					shouldMove = true ;	
					//Debug.Log ( "RIGHT: Target:" + runnerPos.y + " current:" + myRow + " time:" + Time.time ) ;
				}
				//else
					//yield WaitForSeconds ( 2 ) ;		
			}
			else
			{
				newRow = myRow - 1 ;
				if ( newRow == -1 )
					newRow = 23 ;
				
				if ( computeDirection ( 1 , "compute for left" , false ) )
				{
					//yield WaitForSeconds ( 2 ) ;
					shouldMove = true ;
					//Debug.Log ( "LEFT: Target:" + runnerPos.y + " current:" + myRow + " time:" + Time.time ) ;
				}
				//else
					//yield WaitForSeconds ( 2 ) ;
			}	
		}
			
		var done:boolean = false ;
		
		
		for ( c = 0 ; c < 1 ; ++ c )
		{
			done = computeDirection ( c , "usual" , true ) ;
			if ( done )
			{	
				yield WaitForSeconds ( 0.5 ) ;
				shouldMove = true ;
				return ;
			}
		}
	}
	
	private function computeDirection ( c:int , mesaj:String , useLS:boolean )
	{
	
		var newX:int ;
		var newY:int ;
		var level:Array ;
	
		newX = myLine + dx[c] ;
		newY = myRow + dy[c] ;
		
		if ( newX < 0 )
			return ;
			
		if ( newY == -1 )
			newY = 23 ;
		if ( newY == 24 )
			newY = 0 ;
			
		level = mat[newX] ;
		
		var newPos:Vector2 = new Vector2 ( newX , newY ) ;
		
		if ( mesaj != "usual" )
		{
			Debug.LogWarning ( newX + " " + newY + " old:" + myLine + " " + myRow + " D:" + dx[c] + " " + dy[c] ) ;
			
			Debug.Log ( mesaj + "   new: " + newPos + " 1:" + LS1 + " 2:" + LS2 ) ;
			if ( newPos == LS1 )
				Debug.Log ( "error la 1" ) ;
			if ( newPos == LS2 )
				Debug.Log ( "error la 2" ) ;
			if ( level[newY] != 0 )
				Debug.Log ( "error la level[newY]" + level[newY] ) ;
			
		}
		
		var ok:boolean = true ;
		
				
		if ( level[newY] != 0 )
			ok = false ;
			
		if ( useLS )
			if ( newPos == LS1 || newPos == LS2 ) 
				ok = false;
				
		if ( ok )	
		{
			//move our enemy there
			if ( ! ( target.x || target.y || target.z || target.w ) )
				target = Quaternion.Euler ( 0 , 0 , transform.rotation.eulerAngles.z + dy[c] * 15 ) ;
			else
			{
				Debug.LogWarning ( "updating target: " + target ) ;
				target.eulerAngles.z += dy[c] * 15  ;
				Debug.LogWarning ( "updated target: " + target ) ;
			}
				
			transform.position.z = transform.position.z + dx[c] * 1.53 ;
			myLine = newX ;
			myRow = newY ;
			shouldMove = false ;
			
			LS2 = LS1 ;
			LS1 = Vector2 ( myLine , myRow ) ;
			return true ;
		}
		return false ;
	}
}