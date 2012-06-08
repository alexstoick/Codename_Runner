#pragma strict

class BulletVector extends MonoBehaviour {

	var Bullets:GameObject[] ;
	private var MAX_BULLETS:int = 5 ; 
	private var isActive:boolean[] = new boolean[MAX_BULLETS] ;
	
	public function availableBullet ( )
	{
		for ( var i = 0 ; i < MAX_BULLETS ; ++ i )
			if ( isActive [i] )
				return true ;

		return false ;
	}
	
	public function deactivateBullet ( )
	{
		var i:int ;
		for ( i = MAX_BULLETS - 1  ; i >= 0 ; -- i )
			if ( isActive[i] )
			{
				setBullet ( i , false ) ;
				return ;
			}
	}
	
	private function setBullet ( indice:int , stare:boolean )
	{
		var renderers = Bullets[indice].GetComponentsInChildren ( Renderer ) ;

		for ( var r: Renderer in renderers )
			r.enabled = stare ;
		isActive[indice] = stare ;
	}
	
	public function initializeBullets ( ) 
	{
		var i:int ;
		
		for ( i = 0 ; i < MAX_BULLETS ; ++ i )
			setBullet ( i , true ) ;
	}
	
	public function Start ( )
	{
		initializeBullets ( ) ;
	}
}