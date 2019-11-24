import SessionsService from "../Services/SessionsService.js";
import _store from "../store.js";
import { generateId } from "../Utils.js";

// private
function _drawSessions() {
  // get html

  let template = "";
  let sessions = _store.State.sessions;
  sessions.forEach(session => (template += session.template));
  document.querySelector("#sessions").innerHTML = template;
}

// public
export default class SessionsController {
  constructor() {
    _drawSessions();
    console.log("Hello from sesionsController");
  }

  addSession() {
    console.log("got to the contoller");
    event.preventDefault();
    let form = event.target;

    let sessionData = {
      speakers: [],
      name: form.name.value
    };

    SessionsService.addSession(sessionData);
    form.reset();
    _drawSessions();
  }

  addSpeaker(event, sessionId) {
    event.preventDefault();
    let formData = event.target;

    let newSpeaker = {
      name: formData.name.value,
      topic: formData.topic.value,
      time: formData.time.value,
      sessionId
    };

    SessionsService.addSpeaker(newSpeaker);
    formData.reset();
    _drawSessions();
  }
  deleteSpeaker(sessionId, speakerId) {
    SessionsService.deleteSpeaker(sessionId, speakerId);
    _drawSessions();
  }
  deleteSession(sessionId) {
    SessionsService.deleteSession(sessionId);
    _drawSessions();
  }
}
