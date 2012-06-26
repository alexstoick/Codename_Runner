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
		
			var target:int = runnerPos.y ;	
			var upperBound:int = myRow + 12 ;
//			Debug.Log ( "Target:" + target + " current:" + myRow + " upperBound:" + upperBound ) ;//+ "		" + right + " " + left ) ;
			
			var distance = Mathf.Abs ( myRow - target ) ;
			
			if ( distance <= 12 )
				if ( myRow > target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						//yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						//yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;	
					}
				}
			else
			{
				//distance >12 
				Debug.LogWarning ( "CAZ SPECIAL" ) ;
				if ( myRow < target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						//yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						//yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;	
					}

				}
			}

						
			//if ( right < left )
/*			if ( myRow < target  && target < upperBound )
			{
				if ( computeDirection ( 2 , "compute for right" , false ) )
				{
					yield WaitForSeconds ( 0.5 ) ;
					shouldMove = true ;	
				}
			}
			else
				if ( upperBound%24 < target && target < myRow )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;
					}
				}
				else
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						yield WaitForSeconds ( 0.5 ) ;
						shouldMove = true ;	
					}
*/
		}
			
		var done:boolean = false ;
		
		
		c = 0 ;
		done = computeDirection ( c , "usual" , true ) ;
		if ( done )
		{	
			yield WaitForSeconds ( 0.5 ) ;
			shouldMove = true ;
			return ;
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
/*		
		if ( mesaj != "usual" )
		{
			Debug.LogWarning ( newX + " " + newY + " old:" + myLine + " " + myRow + " D:" + dx[c] + " " + dy[c] ) ;
		}
*/		
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
				target.eulerAngles.z += dy[c] * 15  ;
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