#pragma strict

class SpawnBoss extends MonoBehaviour {

	static var bossPool:SpawnPool ;
	static var prefab:Transform ;
	static private var mainCamera:Camera ;
	var lastPath:double = 0.0 ;
	static public var changeCameraFOV:boolean = false ;
	var timer:double = 0.0 ;
	static var shouldCountTime:boolean = false ;
	static public var targetFOV:int = 75 ;
	
	function Start ( )
	{
		if ( ! bossPool ) 
			bossPool = PoolManager.Pools ["Boss"] ;
		if ( ! prefab )
			prefab = bossPool.prefabs["boss"] ;
		if ( ! mainCamera )
			mainCamera = GameObject.Find ( "Main Camera" ).GetComponent(Camera) ;
	}
	
	function Spawn ( )
	{
		var newBoss = bossPool.Spawn ( prefab ) ;
		var spawn = newBoss.GetComponent ( SpawnOnLoft ) ;
		BossHealthBar.currHealth = 100 ;
		Debug.LogWarning ( "BOSS" ) ;
		BossMovementOnLoft.alpha = 0.99 ;
		BossMovementOnLoft.shouldMove = true ;
		spawn.Init ( 0 ) ;
		
		//initiate the camera zoom
		changeCameraFOV = true ;
		targetFOV = 75 ;
		//hide Fuel bar & Fire Cooldown bars since they are of no use
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
			mainCamera.fov = Mathf.Lerp ( mainCamera.fov , targetFOV , Time.deltaTime * 0.8 ) ;
			if ( mainCamera.fov < 76 && targetFOV == 75 )
				changeCameraFOV = false ;
			if ( mainCamera.fov > 109 && targetFOV == 110 ) 
				changeCameraFOV = false ;
		}
	}
}