#pragma strict

class BulletFollowTarget extends MonoBehaviour {

	//Whether this rocket has a target or not.
	private var shouldLock:boolean = false ;
	
	//The target name and the position it has in the 
	//vector. (used to get a pointer to the position vector).
	private var targetName:String ;
	private var target:int = 0 ;

	//Influences the speed with which the rocket moves
	//towards its target.
	var tParam : float = 0;
	var speed: float = 0.1 ;


	function ResetLock ( )
	{
		shouldLock = false ;
	}

	function LockTarget ( targetNo:int )
	{
		target = targetNo ;
		shouldLock = true ;
		tParam = 0 ;
		targetName = MonsterVector.transforms[target].parent.name ;
	}
	
	function Update ( )
	{
		if ( shouldLock )
		{
			//This will increment tParam based on Time.deltaTime multiplied by a speed multiplier
    		tParam += Time.deltaTime * speed; 
    		//Checks if the target is still there, or if we have to look for it.
    		if ( MonsterVector.transforms.Count <= target || ! targetName.Equals ( MonsterVector.transforms[target].parent.name ) )
    		{
    		
    			var found:boolean = false ;
    			//Searching for our target.
    			for ( var i:int = 0 ; i < MonsterVector.transforms.Count ; ++ i )
    			{
    				if ( targetName.Equals ( MonsterVector.transforms[i].parent.name) )
    				{
    					found = true ;
    					target = i ;
    					break ;
    				}
    			}
    			if ( ! found )   			
    			{
    				//If we have not found our target then the rocket gets unlocked and
    				//continues on the same path.
    				shouldLock = false ;
    				return ;
    			}
    		}
    		
    		//We have a target, therefore animating the missle towards it.
			var targetRotation:Quaternion = MonsterVector.transforms[target].localRotation ;
			targetRotation.eulerAngles.z += MonsterVector.angles[target] ;
			transform.localRotation.eulerAngles.z = Mathf.LerpAngle ( transform.localRotation.eulerAngles.z , targetRotation.eulerAngles.z , tParam ) ;
		}
	}
}