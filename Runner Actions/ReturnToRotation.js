#pragma strict

class ReturnToRotation extends MonoBehaviour {

	static var planeInit:Quaternion = Quaternion.Euler ( 0 , 90 , 180 ) ;
	static var targetRotation:Quaternion = Quaternion.Euler ( 0 , 90 , 180 ) ; 
	static var doRotate:boolean = false ;
	static var lastTime:double ;
	
	//Audio source that plays the looping sound
	private var audioSource:AudioSource;
	
	function Start ( )
	{
		if ( ! audioSource ) 
			audioSource = transform.GetComponent ( AudioSource ) ;
	}

	static function StartRotation ( xRot:int )
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
			
		var unghi:float ;
		
		if ( transform.localEulerAngles.x > 100 )
			unghi = 360 - transform.localEulerAngles.x ;
		else
			unghi = transform.localEulerAngles.x;			
			
		audioSource.pitch = 1 + 0.03333333333333 * unghi ;

		
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
		{
			transform.localRotation = Quaternion.Slerp ( transform.localRotation ,  planeInit , Time.deltaTime * 2 ) ;
		}
	}
}