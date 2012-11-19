#pragma strict

class Controller extends MonoBehaviour {

	static var showHealthBar:boolean = true ;
	static var showFuelBar:boolean = true ;
	static var showFireCooldownBar:boolean = true ;
	static var showBossHealthBar:boolean = false ;
	
	static var bossIsSpawned:boolean = false ;
	
	static var weaponDamage:int = 20 ;
	static var myArmour:int = 30 ;
	static var TIME_FOR_BOSS:int = 10 ;
	
	static var bossNumber:int = -1 ;
	
	static var bossHP:Array = [ 20 , 40 , 60 , 80 , 100 ] ;
	static var bossBullets:Array = [ 4 , 4 , 4 , 2 , 2 ] ;
	
	
}