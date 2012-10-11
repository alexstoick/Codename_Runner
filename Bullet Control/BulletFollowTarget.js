#pragma strict

class BulletFollowTarget extends MonoBehaviour {

	private var target:int = 0 ;
	private var shouldLock:boolean = false ;

	function LockTarget ( targetNo:int )
	{
		shouldLock = true ;
		target = targetNo ;
	}
	
	function Update ( )
	{
		if ( shouldLock )
		{
			var targetRotation:Quaternion = MonsterVector.transforms[target].localRotation ;
			targetRotation.eulerAngles.z += MonsterVector.angles[target] ;

			transform.localRotation = Quaternion.Slerp ( transform.localRotation , targetRotation , Time.deltaTime * 4 ) ;
		}
	}
}