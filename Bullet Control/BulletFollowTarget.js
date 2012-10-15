#pragma strict

class BulletFollowTarget extends MonoBehaviour {

	private var target:int = 0 ;
	private var shouldLock:boolean = false ;
	private var lastTime:double ;

	function ResetLock ( )
	{
		shouldLock = false ;
	}

	function LockTarget ( targetNo:int )
	{
		target = targetNo ;
		shouldLock = true ;
		lastTime = Time.time + 100 ;
	}
	
	var tParam : float = 0;
	var speed: float = 0.1 ;



	
	function Update ( )
	{
		if ( lastTime < Time.time )
			shouldLock = false ;

		if ( shouldLock )
		{
		
    		tParam += Time.deltaTime * speed; //This will increment tParam based on Time.deltaTime multiplied by a speed multiplier
    		if ( MonsterVector.transforms.Count <= target )
    		{
    			shouldLock = false ;
    			return ;
    		}
    		//transform.position = Vector3.Lerp ( transform.position , MonsterVector.transforms[target].position , tParam ) ;
			var targetRotation:Quaternion = MonsterVector.transforms[target].localRotation ;
			targetRotation.eulerAngles.z += MonsterVector.angles[target] ;
//			Debug.Log ( targetRotation.eulerAngles.z ) ;
			transform.localRotation.eulerAngles.z = Mathf.LerpAngle ( transform.localRotation.eulerAngles.z , targetRotation.eulerAngles.z , tParam ) ;
		}
	}
}