/*jslint indent: 2 */
/*global $: false, togglbutton: false, createTag:false*/

'use strict';

togglbutton.render('.work-item-container:not(.toggl)', {observe: true}, function (elem) {
  var link, seperator = createTag('span','','|'),
    container = elem.querySelectorAll('.work-item-container .work-item-middle .extras .user-actions'),
    titleElem = elem.querySelectorAll('.work-item-container .work-item-middle .names .item-name a span'),
    projectElem = elem.querySelectorAll('.work-item-container .work-item-middle .names .project-name a span');
  link = togglbutton.createTimerLink({
    className: 'workfront',
    description: titleElem[0].innerHTML,
    projectName: projectElem.length ? projectElem[0].textContent : ""
  });

  container[0].appendChild(seperator);
  container[0].appendChild(link);
});
