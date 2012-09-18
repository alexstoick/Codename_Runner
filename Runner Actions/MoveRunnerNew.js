#pragma strict
class MoveRunnerNew extends MonoBehaviour {
	
	static private var sphereGroup:Transform ;
	static private var cameraTransform:Transform ;
	static private var runner:GameObject ;
	static private var plane:Transform ;
			
	var materials:Material[] ;
	//materials[0] = goober
	//materials[1] = bash
	//materials[2] = slowdown
	
	static var rocksPool:SpawnPool ;
	static var prefab:Transform ;
	
	static private var haveToRotate:boolean ;
	static private var haveToRotateCamera:boolean ;

	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static public var doingLoop:int = 0 ;
	static private var loopEndingPosition:Quaternion = Quaternion ( 0 , 0 , 0 , 0 ) ;
	static private var startLoopX:float ;
	static private var loopLastTime:double ;
	static private var endingPos:Vector3 ;
	static private var loopStartingPosition:Quaternion; 


	function Start ( )
	{
		if ( ! cameraTransform )
			cameraTransform = GameObject.Find ( "Camera Group" ).transform ;
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ) ;
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools[ "Rocks" ] ;
		if ( ! prefab )
			prefab = rocksPool.prefabs [ "rock_for_loft" ] ;
	}
	
	public function action ( act:String )
	{
		switch ( act )
		{
			case "left": move ( true ) ; break ;
			case "right": move ( false ) ; break ;
			case "up": activateBash ( ); break ;
			case "down": slowdown ( ) ; break ;
			case "loopleft": loop ( true ) ; break ;
			case "loopright": loop ( false ) ; break ;
 		}
	}
	
	private function activateBash ( )
	{
//		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		CollisionHandler.bashOn = true ;
//		renderer.material = materials[1] ;
		LoftMovement.setHighSpeed () ;
		yield WaitForSeconds ( 0.4 ) ;
		LoftMovement.setNormalSpeed ( );
		yield WaitForSeconds ( 1.6 ) ;
//		renderer.material = materials[0] ;
		CollisionHandler.bashOn = false ;
	}
	
	private function slowdown ( )
	{
//		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
//		renderer.material = materials[2] ;
		LoftMovement.setLowSpeed ( ) ;
		yield WaitForSeconds ( 2.0 ) ;
//		renderer.material = materials[0] ;
		LoftMovement.setNormalSpeed ( );
	}

	private function loop ( left:boolean )
	{
		
		if ( left )
			endingPos = plane.localRotation.eulerAngles + Vector3 ( 180 , 0 , 0 ) ;
		else
			endingPos = plane.localRotation.eulerAngles - Vector3 ( 180 , 0 , 0 ) ;
			
		//loopEndingPosition = Quaternion.Euler ( Vector3 ( endingPos.x , endingPos.y , endingPos.z ) ) ;
		
		loopEndingPosition = Quaternion.Euler ( Vector3 ( 180f , 90f , 180f ) ) ;
		loopStartingPosition = plane.localRotation ;
		Debug.Log ( endingPos + "		" + plane.localRotation.eulerAngles + "		" + loopEndingPosition.eulerAngles ) ;
		startLoopX = plane.localRotation.eulerAngles.x ;
		loopLastTime = Time.time;
		doingLoop = 1 ;
	}
	
	private function move ( left:boolean )
	{
		var angle:int ;	
		var zInt:int ;
		
		if ( left )
		{
			angle = 15 ;
		}
		else
		{
			angle = -15 ;
		}
		ReturnToRotation.StartRotation ( angle * -1 ) ;

		if ( endingPosition == Vector3 ( 0 , 0 , 0 ) ) 
		{
			endingPosition = sphereGroup.localRotation.eulerAngles + Vector3 ( 0 , 0 ,  angle ) ;
		}
		else
		{ 
			endingPosition = endingPosition + Vector3 ( 0 , 0 , angle ) ; 
			zInt = (endingPosition.z / 15 ) ;
			endingPosition.z = zInt * 15 ;
		}
		haveToRotate = true ;
		delayCameraMovement ( ) ;
	}
	
	function delayCameraMovement ( )
	{
		haveToRotateCamera = true ;
	}
	
	function Update ( )
	{
		if ( Input.GetKeyDown ( KeyCode.LeftArrow) )
			action ( "left") ;
		if ( Input.GetKeyDown ( KeyCode.RightArrow) )
			action ( "right" ) ;
		if ( Input.GetKeyDown ( KeyCode.LeftControl ) )
			action ( "down" ) ;
		if ( Input.GetKeyDown ( KeyCode.LeftShift ) )
			action ( "up" ) ;
		if ( Input.GetKeyDown ( KeyCode.Backspace ) )
			action ( "loopleft" ) ;
			
		if ( Input.GetKeyDown ( KeyCode.UpArrow ) )
			LoftMovement.increaseSpeed ( ) ;
		if ( Input.GetKeyDown ( KeyCode.DownArrow ) )
			LoftMovement.decreaseSpeed ( ) ;
			
		if ( Input.GetKeyDown ( KeyCode.Space ) )
		{
			fire ( true ) ;
		}

		if ( haveToRotate && ! doingLoop ) 
		{
		
			var target:Quaternion = Quaternion.Euler (  Vector3 ( endingPosition.x , endingPosition.y , endingPosition.z ) ) ;

			if ( target.Equals ( sphereGroup.localRotation ) )
			{
				Debug.Log ( "hit the value" ) ;
				haveToRotate = false ;
				haveToRotateCamera = false ;
				return ;
			}
			Debug.Log ( "rotating big group" );
			sphereGroup.localRotation = Quaternion.Slerp( sphereGroup.localRotation , target, Time.deltaTime * 4 ) ;//Mathf.Sin( 0.08 * Mathf.PI * 0.5) ) ; 
		}
		if ( haveToRotateCamera && ! doingLoop )
		{
			Debug.Log ( "rotating camera" );
			cameraTransform.localRotation = Quaternion.Slerp ( cameraTransform.localRotation , target , Time.deltaTime*3.6 ) ;// Mathf.Sin ( 0.08* Mathf.PI * 0.45 ) ) ;
		}
		
		if ( doingLoop ) 
		{
			//plane.localRotation = Quaternion.Slerp ( plane.localRotation , loopEndingPosition , Time.deltaTime * 10 ) ;
			
			//plane.localRotation.eulerAngles = Vector3.Slerp ( plane.localRotation.eulerAngles , endingPos , Time.deltaTime * 10 ) ;
			var value:float = 10f ;
			
/*			if ( plane.localRotation.eulerAngles.x >= 90 )
				value = -10f ;
			else
				value = 10f ; */


			if ( doingLoop == 1 )
			{
				plane.localRotation.eulerAngles.x += value ;
				plane.localRotation.eulerAngles.y = 90 ;
				plane.localRotation.eulerAngles.z = 180 ;
				Debug.Log ( plane.localRotation.eulerAngles.x ) ;
			}
			if ( loopLastTime < Time.time )
				doingLoop = 2 ;
			
	/*		
			if ( ( ( loopEndingPosition.eulerAngles.x - 5 ) < plane.localRotation.eulerAngles.x  || 
				plane.localRotation.eulerAngles.x < ( loopEndingPosition.eulerAngles.x + 5) )&& doingLoop == 1 && loopLastTime + 0.1 < Time.time )
			{
				Debug.Log ( "started part II" ) ;
				loopEndingPosition = loopStartingPosition ;
				endingPos += Vector3 ( 180f , 0f , 0f ) ;
				doingLoop = 2 ;
			}
			if ( ( (startLoopX-5) < plane.localRotation.eulerAngles.x || plane.localRotation.eulerAngles.x < (startLoopX + 5) ) && doingLoop == 2 )
			{
				doingLoop = 0 ;
				Debug.Log ( "stopped loop" ) ;
			}*/
		}
	}
	
	function fire ( useTime:boolean )
	{
		var rock = rocksPool.Spawn ( prefab , transform.position , transform.localRotation ) ;
		var movement = rock.GetComponent ( RockMovementOnLoft ) ;
		movement.Init ( ) ;
	}

}