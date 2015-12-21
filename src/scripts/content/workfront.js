/*jslint indent: 2 */
/*global $: false, togglbutton: false, createTag:false*/

'use strict';

//My Work - Working on view
if(document.querySelector('#mywork') !== null) {
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
}
//Issue inner view
if(document.querySelector('.DetailsView') !== null) {

  togglbutton.render('#layout-content:not(.toggl)', {observe: true}, function (elem) {
    var link, seperator = createTag('span','','|'),
      container = elem.querySelectorAll('.detail-tabs #UpdatesToolbar'),
      titleElem = elem.querySelectorAll('.DetailsView .pos-r .details-header h1 div'),
      projectElem = elem.querySelectorAll('.DetailsView .tile-loader a:first-of-type');
      console.log(titleElem[0]);
    link = togglbutton.createTimerLink({
      className: 'workfront',
      description: titleElem[0].innerHTML,
      projectName: projectElem.length ? projectElem[0].textContent : ""
    });

    container[0].appendChild(seperator);
    container[0].appendChild(link);
  });

}
