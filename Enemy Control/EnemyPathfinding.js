#pragma strict

class EnemyPathfinding extends MonoBehaviour {

	static private var levelGen: LevelGeneration ;
	private var mat:Array = new Array( ) ;
	static var runner:Transform ;
	private var shouldMove:boolean = false ;
	
	
	var forward:boolean = false ;
	var myLine:int ;
	var myRow:int ;
	var showCurrentRow:boolean = false ;
	var stringMatrice:String = "" ;
	var freeze:boolean = false ;
	var showMessages:boolean = false ;
		
	private function getMatrix ( )
	{
		var matrice:Array ;
		shouldMove = false ;
		matrice = levelGen.GetMat ( ) ;
		stringMatrice = "" ;
		mat.clear ( ) ;
		for ( var i:int = 0 ; i < matrice.length ; ++ i )
		{
			mat.push ( matrice[i] ) ;
			stringMatrice += "\n" + matrice[i] ;
		}
		shouldMove = true ;
	}
	
	public function SetPosition ( _line:int , _row:int )
	{
		myLine = _line ;
		myRow = _row ;
		freeze = false ;
		
		var m:int = Random.Range ( 0 , 2 ) ;
		if ( m < 1 )
			forward = true ;
		else
			forward = false ;
		
		Debug.LogError ( "Setted position for " + transform.name + " line:" + myLine + " row:" + myRow + " rotation:" + transform.rotation.eulerAngles.z ) ;
		getMatrix ( );
	}
	
	private var dx:int[] = new int [4] ;
	private var dy:int[] = new int [4] ;
	private var direction:String[] = new String[4] ;
	

	
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
	
	private function showRow ( )
	{
		var i:int ;
		var lvl:Array = mat[myLine] ;
		var s:String = "Line nr:" + myLine + " " ;
		for ( i = 0 ; i < 25 ; ++ i )
			s += lvl[i] + " " ;
		Debug.LogWarning ( s ) ;
		Debug.LogWarning ( stringMatrice ) ;
	}
	
	var target:Quaternion ;
	
	function Update ( )
	{	
		if ( showCurrentRow )
			showRow ( ) ;
			
		if ( shouldMove && runner.position.z + 60 > transform.position.z && ! freeze )
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
	
	function Move ( )
	{
		shouldMove = false ;
		var c:int ;
		var runnerPos:Vector2 ;
		
		runnerPos = GetRunnerPosition () ;
		
		if ( myRow != runnerPos.y )
		{
			var target:int = runnerPos.y ;	
			
			var distance = Mathf.Abs ( myRow - target ) ;
			
//			Debug.Log ( "Target:" + target + " current:" + myRow ) ;
			
			if ( distance <= 12 )
				if ( myRow > target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						yield 1 ;
						//yyield WaitForSeconds ( 3 ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						yield 1 ;
						//yyield WaitForSeconds ( 3 ) ;
					}
				}
			else
			{
				//distance >12 
				if ( myRow < target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						yield 1 ;
						//yyield WaitForSeconds ( 3 ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						yield 1 ;
						//yyield WaitForSeconds ( 3 ) ;
					}
				}
			}
		}
			
		var done:boolean = false ;

		if ( forward )
			c = 0 ;
		else
			c = 3 ;

		done = computeDirection ( c , "usual" , false ) ;
		if ( done )
		{	
			yield WaitForSeconds ( 0.5 ) ;
		}
		shouldMove = true ;
	}
	
	private var LS1:Vector2 = new Vector2(-1 , -1 ) ;
	private var LS2:Vector2 = new Vector2(-1 , -1 ) ;

	function Start ( )
	{
		LS1 = new Vector2(-1 , -1 ) ;
		LS2 = new Vector2(-1 , -1 ) ;
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
		if ( newX >= mat.length )
			return ;				
			
		if ( newY == -1 )
			newY = 23 ;
		if ( newY == 24 )
			newY = 0 ;
		
		var newPos:Vector2 = new Vector2 ( newX , newY ) ;
		
		level = mat[newX] ;

//		if ( transform.position.z == 191.37 )
//			Debug.LogError ( level ) ;			
		
//		if ( c == 3 )
//			Debug.LogWarning ( "old:" + " " + myLine + " new: " + newX + " " + " y:" + newY + " " + level[newY] ) ;

		if ( level[24] )
			return false ;

		if ( level[newY] != 6 && level[newY] != 0 && level[newY] != 4 )
		{
			if ( showMessages )		
				Debug.Log ( "Tried going " + direction[c] + " but is not clear! + [ " + newX + " , " + newY + " ]" ) ;
			return false ;
		}
		
		if ( useLS )
			if ( newPos == LS1 || newPos == LS2 ) 
			{
				if ( showMessages )
					Debug.Log ( "Been here before ! Might be stuck" ) ;
				return false ;
			}

		//move our enemy there
		if ( ! ( target.x || target.y || target.z || target.w ) )
			target = Quaternion.Euler ( 0 , 0 , transform.rotation.eulerAngles.z + dy[c] * 15) ;
		else
		{
			target.eulerAngles.z += dy[c] * 15  ;
		}
			
		var multiplier:int = 1 ;
			
		if ( level[24] == true )
			multiplier = 2 ;
			
			
		transform.position.z = transform.position.z + dx[c] * 1.53 * multiplier ;
		myLine = newX ;
		myRow = newY ;
		shouldMove = false ;
		
		LS2 = LS1 ;
		LS1 = Vector2 ( myLine , myRow ) ;


		return true ;
	}
}