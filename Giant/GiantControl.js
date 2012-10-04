#pragma strict

class GiantControl extends MonoBehaviour {

	static public var distance: float = 200 ;
	static private var cameraTransform:Transform ;
	
	function Start ( )
	{
		cameraTransform  = GameObject.Find ( "Main Camera" ).transform ;
	}
	
	function Update ( )
	{
		if ( ! LoftMovement.isStopped ( ) )
		{	
			distance += ( ( LoftMovement.movementVariation + LoftMovement.acceleration ) - 0.0003 ) * 2500 ;
			distance = Mathf.Min ( distance , 100 ) ;
		}
		if ( distance < 0 )
		{
			GameOver.Dead ( );
			return ;
		}
		if ( distance < 50 )
		{
 			   cameraTransform.localRotation = Quaternion.Euler( 335 + Mathf.PingPong(Time.time * 30.0, 1.5), 0.0 , 180.0 );
		}
	}
}