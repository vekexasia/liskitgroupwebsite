ligApp.controller('indexController', function indexController($scope, $http) {
	$scope.epochTime = new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0)).getTime();
    $scope.income = []
    $scope.outcome = []
    $scope.projects = [];
    $scope.contributions = [];
    $scope.initiatives = [];
    $scope.authors = {};
    $scope.events = [];
    $scope.lignode = "liskwallet.punkrock.me";
    $scope.fulig = {
        address: '13861531827625059307L',
        balance: null
    };

    $http.get ('https://' + $scope.lignode + '/api/accounts/getBalance?address=' + $scope.fulig.address).then (function (data) {
        $scope.fulig.balance = parseInt (data.data.balance) / 100000000;
    });
    $http.get('https://' + $scope.lignode + '/api/transactions?limit=15&recipientId=' + $scope.fulig.address).then(function (data) {
        var tempIncome = data.data.transactions;

        tempIncome.forEach(function (e) {
            $http.get('https://' + $scope.lignode + '/api/accounts/getPublicKey?address=' + e.senderId).then(function (data) {
                if (data.status === 200) {
                    $http.get('https://' + $scope.lignode + '/api/delegates/get?publicKey=' + data.data.publicKey).then(function (data) {
                        if (data.data.success && data.status === 200) {
                            e.delegate = data.data.delegate.username;
                        }
                    });
                }
            });
            if (e.amount !== 0 && $scope.income.length < 5)
                $scope.income.push(e);
        }, this);
    })
    
    $http.get ('data/outcomes.json').then (function (outdict) {
    	outdict = outdict.data;
    	
		$http.get('https://' + $scope.lignode + '/api/transactions?limit=15&senderId=' + $scope.fulig.address).then(function (data) {
		    var tempOutcome = data.data.transactions;

		    tempOutcome.forEach(function (e) {
		    	if (e.id in outdict)
		    		e.description = outdict[e.id].description;
		    		
		    	e.timestamp = parseInt (e.timestamp) * 1000 + $scope.epochTime;
		    		
		        $http.get('https://' + $scope.lignode + '/api/accounts/getPublicKey?address=' + e.recipientId).then(function (data) {
		            if (data.data.success && data.status === 200) {
		                $http.get('https://' + $scope.lignode + '/api/delegates/get?publicKey=' + data.data.publicKey).then(function (data) {
		                    if (data.data.success && data.status === 200) {
		                        e.delegate = data.data.delegate.username;
		                    }
		                });
		            }
		        });
                if (e.amount !== 0 && $scope.outcome.length < 5)
    		        $scope.outcome.push(e);
		    }, this);
		});
	});
	
    $http.get ('data/projects.json').then (function (data) {
        $scope.projects = data.data;
    });

    $http.get ('data/events.json').then (function (data) {
        $scope.events = data.data;
    });

    $http.get ('data/initiatives.json').then (function (data) {
        $scope.initiatives = data.data;
    });

    $http.get ('data/contributions.json').then (function (data) {
        $scope.contributions = data.data;
    });

    $http.get ('data/members.json').then (function (data) {
        $scope.members = data.data;
    });
    
    $scope.outcomeDetails = function (o) {
    	$scope.selectedOutcome = o;
    	$('#outcomeDetailsModal').modal ('show');
    };

    // countdown start
    var rewards = {
      milestones: [
        500000000, // Initial Reward
        400000000, // Milestone 1
        300000000, // Milestone 2
        200000000, // Milestone 3
        100000000  // Milestone 4
      ],
        offset: 1451520,   // Start rewards at block (n)
        distance: 3000000, // Distance between each milestone
    };

    $scope.countdown = {
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      secondsLeft: 0,
      curReward: 0, // current reward in lisk
      nextRewardHeight: 0, // next reward will start at this block height
      nextReward: 0, // next reward in lisk
      blockDate: '' // next reward in lisk
    };
    $http.get('https://' + $scope.lignode + '/api/blocks?limit=1&orderBy=height:desc').then(function (data) {
      var lastBlock = data.data.blocks[0];
      var blockHeight = lastBlock.height;
      var blockTimestamp = lastBlock.timestamp;
      var blockTimeDate = moment.utc($scope.epochTime).add(blockTimestamp, 'seconds');

      // TODO: this will fail when milestone 4 gets reached
      var curMilestoneIdx = Math.floor((blockHeight - rewards.offset)/rewards.distance);
      var nextMilestoneAtBlockHeight = (curMilestoneIdx+1)*rewards.distance + rewards.offset + 1;
      var nextMilestoneBlockTime = blockTimeDate.clone()
        .add(10 /*blockheight*/ * (nextMilestoneAtBlockHeight - blockHeight), 'seconds');

      $scope.countdown.blockDate = nextMilestoneBlockTime.format('YYYY-MM-DD hh:mm:ss');
      $scope.countdown.curReward = rewards.milestones[curMilestoneIdx] / Math.pow(10,8);
      $scope.countdown.nextReward = rewards.milestones[curMilestoneIdx+1] / Math.pow(10,8);
      $scope.countdown.nextRewardHeight = nextMilestoneAtBlockHeight;



      // counter start!
      setInterval(function() {
        var now = moment.utc();
        var daysLeft    = nextMilestoneBlockTime.diff(now, 'days');
        var hoursLeft   = nextMilestoneBlockTime.clone()
          .subtract(daysLeft, 'days')
          .diff(now, 'hours');
        var minutesLeft = nextMilestoneBlockTime.clone()
          .subtract(daysLeft, 'days')
          .subtract(hoursLeft, 'hours')
          .diff(now, 'minutes');
        var secondsLeft = nextMilestoneBlockTime.clone()
          .subtract(daysLeft, 'days')
          .subtract(hoursLeft, 'hours')
          .subtract(minutesLeft, 'minutes')
          .diff(now, 'seconds');
        $scope.$apply(function () {
          $scope.countdown.hoursLeft = hoursLeft;
          $scope.countdown.minutesLeft = minutesLeft;
          $scope.countdown.secondsLeft = secondsLeft;
          $scope.countdown.daysLeft = daysLeft;
        });
      }, 1000);
    });


});
