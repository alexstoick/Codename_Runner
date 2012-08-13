#pragma strict
 
class HealthBar extends MonoBehaviour {

	static var percentage:double = 0 ;
	static var trs:Transform ;
	
	function Start ( )
	{
		trs = transform ;
	}
	
	static function UpdateHealthBar ( )
	{
		percentage += 25 ;
		Debug.Log ( "percentage:" + percentage/100 ) ;
		if ( percentage == 0 )
			trs.renderer.material.SetFloat( "_Cutoff",  0 ); 
		else
			trs.renderer.material.SetFloat( "_Cutoff",  percentage / 100 ); 
	}

}
