#pragma strict

class AmmoBoxSpawn extends MonoBehaviour {

	var ammoGroup:Transform ;
	var arrowGroup:Transform ;
	var ammoParent:Transform ;
	var arrowParent:Transform ;
	static private var NUMBER:int = 0 ;

	function Spawn ( pozitie:int , zPos:int )
	{
	
		++NUMBER;
//		Debug.Log ( "SPAWNING AMMO:" + pozitie ) ;

		var rotation:int = ( pozitie - 1 ) *15.0 ;
		
		var ammoBox:Transform = Instantiate ( ammoGroup , Vector3 ( 3.643547 , -1.036308 , zPos ) , Quaternion ( 0 , 0 , 0 , 0) ) ;
		ammoBox.rotation.eulerAngles.z = rotation ;
		ammoBox.parent = ammoParent ;
		
		var arrow:Transform = Instantiate ( arrowGroup , Vector3 ( 3.643547 , -1.036308 , zPos ) , Quaternion( 0 , 0 , 0,  0) ) ;
		var runnerRotation:int = GameObject.Find ( "BigGroup").transform.rotation.eulerAngles.z ; 
		var additionalRotation:int = Mathf.Round ( Mathf.Ceil ( runnerRotation ) / 15 ) * 15 ;
		arrow.name = "arrow" + NUMBER ;
		ammoBox.name = "ammoBox" + NUMBER ; 
		
		if ( rotation > 180 )
			arrow.rotation.eulerAngles.z = -75 + additionalRotation ;
		else
			arrow.rotation.eulerAngles.z = 75 + additionalRotation; ;
			
		arrow.parent = arrowParent ;
		
		arrow.gameObject.AddComponent ( RotationControl ) ;
		
		var rotationControl:RotationControl = arrow.gameObject.GetComponent ( RotationControl ) ;
		rotationControl.SetAmmoBox ( ammoBox ) ;
		rotationControl.checkAngle ( ) ;
		
		var ammo = ammoBox.rotation.eulerAngles.z ;
		
		
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

//		Debug.LogWarning ( "Checking screen position" + additionalRotation + " " + lowerLimit + " " + ammo + " " + upperLimit ) ; 					  
		
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
			rotationControl.locked = true ;
//			Debug.LogError ( "LOCKED FROM SPAWN!" ) ;
			arrow.rotation.eulerAngles.z = rotation ;
		}
		
//		Debug.LogWarning ( "SPAWNING AMMO BOX !" + pozitie ) ;

	}
	
}