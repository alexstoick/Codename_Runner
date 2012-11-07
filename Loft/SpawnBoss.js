#pragma strict

class SpawnBoss extends MonoBehaviour {

	static var bossPool:SpawnPool ;
	static var prefab:Transform ;
	static private var mainCamera:Camera ;
	var lastPath:double = 0.0 ;
	static private var changeCameraFOV:boolean = true ;
	
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
	}
	
	function Update ( )
	{
		if ( changeCameraFOV )
		{
			mainCamera.fov = Mathf.Lerp ( mainCamera.fov , 60 , Time.deltaTime * 0.8 ) ;
		}
	}
}