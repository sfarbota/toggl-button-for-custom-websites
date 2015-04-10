/*jslint indent: 2, unparam: true*/
/*global $: false, document: false, togglbutton: false*/

'use strict';

togglbutton.render('.page-title:not(.toggl)', {observe: true}, function (elem) {
  var link,  description,
    numElem = $('.page-title'),
    titleElem = $(".issue-title"),
    projectElem = $('.title').firstChild;

  description = titleElem.textContent;
  var issuenumber = elem.innerHTML.match("Issue (?:#\d*).*");
  var myRegexp = /Issue (#\d+)/g;
  var match = myRegexp.exec(issuenumber);
  description = match[1]+" "+description;

  link = togglbutton.createTimerLink({
    className: 'gitlab',
    description: description,
    projectName: projectElem.textContent,
    tags: [$('.title span').lastChild.getAttribute('href')]
  });

  $('.page-title').appendChild(link);
});
