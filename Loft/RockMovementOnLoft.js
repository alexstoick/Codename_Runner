#pragma strict

class RockMovementOnLoft extends MonoBehaviour {

	var walk:MegaWalkLoft ;
	static var loft:MegaShapeLoft ;
	static var runner:Transform ;
	private var addVariation:double = 0.0004 ;
	var copil:Transform ;
	
	function Init ( speed:double )
	{
		transform.GetChild(0).localRotation = runner.localRotation ;
		walk.surfaceLoft = loft ;
		walk.surfaceLayer = 0 ;
		addVariation = speed ;
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
		
		walk.alpha += Mathf.Max ( 0.0004 , 0.0006 - LoftMovement.acceleration - LoftMovement.movementVariation) ;

		if ( walk.alpha >= 1 )
			walk.alpha = -1.0 ;
		if ( walk.alpha <= -1 )
			walk.alpha = 1.0 ;
	}
}