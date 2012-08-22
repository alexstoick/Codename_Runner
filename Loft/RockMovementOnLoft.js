#pragma strict

class RockMovementOnLoft extends MonoBehaviour {

	var walk:MegaWalkLoft ;
	static var loft:MegaShapeLoft ;
	static var runner:Transform ;

	
	function Init ( )
	{
		transform.GetChild(0).localRotation = runner.localRotation ;
		walk.surfaceLoft = loft ;
		walk.surfaceLayer = 0 ;
		walk.alpha = 0.10300f ;
	}
	
	function Awake ( )
	{
		if ( !walk )
			walk = GetComponent ( MegaWalkLoft ) ;
		if ( ! loft )
			loft = GameObject.Find ( "Loft").GetComponent ( MegaShapeLoft ) ;
		if ( ! runner )
			runner = GameObject.Find ( "BigGroup" ).transform ;
	}
	


	function Update ( )
	{
		
		walk.alpha += LoftMovement.movementVariation* 2;
		
		//no longer bugging out.
		if ( walk.alpha >= 1 )
			walk.alpha = -1.0 ;
		if ( walk.alpha <= -1 )
			walk.alpha = 1.0 ;
	}
}