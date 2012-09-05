//#pragma strict

class ArrowControl extends MonoBehaviour {

	function updateAllArrows ( angle: int )
	{
		for ( var i = 0 ; i < transform.GetChildCount () ; ++ i )
		{
			var child = transform.GetChild ( i ) ;
			
			var rotationControl:RotationControl = child.GetComponent ( RotationControl ) ;
			
			rotationControl.UpdateAngle ( angle );
			
		}
	}
	function ArrowAndBox ( nume:String )
	{

		var name:String = "arrow" + nume.Substring ( 7 ) ;
		var child :Transform;
		var i:int ;

		var transforms = transform.GetComponentsInChildren(Transform);

		for ( i = 0 ; i < 24 ; ++ i )
		{		

    		for (var t : Transform in transforms)
	    	{
		    	if (t.name == name) 
		    	{
					//avem cubul potrivit
					child = t;
		    	}
			}
		}
		var rotationControl:RotationControl = child.GetComponent ( RotationControl ) ;
		rotationControl.destroyObjects ( ) ;
	}

}