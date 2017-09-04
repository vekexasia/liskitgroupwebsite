import Vue from 'vue';
import Component from 'vue-class-component';
import { liskApi } from '../../utils';
import * as moment from 'moment';

const epoch   = new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0)).getTime();
const rewards = {
  milestones: [
    500000000, // Initial Reward
    400000000, // Milestone 1
    300000000, // Milestone 2
    200000000, // Milestone 3
    100000000  // Milestone 4
  ],
  offset    : 1451520,   // Start rewards at block (n)
  distance  : 3000000, // Distance between each milestone
};

@Component({
  components: {}
})
export default class BlockRewardComponent extends Vue {
  days: number                          = null;
  hours: number                         = null;
  minutes: number                       = null;
  seconds: number                       = null;
  blockHeight: number                   = null;
  date: string                          = null;
  newReward: number                     = null;
  nextMilestoneBlockTime: moment.Moment = null;

  async mounted() {
    const {blocks} = await liskApi.blocks
      .getBlocks({limit: 1, orderBy: 'height:desc'});

    const {height, timestamp} = blocks[0];
    const blockTimeDate       = moment.utc(epoch).add(timestamp, 'seconds');

    var curMilestoneIdx            = Math.floor((height - rewards.offset) / rewards.distance);
    var nextMilestoneAtBlockHeight = (curMilestoneIdx + 1) * rewards.distance + rewards.offset + 1;
    this.nextMilestoneBlockTime     = blockTimeDate.clone()
      .add(10 /*blockheight*/ * (nextMilestoneAtBlockHeight - height), 'seconds');

    this.date      = this.nextMilestoneBlockTime.format('YYYY-MM-DD hh:mm:ss');
    this.newReward = rewards.milestones[curMilestoneIdx+1] / Math.pow(10,8);
    this.blockHeight = nextMilestoneAtBlockHeight;

    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = moment.utc();
    this.days    = this.nextMilestoneBlockTime.diff(now, 'days');
    this.hours   = this.nextMilestoneBlockTime.clone()
      .subtract(this.days, 'days')
      .diff(now, 'hours');
    this.minutes = this.nextMilestoneBlockTime.clone()
      .subtract(this.days, 'days')
      .subtract(this.hours, 'hours')
      .diff(now, 'minutes');
    this.seconds = this.nextMilestoneBlockTime.clone()
      .subtract(this.days, 'days')
      .subtract(this.hours, 'hours')
      .subtract(this.minutes, 'minutes')
      .diff(now, 'seconds');
  }

}
