#pragma strict

class BossCollisionHandler extends MonoBehaviour {

	var left_wing_collider:boolean = false ;
	var right_wing_collider:boolean = false ;
	var central_collider:boolean = false ;

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
		
		Debug.Log ( "BOSS HIT" + bossHitArea + "		" + name ) ;
		switch ( bossHitArea )
		{
			case "left": 
				if ( left_wing_collider ) 
					BossHealthBar.currHealth -= 2 ; 
				break ;
			case "right":
				if ( right_wing_collider )
					BossHealthBar.currHealth -= 2 ;
				break ;
			case "central":
				if ( central_collider )
					BossHealthBar.currHealth -= 4 ;
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