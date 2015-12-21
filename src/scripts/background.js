/*jslint indent: 2, unparam: true, plusplus: true */
/*global window: false, XMLHttpRequest: false, WebSocket: false, chrome: false, btoa: false, localStorage:false */
"use strict";

var TogglButton = {
  $user: null,
  $curEntry: null,
  $showPostPopup: true,
  $ApiV8Url: "https://www.toggl.com/api/v8",
  $sendResponse: null,
  $socket: null,
  $retrySocket: false,
  $socketEnabled: false,
  $timer: null,
  $idleCheckEnabled: false,
  $idleInterval: 360000,
  $idleFromTo: "09:00-17:00",
  $lastSyncDate: null,
  $customWebsitesEnabled: false,
  $customWebsites: null,
  $fullVersion: ("TogglButton/" + chrome.runtime.getManifest().version),
  $version: (chrome.runtime.getManifest().version),
  $editForm: '<div id="toggl-button-edit-form">' +
      '<form>' +
      '<a class="toggl-button {service} active" href="#">Stop timer</a>' +
      '<a id="toggl-button-hide">&times;</a>' +
      '<div class="toggl-button-row">' +
        '<input name="toggl-button-description" type="text" id="toggl-button-description" class="toggl-button-input" value="">' +
      '</div>' +
      '<div class="toggl-button-row">' +
        '<select class="toggl-button-input" id="toggl-button-project" name="toggl-button-project">{projects}</select>' +
        '<div id="toggl-button-project-placeholder" class="toggl-button-input" disabled><div class="toggl-button-text">Add project</div><span>▼</span></div>' +
      '</div>' +
      '<div class="toggl-button-row" id="toggl-button-tasks-row">' +
        '<select class="toggl-button-input" id="toggl-button-task" name="toggl-button-task"></select>' +
        '<div id="toggl-button-task-placeholder" class="toggl-button-input" disabled><div class="toggl-button-text">Add task</div><span>▼</span></div>' +
      '</div>' +
      '<div class="toggl-button-row">' +
        '<select class="toggl-button-input" id="toggl-button-tag" name="toggl-button-tag" multiple>{tags}</select>' +
        '<div id="toggl-button-tag-placeholder" class="toggl-button-input" disabled><div class="toggl-button-text">Add tags</div><span>▼</span></div>' +
      '</div>' +
      '<div id="toggl-button-update">DONE</div>' +
      '</from>' +
    '</div>',
  $defaultWebsites: [{
      'url': 'web.any.do',
      'app': 'AnyDo'
    }, {
      'url': 'asana.com',
      'app': 'Asana'
    }, {
      'url': 'axosoft.com',
      'app': 'Axosoft'
    }, {
      'url': 'dobambam.com',
      'app': 'BamBam'
    }, {
      'url': 'basecamp.com',
      'app': 'Basecamp'
    }, {
      'url': 'bitbucket.org',
      'app': 'Bitbucket'
    }, {
      'url': 'app.breeze.pm',
      'app': 'Breeze'
    }, {
      'url': 'bugzilla.mozilla.org',
      'app': 'Bugzilla'
    }, {
      'url': 'capsulecrm.com',
      'app': 'Capsule'
    }, {
      'url': 'drupal.org',
      'app': 'Drupal'
    }, {
      'url': 'esa.io',
      'app': 'esa'
    }, {
      'url': 'getflow.com',
      'app': 'Flow'
    }, {
      'url': 'ongemini.com',
      'app': 'Gemini'
    }, {
      'url': 'github.com',
      'app': 'GitHub'
    }, {
      'url': 'gitlab.com',
      'app': 'GitLab'
    }, {
      'url': 'google.com/calendar',
      'app': 'GoogleCalendar'
    }, {
      'url': 'docs.google.com',
      'app': 'GoogleDocs'
    }, {
      'url': 'mail.google.com',
      'app': 'GoogleMail'
    }, {
      'url': 'www.gqueues.com',
      'app': 'GQueue'
    }, {
      'url': 'habitrpg.com',
      'app': 'HabitRPG'
    }, {
      'url': 'secure.helpscout.net',
      'app': 'HelpScout'
    }, {
      'url': 'atlassian.com',
      'app': 'JIRA'
    }, {
      'url': 'atlassian.net',
      'app': 'JIRA'
    }, {
      'url': 'jira.com',
      'app': 'JIRA'
    }, {
      'url': 'pivotaltracker.com',
      'app': 'PivotalTracker'
    }, {
      'url': 'podio.com',
      'app': 'Podio'
    }, {
      'url': 'producteev.com',
      'app': 'Producteev'
    }, {
      'url': 'redbooth.com',
      'app': 'Redbooth'
    }, {
      'url': 'redmine.org',
      'app': 'Redmine'
    }, {
      'url': 'sifterapp.com',
      'app': 'Sifter'
    }, {
      'url': 'sprint.ly',
      'app': 'Sprintly'
    }, {
      'url': 'taiga.io',
      'app': 'Taiga'
    }, {
      'url': 'teamweek.com',
      'app': 'Teamweek'
    }, {
      'url': 'teamwork.com',
      'app': 'Teamwork'
    }, {
      'url': 'teamworkpm.net',
      'app': 'Teamwork'
    }, {
      'url': 'testrail.com',
      'app': 'TestRail'
    }, {
      'url': 'testrail.net',
      'app': 'TestRail'
    }, {
      'url': 'todoist.com',
      'app': 'Todoist'
    }, {
      'url': 'toodledo.com',
      'app': 'Toodledo'
    }, {
      'url': 'bugs.jquery.com',
      'app': 'Trac'
    }, {
      'url': 'trac-hacks.org',
      'app': 'Trac'
    }, {
      'url': 'trac.edgewall.org',
      'app': 'Trac'
    }, {
      'url': 'trac.wordpress.org',
      'app': 'Trac'
    }, {
      'url': 'trello.com',
      'app': 'Trello'
    }, {
      'url': 'unfuddle.com',
      'app': 'Unfuddle'
    }, {
      'url': 'worksection.com',
      'app': 'Worksection'
    }, {
      'url': 'wrike.com',
      'app': 'Wrike'
    }, {
      'url': 'wunderlist.com',
      'app': 'Wunderlist'
    }, {
      'url': 'go.xero.com',
      'app': 'Xero'
    }, {
      'url': 'myjetbrains.com',
      'app': 'YouTrack'
    }, {
      'url': 'zendesk.com',
      'app': 'Zendesk'
    }],

  checkUrl: function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      if (/toggl\.com\/track/.test(tab.url)) {
        TogglButton.fetchUser(TogglButton.$apiUrl);
      } else if (/toggl\.com\/app\/index/.test(tab.url)) {
        TogglButton.fetchUser(TogglButton.$newApiUrl);
      } else {
        var websites = TogglButton.$defaultWebsites;
        if (TogglButton.$customWebsitesEnabled) {
          websites = TogglButton.$customWebsites;
        }
        for (var i = 0; i < websites.length; i++) {
          var curURL = websites[i]['url'];
          var curApp = websites[i]['app'];
          if (curURL && tab.url.indexOf(curURL) > -1) {
            switch (curApp) {
              case "AnyDo":
                chrome.tabs.executeScript({file: 'scripts/content/anydo.js'});
                break;
              case "Asana":
                chrome.tabs.executeScript({file: 'scripts/content/asana.js'});
                break;
              case "Axosoft":
                chrome.tabs.executeScript({file: 'scripts/content/axosoft.js'});
                break;
              case "BamBam":
                chrome.tabs.executeScript({file: 'scripts/content/dobambam.js'});
                break;
              case "Basecamp":
                chrome.tabs.executeScript({file: 'scripts/content/basecamp.js'});
                break;
              case "Bitbucket":
                chrome.tabs.executeScript({file: 'scripts/content/bitbucket.js'});
                break;
              case "Breeze":
                chrome.tabs.executeScript({file: 'scripts/content/breeze.js'});
                break;
              case "Bugzilla":
                chrome.tabs.executeScript({file: 'scripts/content/bugzilla.js'});
                break;
              case "Capsule":
                chrome.tabs.executeScript({file: 'scripts/content/capsule.js'});
                break;
              case "Drupal":
                chrome.tabs.executeScript({file: 'scripts/content/drupalorg.js'});
                break;
              case "esa":
                chrome.tabs.executeScript({file: 'scripts/content/esa.js'});
                break;
              case "Flow":
                chrome.tabs.executeScript({file: 'scripts/content/getflow.js'});
                break;
              case "Gemini":
                chrome.tabs.executeScript({file: 'scripts/content/gemini.js'});
                break;
              case "GitHub":
                chrome.tabs.executeScript({file: 'scripts/content/github.js'});
                break;
              case "GitLab":
                chrome.tabs.executeScript({file: 'scripts/content/gitlab.js'});
                break;
              case "GoogleCalendar":
                chrome.tabs.executeScript({file: 'scripts/content/google-calendar.js'});
                break;
              case "GoogleDocs":
                chrome.tabs.executeScript({file: 'scripts/content/google-docs.js'});
                break;
              case "GoogleMail":
                chrome.tabs.executeScript({file: 'scripts/content/google-mail.js'});
                break;
              case "GQueue":
                chrome.tabs.executeScript({file: 'scripts/content/gqueues.js'});
                break;
              case "HabitRPG":
                chrome.tabs.executeScript({file: 'scripts/content/habitrpg.js'});
                break;
              case "HelpScout":
                chrome.tabs.executeScript({file: 'scripts/content/helpscour.js'});
                break;
              case "JIRA":
                chrome.tabs.executeScript({file: 'scripts/content/jira.js'});
                break;
              case "PivotalTracker":
                chrome.tabs.executeScript({file: 'scripts/content/pivotal.js'});
                break;
              case "Podio":
                chrome.tabs.executeScript({file: 'scripts/content/podio.js'});
                break;
              case "Producteev":
                chrome.tabs.executeScript({file: 'scripts/content/producteev.js'});
                break;
              case "Redbooth":
                chrome.tabs.executeScript({file: 'scripts/content/redbooth.js'});
                break;
              case "Redmine":
                chrome.tabs.executeScript({file: 'scripts/content/redmine.js'});
                break;
              case "Sifter":
                chrome.tabs.executeScript({file: 'scripts/content/sifterapp.js'});
                break;
              case "Sprintly":
                chrome.tabs.executeScript({file: 'scripts/content/sprintly.js'});
                break;
              case "Taiga":
                chrome.tabs.executeScript({file: 'scripts/content/taiga.js'});
                break;
              case "Teamweek":
                chrome.tabs.executeScript({file: 'scripts/content/teamweek_new.js'});
                break;
              case "Teamwork":
                chrome.tabs.executeScript({file: 'scripts/content/teamworkpm.js'});
                break;
              case "TestRail":
                chrome.tabs.executeScript({file: 'scripts/content/testrail.js'});
                break;
              case "Todoist":
                chrome.tabs.executeScript({file: 'scripts/content/todoist.js'});
                break;
              case "Toodledo":
                chrome.tabs.executeScript({file: 'scripts/content/toodledo.js'});
                break;
              case "Trac":
                chrome.tabs.executeScript({file: 'scripts/content/trac.js'});
                break;
              case "Trello":
                chrome.tabs.executeScript({file: 'scripts/content/trello.js'});
                break;
              case "Unfuddle":
                chrome.tabs.executeScript({file: 'scripts/content/unfuddle.js'});
                break;
              case "Workfront":
                chrome.tabs.executeScript({file: 'scripts/content/workfront.js'});
                break;
              case "Worksection":
                chrome.tabs.executeScript({file: 'scripts/content/worksection.js'});
                break;
              case "Wunderlist":
                chrome.tabs.executeScript({file: 'scripts/content/wunderlist.js'});
                break;
              case "Wrike":
                chrome.tabs.executeScript({file: 'scripts/content/wrike.js'});
                break;
              case "Xero":
                chrome.tabs.executeScript({file: 'scripts/content/xero.js'});
                break;
              case "YouTrack":
                chrome.tabs.executeScript({file: 'scripts/content/youtrack.js'});
                break;
              case "Zendesk":
                chrome.tabs.executeScript({file: 'scripts/content/zendesk.js'});
                break;
              default:
                console.log('Invalid app name: ' + curApp);
            }
          }
        }
      }
    }
  },

  fetchUser: function (token) {
    TogglButton.ajax('/me?with_related_data=true', {
      token: token || ' ',
      baseUrl: TogglButton.$ApiV8Url,
      onLoad: function (xhr) {
        var resp, apiToken, projectMap = {}, clientMap = {}, clientNameMap = {}, tagMap = {}, projectTaskList = null;
        if (xhr.status === 200) {
          chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: "sync"});
          });
          resp = JSON.parse(xhr.responseText);
          TogglButton.$curEntry = null;
          TogglButton.setBrowserAction(null);
          if (resp.data.projects) {
            resp.data.projects.forEach(function (project) {
              if (project.active) {
                projectMap[project.name + project.id] = project;
              }
            });
          }
          if (resp.data.clients) {
            resp.data.clients.forEach(function (client) {
              clientMap[client.id] = client;
              clientNameMap[client.name.toLowerCase()] = client;
            });
          }
          if (resp.data.tags) {
            resp.data.tags.forEach(function (tag) {
              tagMap[tag.name] = tag;
            });
          }
          if (resp.data.tasks) {
            projectTaskList = {};
            resp.data.tasks.forEach(function (task) {
              var pid = task.pid;
              if (!projectTaskList[pid]) { projectTaskList[pid] = []; }
              projectTaskList[pid].push(task);
            });
          }
          if (resp.data.time_entries) {
            resp.data.time_entries.some(function (entry) {
              if (entry.duration < 0) {
                TogglButton.$curEntry = entry;
                TogglButton.setBrowserAction(entry);
                return true;
              }
              return false;
            });
          }
          TogglButton.$user = resp.data;
          TogglButton.$user.projectMap = projectMap;
          TogglButton.$user.clientMap = clientMap;
          TogglButton.$user.clientNameMap = clientNameMap;
          TogglButton.$user.tagMap = tagMap;
          TogglButton.$user.projectTaskList = projectTaskList;
          localStorage.removeItem('userToken');
          localStorage.setItem('userToken', resp.data.api_token);
          if (TogglButton.$sendResponse !== null) {
            TogglButton.$sendResponse({success: (xhr.status === 200)});
            TogglButton.$sendResponse = null;
            TogglButton.setBrowserActionBadge();
          }
          if (TogglButton.$socketEnabled) {
            TogglButton.setupSocket();
          }
        } else if (!token) {
          apiToken = localStorage.getItem('userToken');
          if (apiToken) {
            TogglButton.fetchUser(apiToken);
          }
        }
      }
    });
  },

  setupSocket: function () {
    var authenticationMessage, pingResponse;
    try {
      TogglButton.$socket = new WebSocket('wss://stream.toggl.com/ws');
    } catch (error) {
      return;
    }

    authenticationMessage = {
      type: 'authenticate',
      api_token: TogglButton.$user.api_token
    };
    pingResponse = JSON.stringify({
      type: "pong"
    });

    TogglButton.$socket.onopen = function () {
      var data;
      data = JSON.stringify(authenticationMessage);
      try {
        return TogglButton.$socket.send(data);
      } catch (error) {
        console.log("Exception while sending:", error);
      }
    };

    TogglButton.$socket.onerror = function (e) {
      return console.log('onerror: ', e);
    };

    TogglButton.$socket.onclose = function () {
      var retrySeconds = Math.floor(Math.random() * 30);
      if (TogglButton.$retrySocket) {
        setTimeout(TogglButton.setupSocket, retrySeconds * 1000);
        TogglButton.$retrySocket = false;
      }
    };

    TogglButton.$socket.onmessage = function (msg) {
      var data;
      data = JSON.parse(msg.data);
      if (data.model !== null) {
        if (data.model === "time_entry") {
          TogglButton.updateCurrentEntry(data);
        }
      } else if (TogglButton.$socket !== null) {
        try {
          TogglButton.$socket.send(pingResponse);
        } catch (error) {
          console.log("Exception while sending:", error);
        }
      }
    };

  },

  updateCurrentEntry: function (data) {
    var entry = data.data;
    if (data.action === "INSERT") {
      TogglButton.$curEntry = entry;
    } else if (data.action === "UPDATE" && (TogglButton.$curEntry === null || entry.id === TogglButton.$curEntry.id)) {
      if (entry.duration >= 0) {
        entry = null;
      }
      TogglButton.$curEntry = entry;
    }
    TogglButton.setBrowserAction(entry);
  },

  findProjectByName: function (name) {
    var key;
    for (key in TogglButton.$user.projectMap) {
      if (TogglButton.$user.projectMap.hasOwnProperty(key) && TogglButton.$user.projectMap[key].name === name) {
        return TogglButton.$user.projectMap[key];
      }
    }
    return undefined;
  },

  createTimeEntry: function (timeEntry, sendResponse) {
    var project, start = new Date(),
      entry = {
        time_entry: {
          start: start.toISOString(),
          description: timeEntry.description,
          wid: TogglButton.$user.default_wid,
          pid: timeEntry.projectId || null,
          tags: timeEntry.tags || null,
          billable: timeEntry.billable || false,
          duration: -(start.getTime() / 1000),
          created_with: timeEntry.createdWith || TogglButton.$fullVersion,
          duronly: !TogglButton.$user.store_start_and_stop_time
        }
      };

    if (timeEntry.projectName !== null) {
      project = TogglButton.findProjectByName(timeEntry.projectName);
      entry.time_entry.pid = project && project.id;
      entry.time_entry.billable = project && project.billable;
    }

    TogglButton.ajax('/time_entries', {
      method: 'POST',
      payload: entry,
      onLoad: function (xhr) {
        var responseData;
        responseData = JSON.parse(xhr.responseText);
        entry = responseData && responseData.data;
        TogglButton.$curEntry = entry;
        TogglButton.setBrowserAction(entry);
        if (!!timeEntry.respond) {
          sendResponse({success: (xhr.status === 200), type: "New Entry", entry: entry, showPostPopup: TogglButton.$showPostPopup, html: TogglButton.getEditForm(), hasTasks: !!TogglButton.$user.projectTaskList});
        }
        if (TogglButton.$timer !== null) {
          clearTimeout(TogglButton.$timer);
        }
      }
    });
  },

  ajax: function (url, opts) {
    var xhr = new XMLHttpRequest(),
      method = opts.method || 'GET',
      baseUrl = opts.baseUrl || TogglButton.$ApiV8Url,
      token = opts.token || (TogglButton.$user && TogglButton.$user.api_token),
      credentials = opts.credentials || null;

    xhr.open(method, baseUrl + url, true);
    if (opts.onLoad) {
      xhr.addEventListener('load', function () { opts.onLoad(xhr); });
    }
    if (token && token !== ' ') {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token + ':api_token'));
    }
    if (credentials) {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password));
    }
    xhr.send(JSON.stringify(opts.payload));
  },

  stopTimeEntry: function (timeEntry, sendResponse) {
    if (!TogglButton.$curEntry) { return; }
    var stopTime = new Date(),
      startTime = new Date(-TogglButton.$curEntry.duration * 1000);

    TogglButton.ajax("/time_entries/" + TogglButton.$curEntry.id, {
      method: 'PUT',
      payload: {
        time_entry: {
          stop: stopTime.toISOString(),
          duration: Math.floor(((stopTime - startTime) / 1000))
        }
      },
      onLoad: function (xhr) {
        if (xhr.status === 200) {
          TogglButton.$timer = TogglButton.$curEntry = null;
          TogglButton.setBrowserAction(null);
          if (!!timeEntry.respond) {
            sendResponse({success: true, type: "Stop"});
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {type: "stop-entry"});
            });
          }
          TogglButton.triggerNotification();
        }
      }
    });
  },

  updateTimeEntry: function (timeEntry, sendResponse) {
    var entry, project;
    if (!TogglButton.$curEntry) { return; }
    entry = {
      time_entry: {
        description: timeEntry.description,
        pid: timeEntry.pid,
        tags: timeEntry.tags,
        tid: timeEntry.tid
      }
    };

    if (timeEntry.pid !== null && timeEntry.projectName !== null) {
      project = TogglButton.$user.projectMap[timeEntry.projectName + timeEntry.pid];
      entry.time_entry.billable = project && project.billable;
    }

    TogglButton.ajax("/time_entries/" + TogglButton.$curEntry.id, {
      method: 'PUT',
      payload: entry,
      onLoad: function (xhr) {
        var responseData;
        responseData = JSON.parse(xhr.responseText);
        entry = responseData && responseData.data;
        TogglButton.$curEntry = entry;
        TogglButton.setBrowserAction(entry);
        if (!!timeEntry.respond) {
          sendResponse({success: (xhr.status === 200), type: "Update"});
        }
      }
    });
  },

  setBrowserActionBadge: function () {
    var badge = "";
    if (TogglButton.$user === null) {
      badge = "x";
      TogglButton.setBrowserAction(null);
    }
    chrome.browserAction.setBadgeText(
      {text: badge}
    );
  },

  setBrowserAction: function (runningEntry) {
    var imagePath = {'19': 'images/inactive-19.png', '38': 'images/inactive-38.png'},
      title = chrome.runtime.getManifest().browser_action.default_title;
    if (runningEntry !== null) {
      imagePath = {'19': 'images/active-19.png', '38': 'images/active-38.png'};
      if (!!runningEntry.description && runningEntry.description.length > 0) {
        title = runningEntry.description + " - Toggl";
      } else {
        title = "(no description) - Toggl";
      }
    }
    chrome.browserAction.setTitle({
      title: title
    });
    chrome.browserAction.setIcon({
      path: imagePath
    });
    TogglButton.updatePopup();
  },

  loginUser: function (request, sendResponse) {
    TogglButton.ajax("/sessions", {
      method: 'POST',
      onLoad: function (xhr) {
        TogglButton.$sendResponse = sendResponse;
        if (xhr.status === 200) {
          TogglButton.fetchUser();
          TogglButton.refreshPage();
        } else {
          sendResponse({success: false, xhr: xhr});
        }
      },
      credentials: {
        username: request.username,
        password: request.password
      }
    });
  },

  logoutUser: function (sendResponse) {
    TogglButton.ajax("/sessions?created_with=" + TogglButton.$fullVersion, {
      method: 'DELETE',
      onLoad: function (xhr) {
        TogglButton.$user = null;
        TogglButton.$curEntry = null;
        localStorage.setItem('userToken', null);
        sendResponse({success: (xhr.status === 200), xhr: xhr});
        TogglButton.refreshPage();
      }
    });
  },

  getEditForm: function () {
    if (TogglButton.$user === null) {
      return "";
    }
    return TogglButton.$editForm
        .replace("{projects}", TogglButton.fillProjects())
        .replace("{tags}", TogglButton.fillTags());
  },

  fillProjects: function () {
    var html = "<option value='0'>- No Project -</option>",
      projects = TogglButton.$user.projectMap,
      clients =  TogglButton.$user.clientMap,
      clientNames = TogglButton.$user.clientNameMap,
      wsHtml = {},
      clientHtml = {},
      client,
      project,
      key = null,
      ckey = null,
      keys = [],
      clientName = 0,
      i,
      validate = function (item) {
        return item.indexOf("</option>") !== -1 &&
          !!item &&
          ((item.match(/\/option/g) || []).length > 1 || item.length > 1);
      };

    // Sort clients
    for (key in clientNames) {
      if (clientNames.hasOwnProperty(key)) {
        keys.push(key.toLowerCase());
      }
    }
    keys.sort();

    if (TogglButton.$user.workspaces.length > 1) {

      // Add Workspace names
      TogglButton.$user.workspaces.forEach(function (element, index) {
        wsHtml[element.id] = {};
        wsHtml[element.id][0] = '<option disabled="disabled">  ---  ' + element.name.toUpperCase() + '  ---  </option>';
      });

      // Add client optgroups
      for (i = 0; i < keys.length; i++) {
        client = clientNames[keys[i]];
        wsHtml[client.wid][client.name + client.id] = '<optgroup label="' + client.name + '">';
      }

      // Add projects
      for (key in projects) {
        if (projects.hasOwnProperty(key)) {
          project = projects[key];
          clientName = (!!project.cid) ? (clients[project.cid].name + project.cid) : 0;
          wsHtml[project.wid][clientName] += "<option value='" + project.id + "'>" + project.name + "</option>";
        }
      }

      // create html
      for (key in wsHtml) {
        if (wsHtml.hasOwnProperty(key)) {
          Object.keys(wsHtml[key]).sort();
          for (ckey in wsHtml[key]) {
            if (wsHtml[key].hasOwnProperty(ckey) && validate(wsHtml[key][ckey])) {
              html += wsHtml[key][ckey] + "</optgroup>";
            }
          }
        }
      }

    } else {

      // Add clients

      for (i = 0; i < keys.length; i++) {
        client = clientNames[keys[i]];
        clientHtml[client.name + client.id] = '<optgroup label="' + client.name + '">';
      }

      // Add projects

      for (key in projects) {
        if (projects.hasOwnProperty(key)) {
          project = projects[key];
          clientName = (!!project.cid) ? (clients[project.cid].name + project.cid) : 0;
          clientHtml[clientName] += "<option value='" + project.id + "'>" + project.name + "</option>";
        }
      }

      // Create html

      for (key in clientHtml) {
        if (clientHtml.hasOwnProperty(key) && clientHtml[key].indexOf("</option>") !== -1) {
          html += clientHtml[key];
          if (key !== "0") {
            html += "</optgroup>";
          }
        }
      }
    }

    return html;
  },

  fillTags: function () {
    var html = "",
      tags = TogglButton.$user.tagMap,
      i,
      key = null,
      keys = [];

    for (key in tags) {
      if (tags.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    keys.sort();

    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      html += "<option value='" + tags[key].name + "'>" + key + "</option>";
    }
    return html;
  },

  fillTasks: function (projectId) {
    if (TogglButton.$user && TogglButton.$user.projectTaskList) {
      var tasks = TogglButton.$user.projectTaskList[projectId];

      if (tasks) {
        return [{id: 0, name: '- No Task -'}]
          .concat(tasks)
            .map(function (task) { return '<option value="' + task.id + '">' + task.name + '</option>'; })
            .join("");
      }
    }

    return "";
  },

  refreshPage: function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  },

  setSocket: function (state) {
    localStorage.setItem("socketEnabled", state);
    TogglButton.$socketEnabled = state;
    if (state) {
      if (TogglButton.$socket !== null) {
        TogglButton.$socket.close();
        TogglButton.$socket = null;
      }
      TogglButton.setupSocket();
    } else {
      TogglButton.$socket.close();
      TogglButton.$socket = null;
    }
  },

  setCustomWebsites: function (customWebsites) {
    localStorage.setItem('customWebsites', JSON.stringify(customWebsites));
    TogglButton.$customWebsites = customWebsites;
  },

  setCustomWebsitesCheckbox: function (state) {
    localStorage.setItem("customWebsitesEnabled", state);
    TogglButton.$customWebsitesEnabled = state;
    if (state) {
      TogglButton.triggerNotification();
    }
  },

  setNanny: function (state) {
    localStorage.setItem("idleCheckEnabled", state);
    TogglButton.$idleCheckEnabled = state;
    if (state) {
      TogglButton.triggerNotification();
    }
  },

  setNannyFromTo: function (state) {
    localStorage.setItem("idleFromTo", state);
    TogglButton.$idleFromTo = state;
    if (TogglButton.$idleCheckEnabled) {
      TogglButton.triggerNotification();
    }
  },

  setNannyInterval: function (state) {
    localStorage.setItem("idleInterval", Math.max(state, 1000));
    TogglButton.$idleInterval = state;
    if (TogglButton.$idleCheckEnabled) {
      TogglButton.triggerNotification();
    }
  },

  checkState: function () {
    chrome.idle.queryState(15, TogglButton.checkActivity);
  },

  checkActivity: function (currentState) {
    clearTimeout(TogglButton.$timer);
    TogglButton.$timer = null;
    if (TogglButton.$user && currentState === "active" &&
        TogglButton.$idleCheckEnabled &&
        TogglButton.$curEntry === null &&
        TogglButton.workingTime()) {
      chrome.notifications.create(
        'remind-to-track-time',
        {
          type: 'basic',
          iconUrl: 'images/icon-128.png',
          title: "Toggl Button",
          message: "Don't forget to track your time!"
        },
        function () {
          return;
        }
      );
    }
  },

  workingTime: function () {
    var now = new Date(),
      fromTo = TogglButton.$idleFromTo.split("-"),
      start,
      end,
      startHelper,
      endHelper;

    if (now.getDay() === 6 || now.getDay() === 0) {
      return false;
    }
    startHelper = fromTo[0].split(":");
    endHelper = fromTo[1].split(":");
    start = new Date();
    start.setHours(startHelper[0]);
    start.setMinutes(startHelper[1]);
    end = new Date();
    end.setHours(endHelper[0]);
    end.setMinutes(endHelper[1]);
    return (now > start && now <= end);
  },

  triggerNotification: function () {
    if (TogglButton.$timer === null && TogglButton.$curEntry === null) {
      TogglButton.hideNotification();
      TogglButton.$timer = setTimeout(TogglButton.checkState, TogglButton.$idleInterval);
    }
  },

  hideNotification: function () {
    chrome.notifications.clear(
      'remind-to-track-time',
      function () {
        return;
      }
    );
  },

  checkDailyUpdate: function () {
    var d = new Date(),
      currentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    if (TogglButton.$lastSyncDate === null || TogglButton.$lastSyncDate !== currentDate) {
      TogglButton.fetchUser();
      TogglButton.$lastSyncDate = currentDate;
    }
  },

  loadSetting: function (setting) {
    var value = localStorage.getItem(setting);
    return !(value !== null && (value === "false" || !value));
  },

  updatePopup: function () {
    var popup = chrome.extension.getViews({"type": "popup"});
    if (popup.length) {
      popup[0].PopUp.showPage();
    }
  },

  newMessage: function (request, sender, sendResponse) {
    if (request.type === 'activate') {
      TogglButton.checkDailyUpdate();
      TogglButton.setBrowserActionBadge();
      sendResponse({success: TogglButton.$user !== null, user: TogglButton.$user, version: TogglButton.$fullVersion});
      TogglButton.triggerNotification();
    } else if (request.type === 'login') {
      TogglButton.loginUser(request, sendResponse);
    } else if (request.type === 'logout') {
      TogglButton.logoutUser(sendResponse);
    } else if (request.type === 'sync') {
      TogglButton.fetchUser();
    } else if (request.type === 'timeEntry') {
      TogglButton.createTimeEntry(request, sendResponse);
      TogglButton.hideNotification();
    } else if (request.type === 'update') {
      TogglButton.updateTimeEntry(request, sendResponse);
    } else if (request.type === 'stop') {
      TogglButton.stopTimeEntry(request, sendResponse);
    } else if (request.type === 'toggle-popup') {
      localStorage.setItem("showPostPopup", request.state);
      TogglButton.$showPostPopup = request.state;
    } else if (request.type === 'toggle-socket') {
      TogglButton.setSocket(request.state);
    } else if (request.type === 'toggle-nanny') {
      TogglButton.setNanny(request.state);
    } else if (request.type === 'toggle-nanny-from-to') {
      TogglButton.setNannyFromTo(request.state);
    } else if (request.type === 'toggle-nanny-interval') {
      TogglButton.setNannyInterval(request.state);
    } else if (request.type === 'toggle-custom-websites') {
      TogglButton.setCustomWebsitesCheckbox(request.state);
    } else if (request.type === 'set-custom-website') {
      var customWebsites = TogglButton.$customWebsites.slice();
      customWebsites[request.index] = request.value;
      TogglButton.setCustomWebsites(customWebsites);
    } else if (request.type === 'remove-custom-website') {
      var customWebsites = TogglButton.$customWebsites.slice();
      customWebsites.splice(request.index, 1);
      TogglButton.setCustomWebsites(customWebsites);
    } else if (request.type === 'restore-custom-websites-to-default') {
      TogglButton.setCustomWebsites(TogglButton.$defaultWebsites.slice());
      sendResponse();
    } else if (request.type === 'userToken') {
      if (!TogglButton.$user) {
        TogglButton.fetchUser(request.apiToken);
      }
    } else if (request.type === 'currentEntry') {
      sendResponse({success: TogglButton.$curEntry !== null, currentEntry: TogglButton.$curEntry});
    } else if (request.type === 'getTasksHtml') {
      var success = TogglButton.$user && TogglButton.$user.projectTaskList;

      sendResponse({
        success: success,
        html: success ? TogglButton.fillTasks(request.projectId) : ''
      });
    }
    return true;
  }
};

TogglButton.fetchUser();
TogglButton.$showPostPopup = (localStorage.getItem("showPostPopup") === null) ? true : localStorage.getItem("showPostPopup") === "true";
TogglButton.$socketEnabled = localStorage.getItem("socketEnabled") === "true";
TogglButton.$idleCheckEnabled = localStorage.getItem("idleCheckEnabled") === "true";
TogglButton.$idleInterval = (localStorage.getItem("idleInterval") === "true") ? localStorage.getItem("idleInterval") : 360000;
TogglButton.$idleFromTo = (localStorage.getItem("idleFromTo") === "true") ? localStorage.getItem("idleFromTo") : "09:00-17:00";
TogglButton.$customWebsitesEnabled = localStorage.getItem("customWebsitesEnabled") === "true";
TogglButton.$customWebsites = JSON.parse(localStorage.getItem("customWebsites"));
TogglButton.triggerNotification();
chrome.tabs.onUpdated.addListener(TogglButton.checkUrl);
chrome.extension.onMessage.addListener(TogglButton.newMessage);
chrome.notifications.onClosed.addListener(TogglButton.triggerNotification);
chrome.notifications.onClicked.addListener(TogglButton.triggerNotification);
