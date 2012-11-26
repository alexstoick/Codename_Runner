#pragma strict

class StartButton extends MonoBehaviour {
	
	static var Started:boolean = false ;

	function OnGUI()
	{
		if ( Started )
			return ;

		if(GUI.Button(Rect(100, 500, 150, 150), "Start"))
		{
			Started = true ;
			GameOver.gText.text = "" ;
			LoftMovement.isDead = false ;
			GiantControl.distance = 100 ;
			HealthProgressBar.currHealth = 100 ;
			FuelProgressBar.currFuel = 100 ;
			LoftMovement.acceleration = 0.0000 ;
			LoftMovement.timeModifier = 0.5 ;
			LoftMovement.setNormalSpeed ( ) ;
			Controller.bossNumber = -1 ;
			SpawnBoss.shouldCountTime = true ;
			
			//Show the plane
			CollisionHandler.plane.gameObject.active = true ;
			DamageSmoke.doNotEmit = false ;
		}
	}

}