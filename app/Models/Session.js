import Speaker from "./Speaker.js";
import { generateId } from "../Utils.js";

export default class Session {
  constructor({ id = generateId(), name, speakers }) {
    this.id = id;
    this.name = name;
    this.speakers = speakers.map(s => new Speaker(s));
  }

  //NOTE getters return property so do not need to be invoked
  get template() {
    return /*html*/`
      <div class="col-5 mt-3 p-3 border rounded bg-info">
          <h1 class="text-center border-bottom">${this.name}</h1>
          <dl class="ml-5">
          ${this.drawSpeakers()}
          </dl>
          <form class="mx-auto" onsubmit="app.sessionsController.addSpeaker(event, '${this.id}')">
                        <div class="form-group row justify-content-center">
                            <label for="name" class="col-sm-1-12 col-form-label"></label>
                            <div class="col-sm-1-12">
                                <input type="text" class="form-control" name="name"
                                id="name" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-group row justify-content-center">
                                <label for="topic" class="col-sm-1-12 col-form-label"></label>
                                <div class="col-sm-1-12">
                                    <input type="text" class="form-control" name="topic" id="topic" placeholder="Topic">
                                </div>
                            </div>
                            <div class="form-group row justify-content-center">
                                    <label for="time" class="col-sm-1-12 col-form-label"></label>
                                    <div class="col-sm-1-12">
                                        <input type="text" class="form-control" name="time" id="time" placeholder="Time">
                                    </div>
                                </div>
                        <div class="form-group row justify-content-center">
                            <div class="col-sm-8">
                                <button type="submit" class="btn btn-primary btn-block">Action</button>
                                <button class="btn btn-danger btn-block" type="button" onclick="app.sessionsController.deleteSession('${this.id}')">Delete</button>
                            </div>
                        </div>
                    </form>
          </div>
    `
  }
  drawSpeakers(){
    let template = ''
    this.speakers.forEach(speaker => template += speaker.template);
    return template
  }
}
