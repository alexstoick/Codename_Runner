#pragma strict
class MoveRunnerNew extends MonoBehaviour {
	
	//Refference to the SphereGroup. Used to rotate
	static private var sphereGroup:Transform ;
	//Refference to the Camera. Also used to change rotation
	static private var cameraTransform:Transform ;
	//Refference to the planeHolder. Used for Looping.
	static private var planeHolder:Transform ;
			
	//Boolean variables that state weaher we have to rotate the
	//plane and camera.
	static private var haveToRotate:boolean ;
	static private var haveToRotateCamera:boolean ;

	//The ending position for the plane rotation.
	static private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;

	//Wether we are currently doing a loop or not.
	//Has 3 values: 0 for not moving; 1 for right; 2 for left.
	static public var doingLoop:int = 0 ;

	//Value that is used to add to the plane rotation while looping.
	static private var planeValue:float ;

	//The left/right turret on the plane.
	static private var leftShooter:PlaneShootForward ;
	static private var rightShooter:PlaneShootForward ;	

	//Refference to the rockPool from PoolManager
	static var rocksPool:SpawnPool ;
	//Prefab that is spawned (projectile).
	static var prefab:Transform ;

	//Audio that is played when the big gun is fired.
	public var fireBigGun:AudioClip;
	
	function Start ( )
	{
		//Initializations.
		if ( ! cameraTransform )
			cameraTransform = GameObject.Find ( "Camera Group" ).transform ;
		if ( ! sphereGroup )
			sphereGroup = GameObject.Find ( "BigGroup").transform ;
		if ( ! rocksPool )
			rocksPool = PoolManager.Pools[ "Rocks" ] ;
		if ( ! prefab )
			prefab = rocksPool.prefabs [ "rock_for_loft" ] ;
		if ( ! planeHolder )
			planeHolder = GameObject.Find ( "Plane Holder" ).transform ;
		if ( ! leftShooter )
			leftShooter = GameObject.Find ( "planeShooter left").GetComponent ( PlaneShootForward ) ;
		if ( ! rightShooter )
			rightShooter = GameObject.Find ( "planeShooter right").GetComponent ( PlaneShootForward ) ;
	}
	
	function FireGuns ( ) //fire both shooters.
	{
		if ( ( FireProgressBar.targetCooldown + 0.3125*2 ) < 10 ) 
		{
			leftShooter.FireGun ( ) ;
			rightShooter.FireGun ( ) ;
		}
	}
	
	//Main handler for the action.
	public function action ( act:String )
	{
		switch ( act )
		{
			case "left": move ( true ) ; break ;
			case "right": move ( false ) ; break ;
			case "loopleft": loop ( true ) ; break ;
			case "loopright": loop ( false ) ; break ;
 		}
	}

	//This does the looping. The paramater is obvious.
	private function loop ( left:boolean )
	{
		
		if ( left )
		{
			planeValue = -10f ;
			doingLoop = 2 ;
		}
		else
		{
			planeValue = 10f ;
			doingLoop = 1 ;
		}
	}
	
	//Function that handles movement. Param is obvious.
	private function move ( left:boolean )
	{
		var angle:int ;	
		var zInt:int ;
		
		//decide the difference in angle.
		if ( left )
		{
			angle = 15 ;
		}
		else
		{
			angle = -15 ;
		}
		
		//Start tilting the plane.		
		ReturnToRotation.StartRotation ( angle * -1 ) ;

		//Calculate the ending position for the plane.
		if ( endingPosition == Vector3 ( 0 , 0 , 0 ) ) 
		{
			endingPosition = sphereGroup.localRotation.eulerAngles + Vector3 ( 0 , 0 ,  angle ) ;
		}
		else
		{ 
			endingPosition = endingPosition + Vector3 ( 0 , 0 , angle ) ; 
			zInt = (endingPosition.z / 15 ) ;
			endingPosition.z = zInt * 15 ;
		}
		
		haveToRotate = true ;

		//Activate the camera, but with a slight delay.
		delayCameraMovement ( ) ;
	}
	
	function delayCameraMovement ( )
	{
		haveToRotateCamera = true ;
	}
	
