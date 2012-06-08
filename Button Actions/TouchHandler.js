#pragma strict

var cameraObject:GameObject ;
private var cam:Camera ;

function Start ( )
{
	cam = cameraObject.camera ;
}

function Update () {
    // Code for OnMouseDown in the iPhone. Unquote to test.
    var hit : RaycastHit;
    for (var i = 0; i < Input.touchCount && i < 1; ++i) {
//    	Debug.Log ( "in touchcount: " + i ) ;
        if (Input.GetTouch(i).phase == TouchPhase.Began) {
        // Construct a ray from the current touch coordinates
        var ray = cam.ScreenPointToRay (Input.GetTouch(i).position);
        if (Physics.Raycast (ray,hit)) {
        	if ( hit.transform.name.Contains ( "Button" ) )
            {
            	hit.transform.gameObject.SendMessage("MouseDown");
            	return ;
            }
          }
       }
   }
}