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
		
		//rotate towards player rotation
		
		shouldMove = true ;
	}
} 
