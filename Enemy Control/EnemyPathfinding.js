#pragma strict

class EnemyPathfinding extends MonoBehaviour {

	private var mat:Array = new Array( ) ;
	static var runner:Transform ;
	private var shouldMove:boolean = true ;
	
	var myRow:int ;
	var freeze:boolean = false ;

	//Variables that control the patrol: direction and 
	//if we are currently patrolling or not.
	private var patrolDirection:int = 1 ;
	var patrolling:boolean = false ;

	private var dx:int[] = new int [4] ;
	private var dy:int[] = new int [4] ;
	private var direction:String[] = new String[4] ;

	var target:Quaternion ;
	private var WAIT_SECONDS_FOR_PATROL:float = 0.50 ;
	private var WAIT_SECONDS_FOR_MOVEMENT:float = 0.50 ;

	
	function Init ( )
	{
		patrolling = false ;
		target = Quaternion ( 0 , 0, 0 , 0 ) ;
		freeze = false ;
	}
	
	function Start () 
	{
		patrolling = false ;	
	}

	
	function Awake ( )
	{
		if ( ! runner )
			runner = GameObject. Find ( "BigGroup").transform ;
					
		dy[2] =  1 ; //Right
		dy[1] = -1 ; //Left
	}

	function Update ( )
	{	
		//If not frozen, will patrol.
		if ( ! freeze )
		{
			Patrol ( );
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

	//Function that handles the patrol operation. It goes in one direction 
	//until it encounters an obstacle, then changes direction.	
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
	
	//Returns true if the move can be completed, false otherwise.
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
			case 1: directionVector = -Vector3.right ; break ;
			case 2: directionVector = Vector3.right ; break ;
		}
		
		//If there is an obstacle in the way, return false;
		if (Physics.Raycast ( position , copil.TransformDirection ( directionVector ), hit,  4 ) )
		{
			return false ;
		}

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