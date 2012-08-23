#pragma strict

class BulletMovementOnLoft extends MonoBehaviour {

	var walk:MegaWalkLoft ;
	static var loft:MegaShapeLoft ;
	
	function Init ( rotation , startPoint  )
	{
		transform.GetChild(0).localRotation = rotation ;
		walk.surfaceLoft = loft ;
		walk.surfaceLayer = 0 ;
		walk.alpha = startPoint ;//0.10300f ;
	}
	
	function Awake ( )
	{
		if ( !walk )
			walk = GetComponent ( MegaWalkLoft ) ;
		if ( ! loft )
			loft = GameObject.Find ( "Loft").GetComponent ( MegaShapeLoft ) ;
	}
	
	function Update ( )
	{
	
		walk.alpha -= LoftMovement.movementVariation * 2 ;
		
		//no longer bugging out.
		if ( walk.alpha >= 1 )
			walk.alpha = -1.0 ;
		if ( walk.alpha <= -1 )
			walk.alpha = 1.0 ;
	}
}