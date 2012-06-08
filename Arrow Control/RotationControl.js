#pragma strict

class RotationControl extends MonoBehaviour {

	static private var total_number:int = 0 ;
	private var myNumber:int ;
	private var ammoBox:Transform ;
	public  var locked:boolean = false ;
	static private var runner:Transform ;
	static private var lastTime:float = 0.0 ;
	private var endingPosition:Vector3 = Vector3 ( 0 , 0 , 0 ) ;
	private var haveToRotate:boolean = false ;
	
	
	function Start ( )
	{
		if ( !runner )
			runner = GameObject.Find ( "BigGroup").transform ;
		++total_number ;
		myNumber = total_number; 
	}
	
	public function SetAmmoBox ( val:Transform ) 
	{
		ammoBox = val ;
	}
	
	
	private function GetAmmoBox ( )
	{
		return ammoBox.rotation.eulerAngles.z ;
	}
	
	function UpdateAngle ( angle:int )
	{
		if ( locked )
		{
			//verificam daca inca este in ecran

			var ammo:int = GetAmmoBox ( ) ;
			var runnerRotation:int = GameObject.Find ( "BigGroup").transform.rotation.eulerAngles.z ; 
			var additionalRotation:int = Mathf.Round ( Mathf.Ceil ( runnerRotation ) / 15 ) * 15 ;   
			
 			 
 			var lowerLimit:int = -75 + additionalRotation ;
 			var upperLimit:int = 75 + additionalRotation  ; 
 			var interschimbare:boolean = false ;
 		
			if ( lowerLimit < 0 )
				lowerLimit += 360 ;
			if ( upperLimit > 360 )  
				upperLimit -= 360 ;
			
			if ( upperLimit < lowerLimit ) 
			{
				var aux:int = upperLimit ;
				upperLimit = lowerLimit ;
				lowerLimit = aux ; 
				interschimbare = true ;
			} 

			var goOn:boolean = false ;
			
			if ( interschimbare )	  
			{
				if ( upperLimit <= ammo || ammo <= lowerLimit )  
					goOn = true ; 
			}
			else
			{
				if ( lowerLimit <= ammo && ammo <= upperLimit )  
					goOn = true ;  
			}

			if ( goOn )
			{
				locked = true ; 

			}
			else
			{
				locked = false ; 

			}
		}
	
		if ( locked ) 
			return ;

		if ( endingPosition == Vector3 ( 0 , 0 , 0 ) )
		{
			endingPosition = Vector3 ( 0 , 0 , transform.rotation.eulerAngles.z + angle ) ;
		}
		else
			endingPosition += Vector3 ( 0 , 0 , angle ) ;
			
		haveToRotate = true ;
	
	}
	
	function Update ( )
	{
		if ( runner.position.z - 5 > transform.position.z )
			destroyObjects ( ) ;
		if ( haveToRotate ) 
		{
		
			var target:Quaternion = Quaternion.Euler (  Vector3 ( 0 , 0 , endingPosition.z ) ) ;

			if ( transform.rotation == target )
			{
				haveToRotate = false ;
				return ;
			}
			
			transform.rotation = Quaternion.Slerp( transform.rotation, target, Time.deltaTime * 4 );
			checkAngle ( ); 

		}
	}
	
	public function checkAngle ( )
	{
		var arrow:int = Mathf.Round ( Mathf.Ceil ( transform.rotation.eulerAngles.z ) / 15 ) * 15 ; //transform.rotation.eulerAngles.z ;
		var ammo:int = GetAmmoBox() ;
	//	Debug.LogWarning ( myNumber + " called checkAngle" + arrow + " " + ammo ) ;
		if ( locked )
			return ;
		if ( Mathf.Approximately ( arrow , ammo ) )
		{ 
			transform.rotation.eulerAngles.z = arrow ;
			haveToRotate = false ;
			locked = true ;
//			Debug.LogError ( "LOCKED "+ myNumber + " at checkAngle" + arrow + " " + ammo ) ;
		}
	}
	
	function destroyObjects ( ) 
	{
		Debug.LogError ( "destroying arrow and box") ;
		transform.parent = null ;
		ammoBox.parent = null ;
		Destroy ( ammoBox.gameObject ) ;
		Destroy ( transform.gameObject ) ;
	}
}


/*	function Update ( )
	{
		if ( ! ammoBox )
			return ;
		if ( locked )
			return ;
		
		var arrow:int =  Mathf.Round ( Mathf.Ceil ( transform.rotation.eulerAngles.z ) / 15 ) * 15 ;
		var ammo:int = GetAmmoBox() ;
		var runner:int = Mathf.Round ( Mathf.Ceil ( runner.rotation.eulerAngles.z ) / 15 ) * 15;
		var newRotation:int = 0 ;
		var arrow_leftLimit :int ;
		var arrow_rightLimit :int ;
		
		//trebuie sa pastram sagetile la +- 75 sau deasupra cutiei daca intra in ecran
		
		arrow = transformAngle ( arrow ) ;
		ammo = transformAngle ( ammo ) ;
		runner= transformAngle ( runner ) ;
		
		arrow_leftLimit = runner + 75 ;
		arrow_rightLimit = runner - 75 ;
		
		if ( arrow > 0 )
			arrow = arrow_leftLimit ;
		else
			arrow = arrow_rightLimit ;
			
		transform.rotation.eulerAngles.z = arrow ;
		
		
		if ( lastTime + 5 < Time.time)
		{
			Debug.Log ( "ArrowRotation:" + arrow + " ammoBoxRotation:" + ammo + " runnerRotation:" + runner ) ;
			if ( newRotation && newRotation < 75 || newRotation > (360-75) )
				Debug.Log ( "NEW ROTATION:" + newRotation ) ;
			lastTime = Time.time ;
		}
		
	}*/