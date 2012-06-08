#pragma strict

public class ButtonPositioner extends MonoBehaviour 
{

	var type:Transform[];

	private var position:Vector3 = Vector3 ( -3.601972 , -5.474286 , 12.89984 ) ;
	private var rotation:Quaternion = Quaternion ( 0 , 0 , 0 , 0 ) ;
		
/*	function Start () 
	{
		
		var butoane:Transform ;
		
		if ( Screen.width == 768 && Screen.height == 1024 ) 
		{
			//ipad tall
			butoane = Instantiate ( type[1] , position , rotation ) ;
			
		}
		if ( Screen.width == 1024 && Screen.height == 768 )
		{
			//ipad wide
			butoane = Instantiate ( type[2] , position , rotation ) ;
		}
		if ( Screen.width == 640 && Screen.height == 960 )
		{
			//iphone tall
			butoane = Instantiate ( type[3] , position , rotation ) ;
		}
		if ( Screen.width == 940 && Screen.height == 640 )
		{
			//iphone wide
			butoane = Instantiate ( type[2] , position , rotation ) ;
		}
//		butoane.parent = transform ;
	}*/
}