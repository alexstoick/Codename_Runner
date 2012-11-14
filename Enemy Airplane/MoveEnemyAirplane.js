#pragma strict

class MoveEnemyAirplane extends MonoBehaviour {

	static private var WAIT_SECONDS_FOR_PATROL:float = 0.50 ;		
	private var patrolDirection:int = 1 ;
	var patrolling:boolean = false ;
	var target = Quaternion ( 0 , 0, 0 , 0 ) ;
	var freeze:boolean = false ;


	function Update ( )
	{
		freeze = false ;
		Patrol ( ) ;
		target.eulerAngles.y = transform.localRotation.eulerAngles.y ;
		target.eulerAngles.x = transform.localRotation.eulerAngles.x ;
		transform.localRotation = Quaternion.Lerp( transform.localRotation, target, Time.deltaTime * 4 ); 

	}
	
	static private var dy:int[] = new int [4] ;
	
	function Awake ( )
	{
		dy[2] =  1 ; //direction[2] = "right" ;
		dy[1] = -1 ; //direction[1] = "left" ;
	}
	
	function Patrol ( ) 
	{
	
		if ( patrolling || freeze )
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

	private function computeDirection ( c:int , mesaj:String , useLS:boolean )
	{
		
		var directionVector:Vector3 ;
		var hit : RaycastHit;
		
		//Will do a raycast to the coresponding direction and see if it is clear. 
		//If the space is clear, procede and move our enemy there.
		
		var copil:Transform = transform.GetChild ( 0 ) ;
		var position:Vector3 = copil.position ;

		
		switch ( c )
		{
			case 1: directionVector = -Vector3.right ; break ;
			case 2: directionVector = Vector3.right ; break ;
		}
		
		if (Physics.Raycast ( position , copil.TransformDirection ( directionVector ), hit,  4 ) )
		{
			Debug.DrawRay ( position , copil.TransformDirection ( directionVector ) * 4 , Color.green , 0.5 );
			return false ;
		}

		Debug.DrawRay ( position , copil.TransformDirection ( directionVector  )*4 , Color.red , 0.5 );
		
		target.eulerAngles.z += dy[c] * 15  ;


		return true ;
	}


}