#pragma strict

class ReturnToRotation extends MonoBehaviour {

	static var planeInit:Quaternion = Quaternion.Euler ( 0 , 90 , 180 ) ;
	static var targetRotation:Quaternion = Quaternion.Euler ( 0 , 90 , 180 ) ; 
	static var doRotate:boolean = false ;
	static var lastTime:double ;

	static function StartRotation ( xRot:int , abc:boolean)
	{

		targetRotation.eulerAngles.x += xRot ;
		var rot = targetRotation.eulerAngles.x ;
		if ( rot > 180 )
			rot = rot - 360 ;
		if ( -60 > rot  )
			targetRotation.eulerAngles.x = -60 ;
		else
			if ( rot > 60 )
				targetRotation.eulerAngles.x = 60 ;
				
		doRotate = true ;
		lastTime = Time.time ;
	}

	function Update ( )
	{
		if ( MoveRunnerNew.doingLoop )
			return ;
		if ( doRotate )
		{
			transform.localRotation = Quaternion.Slerp ( transform.localRotation , targetRotation , Time.deltaTime * 4 ) ;
			if ( lastTime + 0.7 < Time.time )
			{
				targetRotation.eulerAngles.x = 0 ;
				doRotate = false ;
			}
		}
		else
			transform.localRotation = Quaternion.Slerp ( transform.localRotation ,  planeInit , Time.deltaTime * 2 ) ;
	}
}