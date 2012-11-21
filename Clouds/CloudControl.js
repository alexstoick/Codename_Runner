#pragma strict

class CloudControl extends MonoBehaviour {

	var particleSys:ParticleEmitter ;

	function Start () 
	{
		particleSys = transform.GetComponent ( ParticleEmitter ) ;
	}

	function Update () 
	{
		if ( LoftMovement.isStopped () )
			particleSys.emit = false ;
		else
			particleSys.emit = true ;
			
	}

}