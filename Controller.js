#pragma strict

class Controller extends MonoBehaviour {

	static var showHealthBar:boolean = true ;
	static var showFuelBar:boolean = true ;
	static var showFireCooldownBar:boolean = true ;
	static var showBossHealthBar:boolean = false ;
	
	static var bossIsSpawned:boolean = false ;
	
	static var weaponDamage:int = 20 ;
	static var myArmour:int = 30 ;
	static var TIME_FOR_BOSS:int = 90 ;
	
	static var bossNumber:int = -1 ;
	
	static var bossHP:Array = [ 20 , 40 , 40 , 50 , 60 ] ;
	static var bossBullets:Array = [ 6 , 4 , 4 , 2 , 2 ] ;

	/// Used in CollisionHandler class.
		
	static var HP_gained_onHealthPack:int = 25 ;
	static var Fuel_gained_onFuelPack:int = 40 ;
	static var HP_lost_onNonCriticalHit:int = 30 ;
}