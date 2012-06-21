#pragma strict

class SmoothMove extends MonoBehaviour {

	private var shouldMove:boolean = false ;
	
	function goActive ( )
	{
		shouldMove = true ;
	}

	static var target:Quaternion = Quaternion.Euler ( Vector3 ( 0 , 0 , 15 ) ) ;
	
	function Update ( )
	{
	
		if ( shouldMove )
		{
			if ( transform.rotation == target )
			{
				shouldMove = false ;
				return ;
			}
			transform.rotation = Quaternion.Slerp( transform.rotation, target, Time.deltaTime * 4 );
		}
	}

}