#pragma strict

class SpawnBoss extends MonoBehaviour {

	static var bossPool:SpawnPool ; //link to the Boss Pool from PoolManager
	static var prefab:Transform ; //boss prefab used to spawn the boss.

	static private var mainCamera:Camera ; //link to the camera used to change the FOV
	
	static public var changeCameraFOV:boolean = false ; //if the camera field of view should be changed
	
	static public var targetFOV:int = 75 ; //towards what value I should animate (used to zoom-in and zoom-out)

	static var shouldCountTime:boolean = false ; //if this is true it adds time towards the bosstimer. when it is 
												// completed a new boss will appear.
	var timer:double = 0.0 ; //holds how much time has elapsed


	static var plane_audioSource:AudioSource ;

	function Start ( )
	{
		//Perform initializations
		if ( ! bossPool ) 
			bossPool = PoolManager.Pools ["Boss"] ;
		if ( ! prefab )
			prefab = bossPool.prefabs["boss"] ;
		if ( ! plane_audioSource )
			plane_audioSource = GameObject.Find ( "BigGroup" ) .GetComponent(AudioSource) ;
		if ( ! mainCamera )
			mainCamera = GameObject.Find ( "Main Camera" ).GetComponent(Camera) ;
	}
	
	function Spawn ( ) //Spawns a new boss and does other changes to the HUD
	{

		var newBoss = bossPool.Spawn ( prefab ) ;
		var spawn = newBoss.GetComponent ( SpawnOnLoft ) ; //the SpawnOnLoft component of the boss.

		//Initilizations of global variables related to the boss.
		BossHealthBar.currHealth = 100 ;
		BossMovementOnLoft.alpha = 0.99 ;
		BossMovementOnLoft.shouldMove = true ;
		BossShootPlayer.isShootingPlayer = false ;
		
		FollowPlayerRotation.shouldMove = true ;
		spawn.Init ( 0 ) ;
		plane_audioSource.Play ( ) ; //will play a tension sound

		//Updating the stats for evasion.		
		Controller.bossNumber ++ ;
		if ( Controller.bossNumber >= 5 )
			Controller.bossNumber = 4 ;
		BossEvasiveAction.isMoving = false ;	
		BossEvasiveAction.number_of_bullets = Controller.bossBullets [ Controller.bossNumber ] ;
		BossEvasiveAction.starting_HP_Percentage = Controller.bossHP [ Controller.bossNumber ] ;
		
		//Initiate the camera zoom
		changeCameraFOV = true ;
		targetFOV = 75 ;
		//hide Fuel bar & Fire Cooldown bars since they are of no use
		//show the boss health bar
		shouldCountTime = false ;
		Controller.showFuelBar = false ;
		Controller.showFireCooldownBar = false ;
		Controller.bossIsSpawned = true ;
		Controller.showBossHealthBar = true ;
	}
	
	function Update ( )
	{
		if ( shouldCountTime )
			timer += Time.deltaTime ;
		if ( timer >= Controller.TIME_FOR_BOSS )
		{
			shouldCountTime = false ;
			timer = 0 ;
			Spawn ( ) ;
		}
		if ( changeCameraFOV )
		{
			//animates the camera towrads the wanted value. Used to zoomin and zoomout.
			mainCamera.fov = Mathf.Lerp ( mainCamera.fov , targetFOV , Time.deltaTime * 0.8 ) ;
			if ( mainCamera.fov < 76 && targetFOV == 75 )
				changeCameraFOV = false ;
			if ( mainCamera.fov > 109 && targetFOV == 110 ) 
				changeCameraFOV = false ;
		}
	}
}