#pragma strict
class MoveRunnerNew extends MonoBehaviour {
	
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static private var haveToRotate:boolean ;
	static private var sphereGroup:Transform ;
	static private var lastTime:double; 
	static private var runner:GameObject ;
	
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
		}
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
		
		Debug.Log ( left + " " + Time.time ) ;
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