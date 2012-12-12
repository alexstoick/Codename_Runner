#pragma strict

class Controller extends MonoBehaviour {

	//Progress Bars
	static var showHealthBar:boolean = true ;
	static var showFuelBar:boolean = true ;
	static var showFireCooldownBar:boolean = true ;
	static var showBossHealthBar:boolean = false ;
	
	static var weaponDamage:int = 20 ;
	static var myArmour:int = 30 ;
	
	//Boss variables
	static var bossIsSpawned:boolean = false ;
	static var TIME_FOR_BOSS:int = 90 ;
	
	static var numberOfBosses:int = 5 ;
	static var bossNumber:int = -1 ;
	static var bossHP:Array = [ 40 , 40 , 40 , 60 , 70 ] ;
	static var bossBullets:Array = [ 6 , 4 , 2 , 3 , 4 ] ;

	/// Used in CollisionHandler class.
		
	static var HP_gained_onHealthPack:int = 25 ;
	static var Fuel_gained_onFuelPack:int = 40 ;
	static var HP_lost_onNonCriticalHit:int = 30 ;
	static var rockets_gainedOnAmmo:int = 5 ;
	
	static var HP_lost_on_collision_with_bullet:int = 7 ;
	
	/// Used for Spawning
	
	static var box_spawn_distance:float = 0.030 ;
	static var monster_spawn_distance:float = 0.053 ;
	static var sentry_spawn_distance:float = 0.1009 ;
	static var tree_spawn_distance:float = 0.0175 ;
	static var enemyAirplane_spawn_distance:float = 0.1319 ;
	
	///Miniguns
	
	static var time_added_on_minigun_fire:float = 0.3125 ; //the total is 10 => now 32 bullets are fired before it reaches the total cooldown.
}