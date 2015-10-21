# Toggl Button for Custom Websites Chrome extension

-----

*__Disclaimer:__ This is not the official "Toggl Button" extension, though it is based off of the original with permission from the Toggl team**.

-----

__All the convenience of the [official "Toggl Button" extension][96], with the added benefit of custom websites.__

Does your company use a private Trac installation for work requests? Or maybe you frequently report bugs for a niche website using their Redmine instance?
Based on the popular "Toggl Button" Chrome extension, this modified version will allow you to integrate Toggl into any website you want, as long as it is running one of these supported services:

## Compatible services
  - [TeamWeek][2]
  - [Pivotal Tracker][3]
  - [GitHub][4]
  - [Asana][5]
  - [Unfuddle][6]
  - [GitLab][7]
  - [Trello][8]
  - [Worksection][9]
  - [Redbooth (old UI)][10]
  - [Podio][11]
  - [Basecamp][12]
  - [JIRA][13]
  - [Producteev][14]
  - [Bitbucket][15]
  - [Sifter][16]
  - [Google Docs][17]
  - [Redmine][18]
  - [YouTrack][19]
  - [CapsuleCRM][20]
  - [Xero][21]
  - [Zendesk][22]
  - [Any.do][23]
  - [Todoist][24]
  - [Trac][25]
  - [Wunderlist][26]
  - [Toodledo][27]
  - [Teamwork.com][28]
  - [Google Mail][29]
  - [Taiga][30]
  - [HabitRPG][31]
  - [Axosoft][32]
  - [Countersoft Gemini][33]
  - [Drupal][34]
  - [Esa][35]
  - [Help Scout][36]
  - [Flow][37]
  - [Sprintly][38]
  - [Google Calendar][39]
  - [TestRail][40]
  - [Bugzilla][41]
  - [Breeze][42]
  - [BamBam][43]
  - [GQueue][44]
  - [Wrike][45]
  - [Workfront][46]

## Installing from the Web Store

https://chrome.google.com/webstore/detail/toggl-button-for-custom-w/cblhgnnnpnonkonnfcfkfhhkoldjpdno

## Installing from Source

1.  Clone the repository: `git clone git://github.com/sfarbota/toggl-button-for-custom-websites`
2.  Navigate to `chrome://extensions/` and enable "Developer Mode".
3.  Choose "Load unpacked extension..."
4.  Open the src directory in the toggl-button directory you just cloned and follow the prompts to install.

## Change log

List of all the changes and added features can be found in the CHANGES file.

## Using the Button
1.  Log in to your [Toggl][1] account and keep yourself logged in (no need to keep the tab open).
2.  Add your custom website domains in the extension's Settings page.
3.  Go to [TeamWeek][2], [Pivotal Tracker][3], [Github][4], [Asana][5], [Unfuddle][6], [Gitlab][7],
[Trello][8], [Worksection][9], [Redbooth][10], [Podio][11], [Basecamp][12], [JIRA][13], [Producteev][14],
[Bitbucket][15], [Stifer][16], [Google Docs][17], [Redmine][18], [YouTrack][19], [CapsuleCRM][20],
[Xero][21], [Zendesk][22], [Any.do][23], [Todoist][24], [Trac][25], [Wunderlist][26], [Toodledo][27],
[Teamwork.com][28], [Google Mail][29], [Taiga][30], [HabitRPG][31], [Axosoft][32], [Countersoft Gemini][33], [Drupal][34], [Esa][35], [Help Scout][36], [Flow][37], [Sprintly][38], [Google Calendar][39], [TestRail][40], [Bugzilla][41], [Breeze][42], [BamBam][43], [GQueue][44], [Wrike][45], [Workfront][46] or a custom domain and start your Toggl timer there.
4.  To stop the current running timer:
  - press the button again
  - start another time entry inside your account.
  - go to Toggl to stop or edit your time entry.

## Custom websites
If you use a setup where one of the supported services is on a custom domain, you can customize the extension to fit your needs. This is where this unofficial version really shines. Just go to the extension's Settings page, check the option for "Custom websites", and add your custom domain to the list by clicking "+ Add new custom website" at the bottom of the list. You can also remove existing domains from the list if you do not use Toggl on those websites. Why waste precious time loading JavaScript you won't use?

## Contributing
Want to contribute? Great!

If you'd like to make a change related to the custom websites feature, just fork this project, make your changes and open a [Pull Request][98].

If you'd like to make a change related to another feature, you should fork the [original "Toggl Button" repository][96], open a [Pull Request][99] there, and let me catch the changes downstream.

*Permission from the Toggl team to fork their extension can be viewed at: https://github.com/toggl/toggl-button/pull/127#issuecomment-59708435.

[1]: https://www.toggl.com/
[2]: https://teamweek.com/
[3]: https://www.pivotaltracker.com/
[4]: https://github.com/
[5]: http://asana.com/
[6]: http://unfuddle.com/
[7]: https://gitlab.com/
[8]: https://trello.com/
[9]: http://worksection.com/
[10]: https://redbooth.com/
[11]: https://podio.com/
[12]: https://basecamp.com/
[13]: https://www.atlassian.com/software/jira
[14]: https://www.producteev.com/
[15]: https://www.bitbucket.org/
[16]: https://www.sifterapp.com/
[17]: https://docs.google.com/
[18]: http://www.redmine.org/
[19]: http://www.jetbrains.com/youtrack/
[20]: http://www.capsulecrm.com/
[21]: https://www.xero.com/
[22]: https://www.zendesk.com/
[23]: http://www.any.do/
[24]: https://todoist.com/
[25]: http://trac.edgewall.org/
[26]: https://www.wunderlist.com
[27]: https://www.toodledo.com/
[28]: https://www.teamwork.com/
[29]: https://mail.google.com
[30]: https://taiga.io/
[31]: https://habitrpg.com
[32]: https://www.axosoft.com
[33]: https://www.countersoft.com
[34]: https://www.drupal.org
[35]: https://esa.io
[36]: http://www.helpscout.net/
[37]: http://getflow.com/
[38]: https://sprint.ly
[39]: https://www.google.com/calendar
[40]: https://testrail.com
[41]: https://bugzilla.mozilla.org/
[42]: http://www.breeze.pm/
[43]: https://www.dobambam.com/
[44]: https://www.gqueues.com/
[45]: https://www.wrike.com/
[46]: http://www.workfront.com/
[96]: https://github.com/toggl/toggl-button
[98]: https://github.com/sfarbota/toggl-button-for-custom-websites/pulls
[99]: https://github.com/toggl/toggl-button/pulls
