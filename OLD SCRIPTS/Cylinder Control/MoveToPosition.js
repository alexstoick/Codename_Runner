#pragma strict

class MoveToPosition extends MonoBehaviour {

	private var firstX:double = 2 ;
	
	function Update ( )
	{
		if ( transform.position.x < 0.1 )
		{
			transform.position.x = 0 ;

		}
		transform.position = Vector3.Slerp( transform.position, Vector3 ( 0 , 0 , transform.position.z ) , Mathf.Sin ( Time.deltaTime * firstX ) );
	}

}
