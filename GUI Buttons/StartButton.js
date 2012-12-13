#pragma strict

class StartButton extends MonoBehaviour {
	
	static var Started:boolean = false ;

	function OnGUI()
	{
		if ( Started )
			return ;

		if(GUI.Button(Rect(Screen.width/4, Screen.width/3*2, Screen.width/2, Screen.height/3 ), "Start"))
		{
			Started = true ;
			GameOver.gText.text = "" ;
			LoftMovement.isDead = false ;
			
			HealthProgressBar.targetHealth = 100.0 ;
			HealthProgressBar.currHealth = 100.0 ;
			
			FuelProgressBar.targetFuel = 100.0 ;
			FuelProgressBar.currFuel = 100.0 ;
			
			LoftMovement.acceleration = 0.0000 ;
			LoftMovement.timeModifier = 0.5 ;
			LoftMovement.setNormalSpeed ( ) ;
			Controller.bossNumber = -1 ;
			SpawnBoss.shouldCountTime = true ;
			SpawnBoss.playerCrosshair.SetActiveRecursively(true);
			
			//Set all missiles to true
			RocketAvailable.setAllTrue () ;
			
			//Show the plane
			CollisionHandler.plane.gameObject.active = true ;
			DamageSmoke.doNotEmit = false ;
		}
	}

}