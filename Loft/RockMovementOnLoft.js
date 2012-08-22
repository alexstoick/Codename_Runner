#pragma strict

class RockMovementOnLoft extends MonoBehaviour {

	var walk:MegaWalkLoft ;
	public static var moveSpeed : double = 0.0002 ;
	static var loft:MegaShapeLoft ;
	static var runner:Transform ;

	
	function Init ( )
	{
		walk.surfaceLoft = loft ;
		walk.surfaceLayer = 0 ;
		walk.alpha = 0.100f ;
		transform.GetChild(0).localRotation = runner.localRotation ;
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

		walk.alpha += moveSpeed ;
		
		//no longer bugging out.
		if ( walk.alpha >= 1 )
			walk.alpha = -1.0 ;
		if ( walk.alpha <= -1 )
			walk.alpha = 1.0 ;
	}
}