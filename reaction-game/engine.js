export class ReactionGame {
  constructor() {
    this.phase = "idle"; // idle | waiting | ready | reacted | cheated
    this.readyTime = null;
    this.reactionTime = null;
  }

  start() {
    if (this.phase !== "idle") return;

    this.readyTime = null;
    this.reactionTime = null;
    this.phase = "waiting";
  }

  markReady(time) {
    if (this.phase !== "waiting") return;

    this.readyTime = time;
    this.phase = "ready";
  }

  click(time) {
    if (this.phase === "waiting") {
      this.phase = "cheated";
      return;
    }

    if (this.phase === "ready") {
      this.reactionTime = time - this.readyTime;
      this.phase = "reacted";
      return;
    }
  }
}
