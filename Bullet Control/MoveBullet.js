/**************\ 
|	UNUSED	   |
\**************/


#pragma strict
class MoveBullet extends MonoBehaviour {
	
	var movementVariation = 0.5 ;
	private var bullet_object:GameObject ;
	
	function FixedUpdate () //moving the Bullet!
	{
		if ( transform.position.z > 90 )
		{
			DestroyBullet ( ) ;
			return ;
		}
		else
		{
			transform.position.z += movementVariation ;
		}
	}
	
	function SendGameObject ( bullet:GameObject )
	{
		bullet_object = bullet ;
	}
	
	function DestroyBullet ( )
	{
		Destroy ( bullet_object ) ;
	}
	
}