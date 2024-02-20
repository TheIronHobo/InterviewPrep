const { VillageState } = require("./village");
const { roadGraph } = require("./roadGraph");
const { roboDictionary } = require("./roboZoo");
const { runRobot } = require("./runRobot");

function robotComparison(robots, numTests, parcelCount) {
    const tests = [];
    for (let i = 0; i < numTests; i++) {
        tests.push(new VillageState.random(parcelCount))
    }

    const results = [];
    for (robot of Object.keys(robots)) {
        console.log(`Testing: ${robot}`);

        let acc = 0;
        const t0 = performance.now();
        for (test of tests) {
            acc += runRobot(test, robots[robot]);
        }
        const t1 = performance.now();
        const delta = t1 - t0;
        
        results.push({name: robot, averageSteps: acc / numTests, averageMilliseconds: delta / numTests});
    }

    return results;
}

let results = robotComparison(roboDictionary, 100, 5);

results.sort((a, b) => {
    if(a.averageSteps > b.averageSteps) {
        return 1;
    } else if (a.averageSteps < b.averageSteps){
        return -1;
    }
    return 0;
});

console.log(results);

/*
[
    {
      name: 'brutusBot',
      averageSteps: 11.97,
      averageMilliseconds: 49.204759
    },
    {
      name: 'thoughtfulPickupDropoffBot',
      averageSteps: 12.25,
      averageMilliseconds: 0.057651999999998225
    },
    {
      name: 'closestActionBot',
      averageSteps: 12.39,
      averageMilliseconds: 0.09779199999999946
    },
    {
      name: 'pickupDropoffBot',
      averageSteps: 13.86,
      averageMilliseconds: 0.025249999999996362
    },
    {
      name: 'goalOrientedBot',
      averageSteps: 15.59,
      averageMilliseconds: 0.07316700000000004
    },
    {
      name: 'goalOrientedButLovesHorsesBot',
      averageSteps: 16.16,
      averageMilliseconds: 0.07150800000000004
    },
    {
      name: 'routeBot',
      averageSteps: 17.55,
      averageMilliseconds: 0.03183
    },
    {
      name: 'randoBot',
      averageSteps: 71.61,
      averageMilliseconds: 0.06252700000000004
    }
  ]
  */
 