class PageData {
  constructor() {
    this._username = localStorage.getItem("username") ?? null;
    this._usercity = localStorage.getItem("usercity") ?? null;
    this._appSettings = JSON.parse(localStorage.getItem("appSettings")) ?? {
      language: "en", // en | ru
      photoSource: "github",
      photoTags: [],
      blocks: ["time", "date", "greeting", "quote", "weather", "audio"],
    };
  }

  get username() {
    return this._username;
  }
  set username(value) {
    this._username = value;
    localStorage.setItem("username", value);
  }

  get usercity() {
    return this._usercity;
  }
  set usercity(value) {
    this._usercity = value;
    localStorage.setItem("usercity", value);
  }

  get appSettings() {
    return this._appSettings;
  }
  set appSettings(value) {
    this._appSettings = value;
    localStorage.setItem("appSettings", JSON.stringify(value));
  }
}

export const pageData = new PageData();
