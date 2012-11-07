#pragma strict

class SpawnBoss extends MonoBehaviour {

	static var bossPool:SpawnPool ;
	static var prefab:Transform ;
	static private var mainCamera:Camera ;
	var lastPath:double = 0.0 ;
	static public var changeCameraFOV:boolean = true ;
	var timer:double = 0.0 ;
	static var shouldCountTime:boolean = false ;
	
	function Start ( )
	{
		if ( ! bossPool ) 
			bossPool = PoolManager.Pools ["Boss"] ;
		if ( ! prefab )
			prefab = bossPool.prefabs["boss"] ;
		if ( ! mainCamera )
			mainCamera = GameObject.Find ( "Main Camera" ).GetComponent(Camera) ;
	}
	
	function Spawn ( ) //will be called from global controller when a level is completed
	{
		var newBoss = bossPool.Spawn ( prefab ) ;
		var spawn = newBoss.GetComponent ( SpawnOnLoft ) ;
		
		spawn.Init ( ) ;
		
		//initiate the camera zoom
		changeCameraFOV = true ;
		//hide Fuel bar & Fire Cooldown bars since they are of no use
		shouldCountTime = false ;
		Controller.showFuelBar = false ;
		Controller.showFireCooldownBar = false ;
		Controller.bossIsSpawned = true ;
		
	}
	
	function Update ( )
	{
		if ( shouldCountTime )
			timer += Time.deltaTime ;
		if ( timer >= 10 )
		{
			Spawn ( ) ;
		}
		if ( changeCameraFOV )
		{
			mainCamera.fov = Mathf.Lerp ( mainCamera.fov , 75 , Time.deltaTime * 0.8 ) ;
			if ( mainCamera.fov < 76 )
				changeCameraFOV = false ;
		}
	}
}