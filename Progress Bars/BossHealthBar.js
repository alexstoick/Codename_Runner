#pragma strict

class BossHealthBar extends MonoBehaviour {

	var texInner: Texture2D; 
	var texCurr: Texture2D; 
	
	private var fullRect: Rect = new Rect ( Screen.width/2 - Screen.width/6 , 0 , Screen.width/3 , Screen.height/25 ) ; 
	static var currHealth: float = 100.0; 
	
	static var playerCrosshair:GameObject ;
	
	function Awake ( )
	{
		if ( ! playerCrosshair ) 
			playerCrosshair = GameObject.Find ( "CrosshairPlane" ) ;
	}

	function OnGUI()
	{ 
		if ( ! Controller.showBossHealthBar )
			return ;
			
		currHealth = Mathf.Clamp ( currHealth , 0 , 100 ) ;
		var healthFrac:float = currHealth / 100 ; 
		
		var currRect = Rect(fullRect.x, fullRect.y, fullRect.width * healthFrac, fullRect.height); 
		var innerRect = Rect(fullRect.x, fullRect.y, fullRect.width, fullRect.height); 
		
		GUI.DrawTexture(innerRect, texInner);
		GUI.DrawTexture(currRect, texCurr);  
		if ( currHealth == 0 ) 
		{
			//after boss dies will have to replenish these to 100 & show fuel bar/cooldown.
			//set cooldown back to normal value.
			//hide this.
			Debug.LogWarning ( "BOSS IS DEAD" ) ;
			
			SpawnBoss.shouldCountTime = true ;
			Controller.showFuelBar = true ;
			Controller.showFireCooldownBar = true ;
			Controller.bossIsSpawned = false ;
			Controller.showBossHealthBar = false ;
			
			//reset all spawn scripts so they spawn again
			
			SpawnEnemyAirplane.lastPath = LoftMovement.currPath ;
			SpawnMonster.lastPath = LoftMovement.currPath ;
			SpawnBox.lastPath = LoftMovement.currPath ;
			SpawnSentry.lastPath = LoftMovement.currPath ;
			SpawnTree.lastPath = LoftMovement.currPath ;
			
			SpawnBoss.targetFOV = 110 ;
			SpawnBoss.changeCameraFOV = true ;
			
			//refill HP & fuel. set normal speed.	 
			  
			LoftMovement.isDead = false ;
			
			HealthProgressBar.targetHealth = 100.0 ;
			HealthProgressBar.currHealth = 100 ;
			
			FuelProgressBar.targetFuel = 100.0 ;
			FuelProgressBar.currFuel = 100 ;
			
			LoftMovement.acceleration = 0.0000 ;
			LoftMovement.timeModifier = 0.5 ;
			LoftMovement.setNormalSpeed ( ) ; 
			
			//Refill ammo
			RocketAvailable.setAllTrue ( ) ;
			
			//Activate the player's crosshair
			
			playerCrosshair.SetActiveRecursively(true);
		}
	}
}