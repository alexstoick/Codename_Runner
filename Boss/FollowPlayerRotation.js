#pragma strict

class FollowPlayerRotation extends MonoBehaviour {

	static var runner:Transform ;
	private var shouldMove:boolean = true ;
	
	var freeze:boolean = false ;
	var WAIT_SECONDS_FOR_MOVEMENT:float = 2 ;
	var MOVE_FOR_SECONDS:float = 1.0 ;
	var LERP_VALUE:float = 1 ; //lower values = slower movement
	private var tParam:float = 0.0 ;
	
	function Awake ( )
	{
		if ( ! runner )
			runner = GameObject. Find ( "BigGroup").transform ;
	}

	function Update ( )
	{	
	
		if ( ! freeze )
		{
			Move ( ) ;
			return ;
		}
	}

	function Move ( )
	{
		if ( BossEvasiveAction.isMoving )
			return ;
		if ( ! shouldMove ) 
			return ;
			
		shouldMove = false ;
		
		//rotate towards player rotation
		tParam += Time.deltaTime ;
		
		if ( tParam >= MOVE_FOR_SECONDS )
		{
			//now wait
			yield WaitForSeconds(WAIT_SECONDS_FOR_MOVEMENT) ;
			tParam = 0 ;
		}
		
		transform.localEulerAngles.z = Mathf.LerpAngle ( transform.localEulerAngles.z , runner.localEulerAngles.z , Time.deltaTime * LERP_VALUE ) ;
		
		shouldMove = true ;
	}
} 
