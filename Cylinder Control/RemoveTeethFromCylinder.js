#pragma strict

class RemoveTeethFromCylinder extends MonoBehaviour {

	
	static private var number = 0 ;
	private var MAX_ELIMINATI:int = 20 ; 
	var materials:Material[] ;
	private var last:int ; 
	static private var levelGen: LevelGeneration ;
	static private var ammoBoxSpawn:AmmoBoxSpawn ;
	
	function Start ( )
	{
		if ( ! levelGen )
			levelGen = GameObject.Find ( "Level Control"). GetComponent ( LevelGeneration ) ;
		if ( ! ammoBoxSpawn )
			ammoBoxSpawn = GameObject.Find ( "Ammo Box Control").GetComponent ( AmmoBoxSpawn ) ;
	}
	
	public function removeTeeth ( cilindru:Transform )
	{
	
		++number ;
		var child:Transform ;
		var level:Array ;
		
		level = levelGen.getLine ( number ) ;
		var i :int;
		var j :int;
//		Debug.LogWarning ( "removeTeeth:" + number ) ;
				
		var transforms = cilindru.GetComponentsInChildren(Transform);

		for ( i = 0 ; i < 24 ; ++ i )
		{		
    		var name:String = "Cube" + (i+1) ;
    		for (var t : Transform in transforms)
	    	{
		    	if (t.name == name) 
		    	{
					//avem cubul potrivit
					transformBox ( t , level[i] , cilindru.position.z ) ;
		    	}
			}
		}
	}
	
	private function transformBox ( box:Transform , code:int , zPos : int )
	{
		
		switch ( code )
		{
			case 0: 
				box.parent = null ;
				Destroy ( box.gameObject ) ;
				break ;
			case 1: break ;
			case 2:
				box.gameObject.renderer.material = materials[0] ;
				break ;
			case 3: box.gameObject.renderer.material = materials[1] ;
				break ;
			case 4:			
				ammoBoxSpawn.Spawn ( int.Parse ( box.name.Substring(4) ) , zPos ) ; 
				box.parent = null ;
				Destroy ( box.gameObject ) ;
				break;
			
		}
	}
	public function transformGate ( cilindru:Transform , level:Array )
	{
		++number ;
		var transforms = cilindru.GetComponentsInChildren(Transform);

		for ( var i = 0 ; i < 24 ; ++ i )
			if ( level[i] == 3)
			{		
	    		var name:String = "Cube" + (i+1) ;
	    		for (var t : Transform in transforms)
		    	{
			    	if (t.name == name) 
			    	{
						//avem cubul potrivit
						transformBox ( t , level[i] , cilindru.position.z ) ;
			    	}
				}
			}

	}
}