/*jslint indent: 2 */
/*global $: false, togglbutton: false, createTag:false*/

'use strict';

togglbutton.render('.work-item-container:not(.toggl)', {observe: true}, function (elem) {
  var link, seperator = createTag('span','','|'),
    container = $('.work-item-container .work-item-middle .extras .user-actions', elem),
    titleElem = $('.work-item-container .work-item-middle .names .item-name a span', elem),
    projectElem = $('.work-item-container .work-item-middle .names .project-name a span', elem);

  link = togglbutton.createTimerLink({
    className: 'workfront',
    description: titleElem.innerHTML,
    projectName: projectElem.textContent
  });

  container.appendChild(seperator);
  container.appendChild(link);
});
