#pragma strict

class BossCrosshair extends MonoBehaviour {

	static var player:Transform ;
	static var crosshair:Transform ;
	
	function Start ( )
	{
		//Refferences to the player and boss target.
		if ( ! player )
			player = GameObject.Find ( "BigGroup" ).transform ;
		if ( ! crosshair ) 
			crosshair = GameObject.Find("BossTarget").transform;
			
	}
	
	function Update ( )
	{
		//Player & own rotation that are used to set up the boss.
		var playerRotation:int = player.localEulerAngles.z ;
		var ownRotation:int = transform.localEulerAngles.z ;
				
		var diff:double = playerRotation - ownRotation ;
		
		//If currently doing evasive maneuvers do not show the boss targeted area.
		if ( BossEvasiveAction.isMoving )
		{
			crosshair.gameObject.active = false ;
			return ;
		}
		
		//If the boss is far ahead do not show the boss targeted area.
		if ( BossMovementOnLoft.alpha > 0.30 )
		{
			crosshair.gameObject.active = false ;
			return ;
		}
		
		//If the difference between the two rotations if too big, 
		//do not show the boss targeted area.
		if ( diff > 40 || diff < -40 )
		{
			crosshair.gameObject.active = false ;
		}
		else
		{
			//Activate & place the crosshair on the correct coordinates.
			crosshair.gameObject.active = true ;
			diff /= 41 ;
			crosshair.localPosition.x = diff ;
		}
	}
}