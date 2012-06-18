#pragma strict

class SmoothMove extends MonoBehaviour {

	var shouldMove:boolean = false ;
	
	function goActive ( )
	{
		shouldMove = true ;
	}
	
	private var target:Quaternion = Quaternion.Euler (  Vector3 ( 0 , 0 , 15 ) ) ;

	
	function Update ( )
	{
		if ( ! transform.gameObject.active )
		{
			Debug.LogError ( "Deactive object => shouldMove false" );
			shouldMove = false ;
		}
		
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