#pragma strict

class DamageSmoke extends MonoBehaviour {

	//This class will control the smoke size from the smoke element inside 
	//the plane object.
	
	var particleSys:ParticleEmitter ;
	
	function Start ( )
	{
		particleSys = transform.GetComponent ( ParticleEmitter ) ;
	}
	
	function Update ( )
	{
		particleSys.maxSize = 1.5  - HealthProgressBar.currHealth / 66.6 ;
	}
	
}