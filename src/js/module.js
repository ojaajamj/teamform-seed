angular.module('teamform', ['ui.bootstrap', 'ui.router', 'ngCookies', 'firebase', 'ngTagsInput'])

.run(["$rootScope", "$state", "$location", "$cookies", "Auth",
  function($rootScope, $state, $location, $cookies, Auth) {
		$rootScope.auth = Auth;

    //Redirect user to login if they aren't logged in.
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {

      // Store the entry uri using cookies
      $cookies.put('initialLocation', $location.path());

      /* Initially, angularFire will set the state to not authenticated, and then do the login,
       * and change the state to authenticated.
       */
      $rootScope.firebaseUser = Auth.$getAuth();
      if(Auth.$getAuth()) {
      	// redirect user back to the uri where user came from
        var redirectTo = $cookies.get('initialLocation'); // set in the beginning of this function
        if($location.path() === '/login') {
          $state.go('index');
        }
        $location.path(redirectTo);
      }else{
        $state.go('login'); // go to login
      }
    });
}]);
