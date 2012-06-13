#pragma strict

class BulletVector extends MonoBehaviour {

	private var MAX_BULLETS:int = 5 ; 
	private var usedBullets:int = 0 ;
	
	public function availableBullet ( )
	{
		if ( usedBullets < MAX_BULLETS )
			return true ;
	}
	
	public function deactivateBullet ( )
	{
 		++ usedBullets ;
	}
	
	public function initializeBullets ( ) 
	{
		usedBullets = 0 ;
	}
	
	public function Start ( )
	{
		initializeBullets ( ) ;
	}
}