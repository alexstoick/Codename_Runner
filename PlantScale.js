#pragma strict

class PlantScale extends MonoBehaviour {

	static var targetScale = Vector3 ( 60 , 60 , 60 ) ;

	function Update ( )
	{
		transform.localScale = Vector3.Slerp ( transform.localScale , targetScale , Time.deltaTime ) ;
	}


}