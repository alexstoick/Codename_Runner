#pragma strict
class MoveRunner extends MonoBehaviour {
	
	var movementVariation = 0.1 ;
	static private var teethPositions: TeethPositions ;
	static private var currentPosition = 0 ;
	static private var smoothFollow:SmoothFollow ;
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	static private var createBullet:CreateBullet ;
	static private var haveToRotate:boolean ;
	static private var sphereGroup:Transform ;
	static private var lastTime:double; 
	static private var arrowControl:ArrowControl ;
	
	function Start ( )
	{
		if ( ! teethPositions )
			teethPositions = GameObject.Find ( "Main Camera" ).GetComponent ( TeethPositions ) ;
		if ( ! createBullet )
			createBullet = GameObject.Find ( "Bullet Control").GetComponent ( CreateBullet ) ;
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! arrowControl )
			arrowControl = GameObject.Find ( "Arrows").GetComponent ( ArrowControl ) ;
	}
	
	function move ( left:boolean , right:boolean )
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
//			Debug.Log ( "MOVING RUNNER LEFT!" + currentPosition) ;
			angle = 15 ;
		}
		else
		{
//			Debug.Log ( "MOVING RUNNER RIGHT!" + currentPosition ) ;
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
			move ( true , false ) ;
		if ( Input.GetKeyDown ( KeyCode.RightArrow) )
			move ( false , true ) ;
		if ( Input.GetKeyDown ( KeyCode.Space ) )
			fire ( ) ;
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

		    //sphereGroup.rotation = Quaternion.Lerp(sphereGroup.rotation, target, Mathf.SmoothStep(0.0, 1.0, Mathf.SmoothStep(0.0, 1.0, Time.deltaTime * 0.5)));

			sphereGroup.rotation = Quaternion.Slerp( sphereGroup.rotation, target, Mathf.Sin( 0.08 * Mathf.PI * 0.5) ); //Time.deltaTime * 4 );

		}
	}
	
	
	function jump ( )
	{
		if ( lastTime == Time.time )
			return ;
			
		lastTime = Time.time;

//		Debug.Log ( "JUMPING!" ) ;
	}
	
	function fire ( )
	{
//		if ( lastTime == Time.time )
//			return ;
			
//		lastTime = Time.time;
		
//		Debug.Log ( "FIRE!") ;
		createBullet.InstantiateBullet ( transform.position.z , Quaternion.Euler ( 0 , 0 , 0 ) ) ;
	}
	
	function FixedUpdate () //moving the Runner
	{
		transform.position.z += movementVariation ;
	}
	
}