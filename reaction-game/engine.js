export class ReactionGame {
  constructor() {
    this.phase = "idle";     // current phase of the game
    this.readyTime = null;      // when green appeared
    this.reactionTime = null;     // reaction time result
  }

  start() {
    if(this.phase !== "idle") return

    this.readyTime = null
    this.reactionTime = null 

    this.phase = "waiting"
  }

  markReady(time) {
    // logic will go here later
  }

  click(time) {
    // logic will go here later
  }
}
 