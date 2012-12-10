#pragma strict

class SpawnCoin extends MonoBehaviour {

	static var loft:MegaShapeLoft ; //link to the loft
	static private var layer:MegaLoftLayerSimple ; //the layer on which we will spawn the coin

	function Awake ( )
	{
		//Initializations
		if ( ! loft )
			loft = GameObject.Find ( "Loft").GetComponent ( MegaShapeLoft ) ;
		layer = loft.Layers[0];
	}

	// i: the coin number so they are spawned at distance from the turret (which right now is at 0.99)
	// rotatie: the random number used for the turret crossalpha (so the coins are on the same row)
	public function position ( i:int , rotatie:float )
	{
		var at:Vector3 = Vector3.zero;
		var up:Vector3 = Vector3.zero;
		var right:Vector3 = Vector3.zero;
		var fwd:Vector3 = Vector3.zero;
		
		var p:Vector3 = layer.GetPosAndFrame( loft,  rotatie , 0.97 - i * 0.05f , 0.1f , at, up, right, fwd);
		var rot:Quaternion = Quaternion.LookRotation (fwd, right) ;
		
		transform.rotation = rot;

		transform.position = layer.transform.TransformPoint(p);		
	}
}