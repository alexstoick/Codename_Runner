#pragma strict

class EnemyPathfinding extends MonoBehaviour {

	private var mat:Array = new Array( ) ;
	static var runner:Transform ;
	private var shouldMove:boolean = true ;
	
	var myRow:int ;
	var freeze:boolean = false ;
	private var enemyShoot:EnemyShoot ;
	
	
	public function SetPosition ( _row:int )
	{
		myRow = _row ;
		transform.rotation.eulerAngles.z = _row * 15 ;
		freeze = false ;
		
//		if ( ! enemyShoot )
//			enemyShoot = GetComponent ( EnemyShoot ) ;
		
//		enemyShoot.setOffCooldown ( ) ;
	}
	
	private var dx:int[] = new int [4] ;
	private var dy:int[] = new int [4] ;
	private var direction:String[] = new String[4] ;
	
	function Start () 
	{
		patrolling = false ;	
//		if ( ! enemyShoot )
//			enemyShoot = GetComponent ( EnemyShoot ) ;
	}

	
	function Awake ( )
	{
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
		if ( row == 24 )
			row = 0 ;
		return row ;
	}
	
	var target:Quaternion ;
	
	function Update ( )
	{	
		if ( showCurrentRow )
			showRow ( ) ;
			
		if ( ! freeze )
		{
			// TODO: implement the distance feature
			
			/*if ( runner.position.z + 30 > transform.position.z )
			{
				if ( shouldMove )
					Move ( ) ;
			}
			else
			{
				Patrol ( ) ;
			}*/
			Patrol () ;
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
	
		if ( patrolling )
			return ;
		
		if ( computeDirection ( patrolDirection  , "compute for patrolling" , false ) )
		{
			patrolling = true ;
			//enemyShoot.Shoot() ;
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
			//enemyShoot.Shoot() ;
			yield WaitForSeconds ( 2 ) ;
			patrolling = false ;
		}
		
	
	}
	
	//Currently not using Move
	function Move ( )
	{
		shouldMove = false ;
		var c:int ;
		var runnerPos:Vector2 ;
		
		runnerPos = GetRunnerPosition () ;
		myRow = doubleToInt ( transform.eulerAngles.z / 15 ) ;
		transform.eulerAngles.z = myRow * 15.00000 ;
		
		if ( myRow != runnerPos )
		{
			var target:int = runnerPos ;	
			
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