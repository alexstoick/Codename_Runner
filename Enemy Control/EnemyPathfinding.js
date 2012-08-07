#pragma strict

class EnemyPathfinding extends MonoBehaviour {

	static private var levelGen: LevelGeneration ;
	private var mat:Array = new Array( ) ;
	static var runner:Transform ;
	private var shouldMove:boolean = true ;
	private var LS1:Vector2 = new Vector2(-1 , -1 ) ;
	private var LS2:Vector2 = new Vector2(-1 , -1 ) ;
	
	var forward:boolean = false ;
	var myLine:int ;
	var myRow:int ;
	var showCurrentRow:boolean = false ;
	var stringMatrice:String = "" ;
	var freeze:boolean = false ;
	var showMessages:boolean = false ;
	private var enemyShoot:EnemyShoot ;
	
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
		transform.rotation.eulerAngles.z = _row * 15 ;
		freeze = false ;
		
		var m:int = Random.Range ( 0 , 2 ) ;
		if ( m < 1 )
			forward = true ;
		else
			forward = false ;
		
		enemyShoot.setOffCooldown ( ) ;

		
//		Debug.LogError ( "Setted position for " + transform.name + " line:" + myLine + " row:" + myRow + " rotation:" + transform.rotation.eulerAngles.z ) ;
		getMatrix ( );
	}
	
	private var dx:int[] = new int [4] ;
	private var dy:int[] = new int [4] ;
	private var direction:String[] = new String[4] ;
	
	function Start () 
	{
		LS1 = new Vector2(-1 , -1 ) ;
		LS2 = new Vector2(-1 , -1 ) ;	
		patrolling = false ;	
		if ( ! enemyShoot )
			enemyShoot = GetComponent ( EnemyShoot ) ;
	}

	
	function Awake ( )
	{
		if ( ! levelGen )		
			levelGen = GameObject.Find ( "Level Control" ). GetComponent ( LevelGeneration ) ;
		if ( ! runner )
			runner = GameObject. Find ( "BigGroup").transform ;
					
		dx[2] =  0 ; dy[2] =  1 ; direction[2] = "right" ;
		dx[3] =  1 ; dy[3] =  0 ; direction[3] = "backward" ;
		dx[1] =  0 ; dy[1] = -1 ; direction[1] = "left" ;
		dx[0] = -1 ; dy[0] =  0 ; direction[0] = "forward" ;
	}
	
	private function doubleToInt ( x: double )
	{
		var intX : int = System.Math.Floor ( x ) ;
		
		if ( x - intX > 0.5 )
			return intX + 1 ;
			
		return intX ;
	}
	
	function GetRunnerPosition ( )
	{
		var row:int = doubleToInt ( runner.rotation.eulerAngles.z / 15 ) ;
		var line:int = runner.position.z / 1.53 ;
		if ( row == 24 )
			row = 0 ;
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
			
		if ( ! freeze )
		{
			if ( runner.position.z + 30 > transform.position.z )
			{
				if ( shouldMove )
					Move ( ) ;
//				Debug.Log ( transform.name + " moving" ) ;
			}
			else
			{
				Patrol ( ) ;
	//			Debug.Log ( transform.name + " patrolling" ) ;
			}
		}
		
		if ( ! ( target.x || target.y || target.z || target.w ))
			return ;
		if ( transform.rotation == target )
		{
			target = Quaternion ( 0 , 0 , 0 , 0 ) ;
			return ;
		}
		transform.rotation = Quaternion.Slerp( transform.rotation, target, Time.deltaTime * 4 ); 

	}
	
	private var patrolDirection:int = 1 ;
	private var patrolling:boolean = false ;
	
	function Patrol ( ) 
	{
	
		//to be implemented !
		if ( patrolling )
			return ;
		
		if ( computeDirection ( patrolDirection  , "compute for patrolling" , false ) )
		{
			patrolling = true ;
			enemyShoot.Shoot() ;
			yield WaitForSeconds (2) ;
			patrolling = false ;
			return ;
		}
		else
		{
			if ( patrolDirection  == 1 )
				patrolDirection  = 2 ;
			else
				patrolDirection  = 1 ;
			
			patrolling = true ;
			computeDirection ( patrolDirection  , "compute for patrolling" , false ) ;
			enemyShoot.Shoot() ;
			yield WaitForSeconds ( 2 ) ;
			patrolling = false ;
		}
		
	
	}
	
	function Move ( )
	{
		shouldMove = false ;
		var c:int ;
		var runnerPos:Vector2 ;
		
		runnerPos = GetRunnerPosition () ;
		myRow = doubleToInt ( transform.eulerAngles.z / 15 ) ;
		transform.eulerAngles.z = myRow * 15.00000 ;
		
		if ( myRow != runnerPos.y )
		{
			var target:int = runnerPos.y ;	
			
			var distance = Mathf.Abs ( myRow - target ) ;
			
			if ( distance <= 12 )
				if ( myRow > target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						enemyShoot.Shoot() ;
						yield WaitForSeconds ( 1.25 ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						enemyShoot.Shoot() ;
						yield WaitForSeconds ( 1.25 ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
			else
			{
				//distance >12 
				if ( myRow < target )
				{
					if ( computeDirection ( 1 , "compute for left" , false ) )
					{
						enemyShoot.Shoot() ;
						yield WaitForSeconds ( 1.25 ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						enemyShoot.Shoot() ;
						yield WaitForSeconds ( 1.25 ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
			}
		}
		else
		{
			enemyShoot.Shoot ( );
			if ( myRow > 23 )
				myRow = 23 ;
		}
			
/*		var done:boolean = false ;

		if ( forward )
			c = 0 ;
		else
			c = 3 ;

		done = computeDirection ( c , "usual" , false ) ;
		if ( done )
		{	
			yield WaitForSeconds ( 0.6 ) ;
		}*/
		shouldMove = true ;
	}
	
	private function computeDirection ( c:int , mesaj:String , useLS:boolean )
	{
		
		var directionVector:Vector3 ;
		var hit : RaycastHit;
		
		//Will do a raycast to the coresponding direction and see if it is clear. 
		//If the space is clear, procede and move our enemy there.
		
		var position:Vector3 = transform.GetChild(0).position ;
		var copil:Transform = transform.GetChild ( 0 ) ;
		
		switch ( c )
		{
			case 0: directionVector = -Vector3.up ; break ;
			case 3: directionVector = Vector3.up ; break ;
			case 1: directionVector = Vector3.right ; break ;
			case 2: directionVector = -Vector3.right ; break ;
		}
		
		if (Physics.Raycast ( position , copil.TransformDirection ( directionVector ), hit,  4 ) )
		{
//			Debug.LogWarning ( "OBSTACOL" + hit.transform.parent.name) ;
			
			Debug.DrawRay ( position , copil.TransformDirection ( directionVector ) * 4 , Color.green , 0.5 );
			
			return false ;
		}

		Debug.DrawRay ( position , copil.TransformDirection ( directionVector  )*4 , Color.red , 0.5 );
//		Debug.Log ( mesaj + " " + directionVector ) ;
		
		if ( ! ( target.x || target.y || target.z || target.w ) )
			target = Quaternion.Euler ( 0 , 0 , transform.rotation.eulerAngles.z + dy[c] * 15) ;
		else
		{
			target.eulerAngles.z += dy[c] * 15  ;
		}
			
		var multiplier:int = 1 ;
			
		transform.position.z = transform.position.z + dx[c] * 1.53 * multiplier ;
		return true ;
		
	}
}