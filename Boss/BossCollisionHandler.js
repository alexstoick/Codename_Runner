#pragma strict

class BossCollisionHandler extends MonoBehaviour {

	//Variable that indicates if the collider is active.
	public var left_wing_collider:boolean = false ;
	public var right_wing_collider:boolean = false ;
	public var central_collider:boolean = false ;
	
	//Specific damage for each collider.
	public var central_collider_damage:int = 2 ;
	public var left_collider_damage:int = 2 ;
	public var right_collider_damage:int = 2 ;

	function OnCollisionEnter(CollisionInfo:Collision)
	{
		//Name of the object that hit the boss.
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;
		
		//Name of the boss part that is hit.
		var bossHit:String = CollisionInfo.contacts[0].thisCollider.name ;
		var bossHitArea:String = "" ;
		
		//Ignore any object except the plane bullets (they are shot by the miniguns).
		if ( ! name.Contains("plane_bullet" ) )
			return ;

		//Setup the variable that indicates the place where the boss was hit.
		if ( bossHit.Contains ( "right" ) ) 
			bossHitArea = "right" ;
		else
			if ( bossHit.Contains ( "left" ) ) 
				bossHitArea = "left" ;
			else
				bossHitArea = "central" ;
		
		//If the collider is 'active', the boss will take damage. Also will count the 
		//bullet towards the current number of bullets that require the boss to start
		//the evasive maneuvers.
		switch ( bossHitArea )
		{
			case "left": 
				if ( left_wing_collider ) 
					BossHealthBar.currHealth -= left_collider_damage ; 
				BossEvasiveAction.current_number_of_bullets ++ ;
				break ;
			case "right":
				if ( right_wing_collider )
					BossHealthBar.currHealth -= right_collider_damage ;
				BossEvasiveAction.current_number_of_bullets ++ ;	
				break ;
			case "central":
				if ( central_collider )
					BossHealthBar.currHealth -= central_collider_damage ;
				BossEvasiveAction.current_number_of_bullets ++ ;
				break ;
		}
		
		//Boss is dead => despawn it.
		if ( BossHealthBar.currHealth <= 0 )
		{
			var pool:SpawnPool = PoolManager.Pools["Boss"] ;
			pool.Despawn ( transform ) ;
		}
	}
}