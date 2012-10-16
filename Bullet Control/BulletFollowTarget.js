#pragma strict

class BulletFollowTarget extends MonoBehaviour {

	private var target:int = 0 ;
	private var shouldLock:boolean = false ;
	private var lastTime:double ;
	private var targetName:String ;

	function ResetLock ( )
	{
		shouldLock = false ;
	}

	function LockTarget ( targetNo:int )
	{
		target = targetNo ;
		shouldLock = true ;
		lastTime = Time.time + 100 ;
		tParam = 0 ;
		targetName = MonsterVector.transforms[target].parent.name ;
	}
	
	var tParam : float = 0;
	var speed: float = 0.1 ;



	
	function Update ( )
	{
		if ( lastTime < Time.time )
			shouldLock = false ;

		if ( shouldLock )
		{
		
    		tParam += Time.deltaTime * 1 ;//* speed; //This will increment tParam based on Time.deltaTime multiplied by a speed multiplier
    		if ( MonsterVector.transforms.Count <= target || ! targetName.Equals ( MonsterVector.transforms[target].parent.name ) )
    		{
    		
				// + targetName + "		" + MonsterVector.transforms[target].parent.name + "		" + targetName.Equals ( MonsterVector.transforms[target].parent.name ) ) ;// (MonsterVector.transforms[target].name != targetName) ) ;
    			//Debug.Log ( MonsterVector.transforms.Count + "		" + target + "		" + (MonsterVector.transforms.Count <= target) ) ;
    			var found:boolean = false ;
    			for ( var i:int = 0 ; i < MonsterVector.transforms.Count ; ++ i )
    			{
    				//Debug.Log ( targetName + "		" + MonsterVector.transforms[i].parent.name + "		" + targetName.Equals ( MonsterVector.transforms[i].parent.name ) ) ;
    				if ( targetName.Equals ( MonsterVector.transforms[i].parent.name) )
    				{
    					found = true ;
    					target = i ;
    					break ;
    				}
    			}
    			if ( ! found )   			
    			{
	    			Debug.LogWarning ( "lost target	" + targetName + "		" + Time.time ) ;
    				shouldLock = false ;
    				return ;
    			}
    		}
    		//transform.position = Vector3.Lerp ( transform.position , MonsterVector.transforms[target].position , tParam ) ;
			var targetRotation:Quaternion = MonsterVector.transforms[target].localRotation ;
			targetRotation.eulerAngles.z += MonsterVector.angles[target] ;
//			Debug.Log ( targetRotation.eulerAngles.z ) ;
			transform.localRotation.eulerAngles.z = Mathf.LerpAngle ( transform.localRotation.eulerAngles.z , targetRotation.eulerAngles.z , tParam ) ;
		}
	}
}