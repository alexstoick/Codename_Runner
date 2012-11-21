#pragma strict

class BossEvasiveAction extends MonoBehaviour {

	//This values are pulled form Controller. See delayedDeactivation
	
	//Represents the starting value(going downwards) from which the boss will start to making evasive maneuvers.
	static var starting_HP_Percentage:float = 20; 
	
	//The number of bullets after which the plane will do the evasive maneuver.
	static var number_of_bullets:int = 6 ;
	
	//Will add to this value when a collision happens.
	static var current_number_of_bullets:int = 0.0 ;
	
	static public var isMoving:boolean = false ;
	
	//The target rotation for the maneuver.
	private var target:float ;
	
	function delayedDeactivation ( )
	{
		isMoving = false ;
	}
	
	function Update () 
	{
		if ( ( BossHealthBar.currHealth > starting_HP_Percentage || current_number_of_bullets < number_of_bullets ) && ! isMoving ) 
			return ;
		
		var val:float ;
		
		if ( ! isMoving )
		{
			val = Random.value;
			var modifier:int = 1 ;
			
			if ( val < 0.5 )
				modifier = -1 ;
			isMoving = true ;
			//Calculating the value for the target rotation.
			
			Debug.Log ( starting_HP_Percentage + "		" + number_of_bullets ) ;
			
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
			val = transform.localEulerAngles.z ;
			if ( target -1 < val && val < target + 1 )
				delayedDeactivation () ;
		}
		
	}
}