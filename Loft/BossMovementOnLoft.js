#pragma strict

class BossMovementOnLoft extends MonoBehaviour {

	//Moves the boss along the loft so that it approaches the player.

	static var loft:MegaShapeLoft ;
	private var addVariation:double = 0.0004 ;
	static public var shouldMove:boolean = true ;
	static public var alpha:double = 0.000 ;
	private var layer:MegaLoftLayerSimple ;

	function Start ( )
	{
		shouldMove = true ;
	}
		
	function Awake ( )
	{
		if ( ! loft )
			loft = GameObject.Find ( "Loft").GetComponent ( MegaShapeLoft ) ;
		layer = loft.Layers[0];
		alpha = 0.99 ;
	}
	
	function Update ( )
	{

		if ( alpha <= 0.25 )
			shouldMove = false ;

		if ( shouldMove )
			alpha -= 0.003 ;
			
		if ( alpha >= 1 )
			alpha = -1.0 ;
		if ( alpha <= -1 )
			alpha = 1.0 ;
		
		var at:Vector3 = Vector3.zero;
		var up:Vector3 = Vector3.zero;
		var right:Vector3 = Vector3.zero;
		var fwd:Vector3 = Vector3.zero;
			
		var p:Vector3 = layer.GetPosAndFrame( loft,  0f , alpha, 0.1f , at, up, right, fwd);
		
		var rot:Quaternion = Quaternion.LookRotation (fwd, right) ;
		
		transform.rotation = rot;

		transform.position = layer.transform.TransformPoint(p);
	}
}