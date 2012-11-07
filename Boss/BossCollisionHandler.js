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
		
		if ( name.Contains ( "rock" ) )
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
					BossHealthBar.currHealth -= 30 ; 
				break ;
			case "right":
				if ( right_wing_collider )
					BossHealthBar.currHealth -= 30 ;
				break ;
			case "central":
				if ( central_collider )
					BossHealthBar.currHealth -= 30 ;
				break ;
		}
	}
}