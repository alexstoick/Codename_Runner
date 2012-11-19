#pragma strict

class BossEvasiveAction extends MonoBehaviour {

	//This can be set from the inspector. 
	//Represents the starting value(going downwards) from which the boss will start to making evasive maneuvers.
	public var starting_HP_Percentage:float ; 
	
	//The number of bullets after which the plane will do the evasive maneuver.
	public var number_of_bullets:int ;
	
	//Will add to this value when a collision happens.
	static var current_number_of_bullets:int = 0.0 ;
	
	static public var isMoving:boolean = false ;
	
	//The target rotation for the maneuver.
	private var target:float ;
	
	function delayedDeactivation ( )
	{
		yield WaitForSeconds ( 1 ) ;
		isMoving = false ;
	}
	
	function Update () 
	{
		if ( ( BossHealthBar.currHealth > starting_HP_Percentage || current_number_of_bullets < number_of_bullets ) && ! isMoving ) 
			return ;
		
		var val:float ;
		
		if ( ! isMoving )
		{
			Controller.bossNumber ++ ;
			if ( Controller.bossNumber >= 5 )
				Controller.bossNumber = 4 ;
				
			number_of_bullets = Controller.bossBullets [ Controller.bossNumber ] ;
			starting_HP_Percentage = Controller.bossHP [ Controller.bossNumber ] ;
			
			val = Random.value;
			var modifier:int = 1 ;
			
			if ( val < 0.5 )
				modifier = -1 ;
			isMoving = true ;
			//Calculating the value for the target rotation.
			target = transform.localEulerAngles.z + modifier * 100 ; 
			
			if ( target < 0 )
				target += 360 ;
			if ( target > 360 )
				target -= 360 ;
			current_number_of_bullets = 0 ;
		}
		else
		{
			//5 is high enough so the movement will get the plane away from the player's shooting radius.
			transform.localEulerAngles.z = Mathf.LerpAngle ( transform.localEulerAngles.z , target , Time.deltaTime * 4 ) ; 
			val = Mathf.Clamp ( transform.localEulerAngles.z , target -5  , target + 5 ) ;
			if ( val == transform.localEulerAngles.z )
			{
				delayedDeactivation ( ) ;
			}
		}
		
	}
}