#pragma strict
class MoveRunner extends MonoBehaviour {
	
	var movementVariation = 0.1 ;
	static private var currentPosition = 0 ;
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static private var createBullet:CreateBullet ;
	static private var haveToRotate:boolean ;
	static private var sphereGroup:Transform ;
	static private var lastTime:double; 
	static private var arrowControl:ArrowControl ;
	static private var runner:GameObject ;
	
	var materials:Material[] ;
	
	function Start ( )
	{
		if ( ! createBullet )
			createBullet = GameObject.Find ( "Bullet Control").GetComponent ( CreateBullet ) ;
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! arrowControl )
			arrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
		if ( ! runner )
			runner = GameObject.Find ( "Runner" ) ;
	}
	
	public function action ( act:String )
	{
		Debug.LogError ( act ) ;
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
		runner.gameObject.renderer.material = materials[1] ;
		yield WaitForSeconds ( 2.0 ) ;
		runner.gameObject.renderer.material = materials[0] ;
		
		//to be implemented

	}
	
	private function slowdown ( )
	{
		//to be implemented
		runner.gameObject.renderer.material = materials[2] ;
		yield WaitForSeconds ( 2.0 ) ;
		runner.gameObject.renderer.material = materials[0] ;
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
			++ currentPosition ;
			angle = 15 ;
		}
		else
		{
			-- currentPosition ;
			angle = -15 ;
		}

		arrowControl.updateAllArrows ( angle ) ;
		
		if ( endingPosition == Vector3 ( 0 , 0 , 0 ) ) 
		{
			//nu a fost definit
			endingPosition = sphereGroup.rotation.eulerAngles + Vector3 ( 0 , 0 ,  angle ) ;
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
		if ( Input.GetKeyDown ( KeyCode.Space ) )
			fire ( true ) ;
		if ( Input.GetKeyDown ( KeyCode.UpArrow ) )
			movementVariation += 0.1 ;
		if ( Input.GetKeyDown ( KeyCode.DownArrow ) )
			movementVariation -= 0.1 ;
			
		if ( haveToRotate ) 
		{
		
			var target:Quaternion = Quaternion.Euler (  Vector3 ( endingPosition.x , endingPosition.y , endingPosition.z ) ) ;

			if ( sphereGroup.rotation == target )
			{
				haveToRotate = false ;
				return ;
			}
			
			var time:int = 1.5 ;

			sphereGroup.rotation = Quaternion.Slerp( sphereGroup.rotation, target, Mathf.Sin( 0.08 * Mathf.PI * 0.5) ); 

		}
	}
	
	
	function jump ( useTime : boolean )
	{
		if ( useTime && lastTime == Time.time )
			return ;
			
		lastTime = Time.time;
	}
	
	function fire ( useTime:boolean )
	{
		if ( useTime && lastTime == Time.time )
			return ;
			
		lastTime = Time.time;
		
		createBullet.InstantiateBullet ( transform.position.z , Quaternion.Euler ( 0 , 0 , 0 ) ) ;
	}
	
	function FixedUpdate () //moving the Runner
	{
		transform.position.z += movementVariation ;
	}
	
}