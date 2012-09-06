#pragma strict

class DistanceBar extends MonoBehaviour {

	static var trs:Transform ;
	
	function Start ( )
	{
		trs = transform ;
	}

	function Update  ( )
	{
		if ( ! LoftMovement.isStopped () )
			trs.renderer.material.SetFloat ( "_Cutoff" , GiantControl.distance / 2.0f / 100 ) ;
	}
}