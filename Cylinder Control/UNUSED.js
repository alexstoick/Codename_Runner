/*

	/*	
		if ( number < 6 )
		{
			MAX_ELIMINATI = 23 ;
			Debug.Log ( "first cyl" ) ;
		}
		else
		{

			MAX_ELIMINATI = 20 ;
		}
		
		for ( i = 0 ; i < 24 ; ++ i )
		{ 
			eliminat [i] = true ;
			
		}

		
		var children:int = cilindru.GetChildCount ( ) ;
		divizor = Mathf.Round ( Random.Range ( 0 , children ) ) ; 
		if ( number % 2 == 1 )
		{	
			var ok:boolean = true ;
			//while ( ok )
			//{ 
				divizor = Mathf.Round ( Random.Range ( 0 , children ) ) ;
				ok = ! lastElim[divizor] ;
			//}
			
			for ( i = 0 ; i < 24 ; ++ i )
				duplicate[i] = lastElim[i] ;
				
			for ( i = 0 ; i < 24 ; ++ i )
			{ 
				eliminat [i] = true ;
				lastElim [i] = true ;	
			}

			for ( i = 1 ; i <= 3 ; ++ i )
			{
				eliminat[divizor] = false ;
				lastElim[divizor] = false ;
				
				Debug.Log ( "divizor: " + divizor ) ;
				
				var div:int = divizor ;


				ok = true ;
			//	for ( var k = 1 ; k < 5 ; ++k  )
			//	{
					divizor = ( div + Mathf.Round ( Random.Range ( 3,5 ) ) ) % 24 ;
					ok = ! duplicate[divizor] ;
			//	}

//				while ( ok )
	

				divizor = divizor % 24 ;
			}
		}
		else
		{
			for ( i = 0 ; i < 24 ; ++ i )
				eliminat[i] = lastElim [i] ;
		}
		
		var j:int ;
		
		for ( i = 0 ;i < 24 ; ++ i )
			if ( eliminat[i] )
			{
			
				for ( j = 0 ; j < cilindru.GetChildCount ( ) ;  )
				{
					child = cilindru.GetChild ( j ) ;
					var abc:String = "e" + (i+1).ToString ( ) ;
					var nume:String = child.name.Substring ( 3 ) ;
					
					if ( nume == abc )
					{
						child.parent = null ;
						Destroy ( child.gameObject ) ;
					}
					else
						++ j ;
				}
			}


*/