	function Update ( )
	{
		//This is used for PC input.
		if ( Input.GetKeyDown ( KeyCode.LeftArrow) )
			action ( "left") ;
		if ( Input.GetKeyDown ( KeyCode.RightArrow) )
			action ( "right" ) ;
		if ( Input.GetKeyDown ( KeyCode.UpArrow ) )
			LoftMovement.increaseSpeed ( ) ;
		if ( Input.GetKeyDown ( KeyCode.DownArrow ) )
			LoftMovement.decreaseSpeed ( ) ;
		if ( Input.GetKeyDown ( KeyCode.A ) )
			FireGuns ( ) ;
		if ( Input.GetKeyDown ( KeyCode.Space ) )
			fire ( ) ;

		// If having to rotate and not doing the loop, start animating the SphereGroup
		//towards its target.
		if ( haveToRotate && ! doingLoop ) 
		{
		
			var target:Quaternion = Quaternion.Euler (  Vector3 ( endingPosition.x , endingPosition.y , endingPosition.z ) ) ;

			//If we are at the target, then stop rotating. 
			//This will never be called because the angle will never be
			//exactly that.
			if ( target.Equals ( sphereGroup.localRotation ) )
			{
				haveToRotate = false ;
				haveToRotateCamera = false ;
				return ;
			}

			sphereGroup.localRotation = Quaternion.Slerp( sphereGroup.localRotation , target, Time.deltaTime * 4 ) ;
		}

		//If having to rotate the camera, doing this, but with a slower movement than that of the 
		//player, in order to give a nice transition.
		if ( haveToRotateCamera && ! doingLoop )
			cameraTransform.localRotation = Quaternion.Slerp ( cameraTransform.localRotation , target , Time.deltaTime*3.2 ) ;

		
		//doingLoop has 3 values: 0 for not moving; 1 for right; 2 for left.
		if ( doingLoop ) 
		{
			if ( doingLoop == 1 )
			{
				//if the plane went over 345 it means that it finished the rotation
				//so stop it.
				if ( planeHolder.localRotation.eulerAngles.z >= 345 ) 
				{
					doingLoop = 0 ;
					planeHolder.localRotation.eulerAngles.z = 360 ;
					return ;
				}
				planeHolder.localRotation.eulerAngles.z += planeValue ;
			}
			else
			{
				planeHolder.localRotation.eulerAngles.z += planeValue ;
				//if the plane went below 10 it means that it finished its rotation.
				if ( planeHolder.localRotation.eulerAngles.z < 10 )
				{
					planeHolder.localRotation.eulerAngles.z = 0 ;
					doingLoop = 0 ;
					return ;
				}
			}
		}
	}
	
	//Fires a rocket.
	function fire ( )
	{
		if ( ! RocketAvailable.isRocketAvailable () )
			return ;
		RocketAvailable.deactivateRocket () ;
		//Used for comparing with the the monsters.
		var planeRotation:double = transform.localRotation.eulerAngles.z ;

		var i:int ;

		//Wether the found monster is flying/grounded.
		var flying:boolean = false ; 
		var found: boolean = false ;
		var foundI:int = 0;
		
		//Playing audio corresponding with the big gun.
		AudioSource.PlayClipAtPoint( fireBigGun , transform.position );
		
		for ( i = 0 ; i < MonsterVector.monsters.Count && ! found ; ++ i )
		{
			if ( ! MonsterVector.transforms[i].gameObject.active )
			{
				MonsterVector.removeFromArray ( MonsterVector.monsters[i] , "de-activated" ) ;
				continue ;
			} 

			//Adding the rotation from the spawn(held in MonsterVector.angles) and current rotation.
			var monsterRotation:double = ( MonsterVector.transforms[i].localRotation.eulerAngles.z + MonsterVector.angles[i] ) % 360 ;
			
			if ( monsterRotation < 0 )
				monsterRotation += 360 ;

			//If the monster's rotation is between a treshhold of +- 60.5;
			var lowRot:double = monsterRotation - 60.5 ;
			var highRot:double = monsterRotation + 60.5 ;
	
			//Special cases when the rotation goes over 360.
			//For example if the target is at 345 we should check the interval (285,45), but unf we cannot do that.
			//Therefore, we check if the angle > 285 or lower than 45.

			if ( highRot > 360 )
			{
				if ( lowRot <= planeRotation )
					found = true ;
				if ( planeRotation <= highRot - 360 )
					found = true ;
			}

			//Same case as the last one but the other way around.
			if ( lowRot < 0 )
			{
				if ( lowRot + 360 <= planeRotation )
					found = true ;
				if ( planeRotation <= highRot )
					found = true ;
			}
				
			//This is the normal case.
			if ( lowRot <= planeRotation && planeRotation <= highRot )
			{
				found = true ;
			}
			
			if ( found )
			{
				//Checking what type of monster we found (flying/grounded)
				if ( MonsterVector.monsters[i].Contains ( "mig" ) || MonsterVector.monsters[i].Contains("boss") )
					flying = true ;
				else
					flying = false ;
				foundI = i ;
			}
		}
		
		//Rock & holder used to place the missle correctly.
		var rock:Transform;
		var holder:Transform ;

		//Position&rotation from where to spawn the missle.
		var position:Vector3 = planeHolder.position ;
		var rotation:Quaternion = planeHolder.rotation ;

		if ( flying )
		{
			rock = rocksPool.Spawn ( prefab , position, rotation ) ;
			holder = rock.GetChild(0) ;
			//Position for flying monster.
			holder.GetChild(0).localPosition.y = -6.6 ;
			holder.GetChild(1).localPosition.y = -6.6 ;
		}
		else
		{
			rock = rocksPool.Spawn ( prefab , position, rotation ) ;
			holder = rock.GetChild(0) ;
			//Position for grounded monster.
			holder.GetChild(0).localPosition.y = -3.6 ;
			holder.GetChild(1).localPosition.y = -3.6 ;
		}

		//If no target is found, the missle if by default grounded.
		
		var movement = rock.GetComponent ( RockMovementOnLoft ) ;
		var tmp = rock.GetComponentInChildren ( BulletFollowTarget ) ;

		if ( found )
		{
			//If we found a target, we lock to it and initiate the movement,
			//but with speed 0, so the rocket can glide towards the target.
			tmp.LockTarget ( foundI ) ;
			movement.Init ( 0 ) ;
		}
		else
		{
			//If the rocket had a target lock, we reset it now, and setting a forward speed.
			tmp.ResetLock ( ) ;
			movement.Init ( 0.0004 ) ;
		}
		
	}
}