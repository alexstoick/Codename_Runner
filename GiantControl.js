#pragma strict

class GiantControl extends MonoBehaviour {

	var distance: float = 100 ;
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
			distance = Mathf.Min ( distance , 200 ) ;
			Debug.Log ( (LoftMovement.movementVariation + LoftMovement.acceleration)*1000  + " " + distance ) ;
		}
		if ( distance < 100 )
		{
 			   cameraTransform.localRotation = Quaternion.Euler( 335 + Mathf.PingPong(Time.time * 30.0, 15.0), 0.0 , 180.0 );
		}
		else
			cameraTransform.localRotation = Quaternion.Euler ( 339 , 0.0 , 180.0 ) ;
	}
}