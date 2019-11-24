import _store from "../store.js";
import Speaker from "../Models/Speaker.js";
import Session from "../Models/Session.js";
import store from "../store.js";


class SessionsService {
  addSession(sessionData) {
    let freshSession = new Session(sessionData);
    _store.State.sessions.push(freshSession);
    _store.saveState();
  }

  addSpeaker(speakerData) {
    let speaker = new Speaker(speakerData);
    let foundSession = _store.State.sessions.find(
      session => session.id == speaker.sessionId
    );
    foundSession.speakers.push(speaker);
    _store.saveState();
  }


  deleteSpeaker(sessionId, speakerId) {
    let foundSession = _store.State.sessions.find(
      session => session.id == sessionId
    );
    foundSession.speakers = foundSession.speakers.filter(
      speaker => speaker.id != speakerId
    );
    _store.saveState();
  }
  constructor() {
    console.log("Hello from sesionsService");
  }
  deleteSession(sessionId){
    let foundSession = store.State.sessions.findIndex(session => session.id == sessionId)
    _store.State.sessions.splice(foundSession, 1);
    _store.saveState();
  }
}

const SESSIONSERVICE = new SessionsService();

export default SESSIONSERVICE;
