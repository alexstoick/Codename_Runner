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
		var name:String = CollisionInfo.contacts[0].otherCollider.name ;
		var bossHit:String = CollisionInfo.contacts[0].thisCollider.name ;
		var bossHitArea:String = "" ;
		
		if ( ! name.Contains("plane_bullet" ) )
			return ;

		if ( bossHit.Contains ( "right" ) ) 
			bossHitArea = "right" ;
		else
			if ( bossHit.Contains ( "left" ) ) 
				bossHitArea = "left" ;
			else
				bossHitArea = "central" ;
		
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
		
		if ( BossHealthBar.currHealth <= 0 )
		{
			Controller.TIME_FOR_BOSS = 50 ;
			var pool:SpawnPool = PoolManager.Pools["Boss"] ;
			pool.Despawn ( transform ) ;
		}
		
	}
}