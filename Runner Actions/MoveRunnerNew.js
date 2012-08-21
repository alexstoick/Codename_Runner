#pragma strict
class MoveRunnerNew extends MonoBehaviour {
	
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static private var haveToRotate:boolean ;
	static private var sphereGroup:Transform ;
	static private var lastTime:double; 
	static private var runner:GameObject ;
	
	var materials:Material[] ;
	//materials[0] = goober
	//materials[1] = bash
	//materials[2] = slowdown
	
	function Start ( )
	{
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ) ;
	}
	
	public function action ( act:String )
	{
		switch ( act )
		{
			case "left": move ( true ) ; break ;
			case "right": move ( false ) ; break ;
			case "up": activateBash ( ); break ;
			case "down": slowdown ( ) ; break ;
		}
	}
	
	private function activateBash ( )
	{
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		CollisionHandler.bashOn = true ;
		renderer.material = materials[1] ;
		LoftMovement.setHighSpeed () ;
		yield WaitForSeconds ( 0.4 ) ;
		LoftMovement.setNormalSpeed ( );
		yield WaitForSeconds ( 1.6 ) ;
		renderer.material = materials[0] ;
		CollisionHandler.bashOn = false ;
		//to be implemented

	}
	
	private function slowdown ( )
	{
		//to be implemented
		var renderer:Renderer = runner.gameObject.GetComponentInChildren ( Renderer ) ;
		renderer.material = materials[2] ;
		LoftMovement.setLowSpeed ( ) ;
		yield WaitForSeconds ( 2.0 ) ;
		renderer.material = materials[0] ;
		LoftMovement.setNormalSpeed ( );
	}

	
	
	private function move ( left:boolean )
	{
		var angle:int ;	

		if ( lastTime == Time.time )
		{
			Debug.LogError ( "refused move; time: " + Time.time ) ;
			return ;
		}
			
		lastTime = Time.time;

		
		if ( left )
		{
			angle = 15 ;
		}
		else
		{
			angle = -15 ;
		}
		
		if ( endingPosition == Vector3 ( 0 , 0 , 0 ) ) 
		{
			//nu a fost definit
			endingPosition = sphereGroup.localRotation.eulerAngles + Vector3 ( 0 , 0 ,  angle ) ;
		}
		else
		{ 
			//adaugam la pozitia la care trebuie sa ajunga 
			endingPosition = endingPosition + Vector3 ( 0 , 0 , angle ) ; 
			var zInt:int = (endingPosition.z / 15 ) ;
			endingPosition.z = zInt * 15 ;
		}
		haveToRotate = true ;
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

		
		if ( haveToRotate ) 
		{
		
			var target:Quaternion = Quaternion.Euler (  Vector3 ( endingPosition.x , endingPosition.y , endingPosition.z ) ) ;

			if ( sphereGroup.localRotation == target )
			{
				haveToRotate = false ;
				return ;
			}
			
			sphereGroup.localRotation = Quaternion.Slerp( sphereGroup.localRotation , target, Mathf.Sin( 0.08 * Mathf.PI * 0.5) ); 
		}
	}
}