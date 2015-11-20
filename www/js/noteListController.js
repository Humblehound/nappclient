
angular.module('notepadApp').controller('NoteListController', function($scope, $ionicPopup, $state, $ionicHistory, $resource, $ionicSideMenuDelegate, Variables, Notification){

  $scope.data = {
    showDelete: false
  };

  $scope.$on('reloadNotes', function() {
      $scope.loadNotes();
  });

  $scope.onItemDelete = function(note) {
    $resource('https://46.101.191.174:8443/' + Variables.getUserId(1) + '/notes/' + note.id).delete();
    $scope.notes.splice($scope.notes.indexOf(note), 1);
  };

  $scope.loadNotes = function(){
    var userId = Variables.getUserId();
    if(userId !== undefined){
        $scope.notes = $resource('https://46.101.191.174:8443/' + userId + '/notes/').query();
      }
  };

  $scope.toggleSideMenu = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.addNewNote = function(){
    $state.go('note');
  };

  $scope.logout = function() {
    $ionicHistory.clearCache();
    Variables.setUserId(-1);
    $state.go('login', {}, {reload: true});
  };

  $scope.deleteAccount = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Usuwania konta',
      template: 'Czy na pewno chcesz usunąć konto?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        // delete user account
        $state.go('login');
        Notification.show("Usunięto konto");
      } else {

      }
    });
  };

  $scope.loadNotes();
});