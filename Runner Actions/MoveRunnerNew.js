#pragma strict
class MoveRunnerNew extends MonoBehaviour {
	
	static private var sphereGroup:Transform ;
	static private var cameraTransform:Transform ;
	static private var plane:Transform ;
	static private var planeHolder:Transform ;
			
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
	
	static private var cameraValue:float ;
	static private var planeValue:float ;



	function Start ( )
	{
		if ( ! cameraTransform )
			cameraTransform = GameObject.Find ( "Camera Group" ).transform ;
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! plane )
			plane = GameObject.Find ( "plane" ).transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools[ "Rocks" ] ;
		if ( ! prefab )
			prefab = rocksPool.prefabs [ "rock_for_loft" ] ;
		if ( ! planeHolder )
			planeHolder = GameObject.Find ( "Plane Holder" ).transform ;
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
			planeValue = 10f ;
		else
			planeValue = -10f ;

		cameraValue = 2f ;
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
				haveToRotate = false ;
				haveToRotateCamera = false ;
				return ;
			}
			sphereGroup.localRotation = Quaternion.Slerp( sphereGroup.localRotation , target, Time.deltaTime * 4 ) ;//Mathf.Sin( 0.08 * Mathf.PI * 0.5) ) ; 
		}
		if ( haveToRotateCamera && ! doingLoop )
		{
			cameraTransform.localRotation = Quaternion.Slerp ( cameraTransform.localRotation , target , Time.deltaTime*3.6 ) ;// Mathf.Sin ( 0.08* Mathf.PI * 0.45 ) ) ;
		}
		
		if ( doingLoop ) 
		{
			if ( doingLoop == 1 )
			{
				if ( planeHolder.localRotation.eulerAngles.z >= 345 )
				{
					doingLoop = 0 ;
					planeHolder.localRotation.eulerAngles.z = 360 ;
					return ;
				}
				planeHolder.localRotation.eulerAngles.z += planeValue ;
			}
		}
	}
	
	function fire ( useTime:boolean )
	{
		var rock = rocksPool.Spawn ( prefab , transform.position , transform.localRotation ) ;
		var movement = rock.GetComponent ( RockMovementOnLoft ) ;
		movement.Init ( ) ;
	}

}