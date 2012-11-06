#pragma strict

class FollowPlayerRotation extends MonoBehaviour {

	static var runner:Transform ;
	private var shouldMove:boolean = true ;
	
	var freeze:boolean = false ;
	var target:Quaternion ;
	private var WAIT_SECONDS_FOR_MOVEMENT:float = 0.50 ;

	
	function Init ( )
	{
		target = Quaternion ( 0 , 0, 0 , 0 ) ;
		freeze = false ;
	}
	
	function Start () 
	{
	}

	
	function Awake ( )
	{
		if ( ! runner )
			runner = GameObject. Find ( "BigGroup").transform ;

	}
	
	private function doubleToInt ( x: double )
	{
		var intX : int = System.Math.Floor ( x ) ;
		
		if ( x - intX > 0.5 )
			return intX + 1 ;
			
		return intX ;
	}
	
	
	function Update ( )
	{	
	
		if ( ! freeze )
		{
			Move ( ) ;

		}
		
		if ( ! ( target.x || target.y || target.z || target.w ))
			return ;
		if ( transform.rotation == target )
		{
			target = Quaternion ( 0 , 0 , 0 , 0 ) ;
			return ;
		}
		transform.localRotation = Quaternion.Slerp( transform.localRotation, target, Time.deltaTime * 4 ); 

	}
	
	function Patrol ( ) 
	{
	
		if ( patrolling )
			return ;
		
		if ( computeDirection ( patrolDirection  , "compute for patrolling" , false ) )
		{
			patrolling = true ;
			yield WaitForSeconds ( WAIT_SECONDS_FOR_PATROL ) ;
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
			yield WaitForSeconds ( WAIT_SECONDS_FOR_PATROL ) ;
			patrolling = false ;
		}
		
	
	}
	
	//Currently not using Move
	function Move ( )
	{
		shouldMove = false ;
		var c:int ;
		var runnerPos:int ;
		
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
						yield WaitForSeconds ( WAIT_SECONDS_FOR_MOVEMENT  ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						yield WaitForSeconds ( WAIT_SECONDS_FOR_MOVEMENT ) ;
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
						yield WaitForSeconds ( WAIT_SECONDS_FOR_MOVEMENT ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
				else
				{
					if ( computeDirection ( 2 , "compute for right" , false ) )
					{
						yield WaitForSeconds ( WAIT_SECONDS_FOR_MOVEMENT ) ;
//						Debug.LogWarning ( transform.name + " " + " row:" + myRow + " rot:" + transform.rotation.eulerAngles.z ) ;
					}
				}
			}
		}
		else
		{
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
			case 1: directionVector = -Vector3.right ; break ;
			case 2: directionVector = Vector3.right ; break ;
		}
		
		if (Physics.Raycast ( position , copil.TransformDirection ( directionVector ), hit,  4 ) )
		{
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

		return true ;
		
	}
} 
