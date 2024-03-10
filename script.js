// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  //upon reading a click on the save button, finds parent of button
  //takes parent, reads id to get hour. reads child textarea to get task
  //saves task with hour as key to localstorage
  $('.saveBtn').on('click', function(){
    const parent = $(this).parent();
    const textarea = parent.children('textarea');
    let key = parent.attr('id');
    let task = textarea.val();

    localStorage.setItem(key, task);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  //gets time of day as 24 hour item.
  const time = dayjs().hour();
  //iterates from 9 to 5(17) 
  for (let index = 9; index <= 17; index++) {
    //sets style for each row depending on whether or not it is before after or the same as the current hour
    if(time>index) {
     $("#hour-"+index).addClass('past');
    }else if(time==index){  
      $("#hour-"+index).addClass('present');
    }else{
      $("#hour-"+index).addClass('future');
    }
    //to avoid iterating twice, this passes index to the load function, which renders a record from local storage if there is one
    load(index);
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //as previously stated, renders items from local storage into the appropraite textarea
  function load(index){
    const selector = "#"+'hour-'+index;
    const task = localStorage.getItem('hour-'+index);
    $("#hour-"+index).children().eq(1).text(task);
  }

  // TODO: Add code to display the current date in the header of the page.

  //displays current date in the HTML element of the same name
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  
});
