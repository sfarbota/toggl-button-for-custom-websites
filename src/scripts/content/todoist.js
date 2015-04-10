/*jslint indent: 2 */
/*global $: false, togglbutton: false*/

'use strict';

togglbutton.render('.task_item .content:not(.toggl)', {observe: true}, function (elem) {
  var link, container = $('.text', elem),
    projectElem = $('.project_link');

  link = togglbutton.createTimerLink({
    className: 'todoist',
    description: container.firstChild.textContent,
    projectName: projectElem && projectElem.textContent,
    tags: [$('.project_link').firstChild.innerHTML]
  });

  container.insertBefore(link, container.lastChild);
});
