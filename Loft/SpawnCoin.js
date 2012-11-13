#pragma strict

class SpawnCoin extends MonoBehaviour {

	static var loft:MegaShapeLoft ;
	static private var layer:MegaLoftLayerSimple ;

	function Awake ( )
	{
		if ( ! loft )
			loft = GameObject.Find ( "Loft").GetComponent ( MegaShapeLoft ) ;
		layer = loft.Layers[0];
	}
	
	function Update ( )
	{
	}

	public function position ( i:int , rotatie:float )
	{
		var at:Vector3 = Vector3.zero;
		var up:Vector3 = Vector3.zero;
		var right:Vector3 = Vector3.zero;
		var fwd:Vector3 = Vector3.zero;
			
		var p:Vector3 = layer.GetPosAndFrame( loft,  rotatie , 0.97 - i * 0.05f , 0.1f , at, up, right, fwd);
		Debug.Log ( rotatie ) ;
		var rot:Quaternion = Quaternion.LookRotation (fwd, right) ;
		
		transform.rotation = rot;

		transform.position = layer.transform.TransformPoint(p);		
	}
}