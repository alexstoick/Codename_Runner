#pragma strict

class BossCrosshair extends MonoBehaviour {

	static var player:Transform ;
	static var crosshair:Transform ;
	
	function Start ( )
	{
		if ( ! player )
			player = GameObject.Find ( "BigGroup" ).transform ;
		if ( ! crosshair ) 
			crosshair = GameObject.Find("BossTarget").transform;
			
	}
	
	function Update ( )
	{
		var playerRotation:int = player.localEulerAngles.z ;
		var ownRotation:int = transform.localEulerAngles.z ;
				
		var diff:double = playerRotation - ownRotation ;
		if ( diff > 40 || diff < -40 )
		{
			crosshair.gameObject.active = false ;
		}
		else
		{
			crosshair.gameObject.active = true ;
			diff /= 41 ;
			crosshair.localPosition.x = diff ;
		}
	}
}