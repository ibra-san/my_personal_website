const menuExitButton = document.querySelector('#menu-exit-button'); 
const menuContainer = document.querySelector('#menu-container');
const menuOpenButton = document.querySelector('#menu-open-button');
const openMenuButton2 = document.querySelector('[data-open-menu-button-2]');
/* Methods: 
1) Listens for the back button on the menu and closes the menu on click 
2) Listens for a click on the burger button and opens the menu
3) Open menu from the no list message.


*/

menuExitButton.addEventListener('click', closeMenu); //1
menuOpenButton.addEventListener('click', openMenu); //2
openMenuButton2.addEventListener('click', openMenu); //3
/*Function below closes the menu when you click on the back button */
function closeMenu () { 
    
    menuContainer.className = "absolute h-auto w-2/3 sm:w-1/2  lg:w-5/12 bg-gray-700 backdrop-blur-sm bg-opacity-40 rounded-md shadow-xl z-10 flex flex-col -translate-x-full duration-500 ease-out ";
    menuOpenButton.className = "hover:text-gray-500 hover:cursor-pointer rounded-full shadow-2xl left-4 top-2 p-1 fas fa-bars z-0 rotate-180 transition-transform ease-out delay-[0.300s] duration-1000 ease-out";
    
}

/*Function below opens the menu whether you click the burger button or the pluse button */
function openMenu () { 
    menuContainer.className = "absolute h-auto w-2/3 sm:w-1/2  lg:w-5/12 bg-gray-700 backdrop-blur-sm bg-opacity-40 rounded-md shadow-xl z-10 flex flex-col transition-all duration-500 ease-out";

}




/*******                 Creating the functionality for the todo list  ***** *** ** ** */

/*
1) We are going to deal with the lists and creating the list because its much easier to deal with rather than the actual todo container. 

1.1: 
    Create an empty array that is going to contain all the lists that we create. It needs to be empty at the beginning by default as the page gets reloaded. 

1.2: 
    We are going to create a data-list attribute that we are going to use in order to select the list container in our HTML. 

1.3: 
    comment the demo lists we created and styled. That is because we want to actually load lists from the container we created in step 1.1 called lists (HTML file)

1.4: 
    In order to achieve step 1.3 and load the list data we are going to create a render function that is going to render the list for us. This render function will always run on every reload.

1.5: 
    The first thing render is going to do is clear the list container on every reload. We want it to be empty at all times. 

1.6: 
    We have created an element called list element that is going to clear the element that got passed into it. So we are passing the container of the list and we want to clear all the children and content of that list.  It will clear out all the elements that actually exist 

1.7: 
    we are going to populate the list container will all the list items we are going to create. In order to do that we are going to copy one of the 'li' that is within the container in order to know how it looks like and make sure that every list item we create looks the same as the rest of the items in the list container

1.8: 
    Lists array is going to maintain the name of the lists we are going to create. From the list name we are then going to display the list names in its specified area. We would want to do that with every list item. Is with every list entry in the array we want to create an 'li' for it and append that li to the list container. Hence displaying the all the lists in the list array onto the DOM. So this step simply means we should just output all the items in the list array into the DOM with the styling of the list container lists items
    1.8(a) :
        Something important to note here, that classList.add("StringHere") adds a class to the already existing classes. It doesnot overwrite the existing classes, however, it cannot be more than one class. For it to be more than one class which is for instance in the case of tailwindCss, you will need ot actually use className = ""

1.9: 
    The next step now is to clear all the elements that have not been created using the techinque we have used in the 1.8. Remember we have commented some li in the HTML document in 1.3, if those where to uncomment, they will also be displayed in the DOM with the ones from the List. We just want to make sure that all the list names we get are from the lists Array we have created. That is done by using clearElement function.
    1.9(a): Function explanation: 
        The function will loop through the list container, and it will remove any childs for it that has been placed init through the HTML or any other way. After clearing the list, it will now create the new list elements from the technique we have created in 1.8. The function will keep looping until there is no first child in the list anymore. 

1.10: 
    Now is time to know which list item is one that is active / selected. In order to know that, we need ot give each and every list item we have in the lists array and id, that way when we click on the list item we know what list item we have clicked given the id we have set to the said item. Hence or array needs to be an array of objects and not strings. For now we are going to simple just input simple id values. 
    1.10(a): 
        Just creating the object that we are going to use. Firs displaying the name of the item, as with the normal notation it will display the object as a whole and not the items name only.
    1.10(b): 
        Adding a data attribute to the elemenet we have created, and give that attribute the value of id. That way we could know when clicking or looking or inspecting the element which element we are looking at and which item corrsponds to it. And later we can know whether its selected or not. 

1.11: 
    After creating the infrastructure that will help us render our list. Render means update or run our list continously and  of course creating a list item, and knowning which list we are selecting or is active, we are now going to add functionality to the list input form so that we can dynamically add list names. 

1.12: 
    The next step is to actually type in the list name and then add it to the list. Remember the lists array has an id and a name. Hence every entry needs to have both and id and an array. Also every list will have its own list of tasks. We need to add that to the array as well. The list of tasks that belong to every array. 
    1.12(a): 
        Create an HTML data set for both the form and input of the new list. 
    1.12(b): 
        Create an event listener that is going to prevent the default submittion of the form. The second thing it will get the submitted value from the form input. The event listener will then call a function that is going to add the input into an object, then this object is going to be pushed onto the lists array. Now the fastest way to create a unique id is to actually create the id based on the todays date or rather the date the input was submitted. Finally call the render function which renders our list and adds the new input into our DOM. 


1.13: 
    We have now reached a very important point. You see I postponed that idea for later before, but that led to too much complexty. STORAGE. Its time to store the lists we have created into the local storage of the clients browser. That way when the user actually reloads their page the created list doesn't get lost anymore. This is going to be broken down into steps.
        1.13(a): 
            You will need to create a Key for your local Storage. The local Storage key is basically the name the content you want to store is going to be stored under. Name spacing the key actually avoids overwritting the key with other things that gets stored in your local storage by you or other websites. 
        1.13(b): 
            Make sure the lists array we have created recieve the data from the local storage, and if there is nothing stored in the local storage return an empty array. 
        1.13(c): 
            Make a function that is actually going to save the key the and the value of the key into the local storage. Remember the content in the local storage needs to be in string formate, that is what local storage acccepts. ALso local storage actually just adds strings and nothing more, if you want to add objects you will need to convert to a string, that is done using JSON. 
        1.13(d): 
            Create a function that combines both save and render so when you actually create a new list it will be both saved in the local storage and renderd as well. 


1.14:
    The next step now is selecting the lists. Clicking on the lists right now doesn't do anything. What we want to do is select the list on click. Since we added the ids to the created list (the ids are made from data sets and todays date), selecting them becoems fairly easy. 
    1.14(a): 
        The idea is to actually fetch the id of the selected list from local storage
    1.14(b): 
        Create a variable the is going to store the id value of the selected list from the local storage. For some reason if we don't have anything in the selected List id, then the value returned is going to be null and  that is all, we want to return null if nothing is selected. Also note anychanges you do to the localStorage in terms of how it works, will lead to all the data to be lost (not sure about this part though, there was some weird activities for sure. But a refresh to the page returned everything back).
        
    1.14(c): 
        Now on render we need to make sure that the selected list id is equal to the id of the created list. If so we add the class Active list to it. This way we can identify which list is active and which one is not. 

    1.14(d): 
        Adding the event listener to a dynamically created element is kind of hard, however, the a way to get around it is to actually create an event listener on the container of the element you want to select. In our case we want to make sure that we have clicked on an Li element and not just a random place inside the container. We want to also check if the id of the clicked element matches the id we have in the selectedlist. If its is, then action needs to be taken, and save and render should run. 


    SIDENOTE: The render function been called on every reload and on every submit is actually very important. That is the main idea behind react, is that any update or any changes or any submition to part of the code the entire page is going to get render. We want to create that in order to make sure that everything works fine when the user opens the menu and sees the list he has created. I don't know how can I stress this point over and over again, save and render the entire page again. Any change that occurs in the page, that change should lead to the entire page to be rendered again, that is the idea behind react and nextjs that is why they make life so much easier when it comes to creating apps likes this. 


1.15: 
    After we are doing creating the new list item its just right to create a button that is going to delete the newley selected item. That is pretty straight forward for sure. When you click on the button you are going to search inside the lists array for the list that has an id that matches the selectedId, if that is the case then remove that item from the array and save and render the entire page again. Always save and render. This is done through an event listener on the button click

SIDENOTE: 
    DEALING WITH FILTER FIND AND OTHER METHODS THEY RETURN THINGS, IF YOU LEAVE THEM OPEN SPECIALLY IF YOU TREATE THEM AS CALLBACK FUNCTIONS WITHOUT RETURN, THEY WILL NOT DO THE TASK YOU ASK THEM TO, BUT REATHER, THEY ARE GOING TO RUN THE ENTIRE COMMAND ON ALL OF THE ITEMS IN THE ARRAY WITHOUT RUNNING THE CRITERIA THAT YOU SET FOR THEM. FOR INSTANCE IF YOU WANTED TO FIND AN OBJECT THAT IS LESS THAN TWO AND YOU DID NOT RETUNR THE FINDINGS, THE FUNCTION IS GOING TO CONSIDER THAT ALL THE NUMBERS IN THE ARRAY IS ACTUALLY LESS THAT TWO, OR MAYBE VISEVERA, DIDN'T TEST THE THEORY BEHIND THIS, BUT I KNOW THAT IT AIN'T GOING TO RETURN WHAT YOU WANT.
    
1.16: 
    After dealing with all them moving parts with creating lists, its time to create the tasks for each list. That starts by actually selecting the entire list items container, the title of the container, and the container of the tasks themselves, and also we are going to select the tasks count as well. 
    1.16(a): 
        First when a list is not selected we are going to make the container for the lists tasks disappear, and when there is a selected list the lists tasks is going to appear. Also we are going to show messages saying that there is no lists been selected when there are lists in the lists array, however, if there are no lists in the list array we are going to ask the user to create a new list. 
    1.16(b): 
        After making sure that the list only shows up when a list is selected the next thing to change is the title of the items list container. 
    1.16(c): 
        Changing changing the number of tasks remaining. That is simple. That tasks array is actually going to have 3 parts an id, the task string and the whether its checked or not. 


1.17: 
    The task count works, the title changes and the list tasks container appears when an item is selected. Now is time to make the tasks work. It is straight forward because its very similar to the list contianer. whatever we are going to do to the list container we are going to do with the task container but with a slight twist. 
    1.17(a): 
        First thing is to actually clear all the elements in the tasks container. 
    1.17(b): 
        We are going to target the template we created and all its elements. After targetting the template we are going to just recreate the entire list from that template that is all. 
    1.17(c): 
        Here we are going to createa function called rendertasks that is going to create and render task for us. That is the idea behind it that is all. This function we recreate the tasks for us that is all. It is important to know that if we just simple copy the elemtn or equate the elemant to a variable we are just going to copy the out most div, and not anything isnide it in details. That is where importnode comes to play and adding the true boolean will allow us to copy the entirty of the selected element with its children. After you start copying the template, its tiem to actually just rebuild the template, and build the entire thing. Starting with the checkbox and checking its statu and giving it an id. 
    1.17(d): 
        We have already managed to make the template work. Meaning any new task we are going to add is going to have the same template that we created and is going to have the same style. However, now there are three things that are not working 1) Adding a new task doesn't actually work (dynamically) 2) Adding a new task or completeting a task doesn't change the number of remaining tasks. 3) We cannot still clear the completed Tasks. In this part we are going to finish the first problem of adding an new task. This should be very straight forward. => This is done by selecting the form and the input tags and targeting them and their values. The way it works is very similar to the way creating new lists work except the tasks are actually pused as an object into the list itself. Remember the list has id, name and the tasks related to it. Hence it will automatically get saved when we push the tasks we created into the lists tasks. However, the slight change is in that the form should only work on the selected list. Meaning the entered task should only be for that list and nothing else, that is where selectedList comes into action. 
            1) Create Data sets for the form of the tasks and the input.
            2) Target the newly created data sets. 
            3) Add an event listner on the submit of the form. Similar to the create new list event listener
            4) Make sure that there is an input in the input form and is not an empty space. 
            5) Make sure everything is related to the task. 
            6) Prevent Default. 
            7) Catch the value from the form. 
            8) Create a function that uses the value obtained from the form. Then create the entire list object using that function. Make sure you are working on the selectedList. And that you are clearing the input every single time.   
            9) Push the returned object back into the tasks. 

    1.17(e): 
        Now its the check and uncheck time. Meaning if we click on a task it should actually check and mark it as done, otherwise it should market it as unchecked. Also the check and uncheck should be saved to our local storage as well. That will be done by calling the save function. Have to save and render other on reload only will the user notice the changes. Also, we want to render our numbers that will tell us how many tasks are remaining this should be done by calling the renderTaskCount function and passing the selected task.
            1) We need to create an event listner on the entire container of the task.

1.18: 
    The final peace to the puzzle is clearing the selected tasks is actually the same concept as deleting a task container with a little twist. Make sure you are in the selected list and filter the tasks that are not completed on click.

1.19: 
    Finally we are going to have a default page. Will be shown only when there are no lists in the lists array. 
        */ 
const listContainer = document.querySelector('[data-lists]') // 1.2 
const newListForm = document.querySelector('[data-new-list-form]') // 1.12(a)
const newListInput = document.querySelector('[data-new-list-input]') //1.12(a)
const listDeleteButton = document.querySelector('[data-delete-list-button]') // 1.15 
const listDisplayContainer = document.querySelector('[data-list-display-container]'); // 1.16
const listTitleElement = document.querySelector('[data-list-title]'); // 1.16
const listCountElement = document.querySelector('[data-list-count]'); // 1.16
const tasksContainer = document.querySelector('[data-tasks]') // 1.16
const taskTemplate = document.getElementById('task-template') // 1.17(b)
const newTaskForm = document.querySelector('[data-new-task-form]'); //1.17(d)
const newTaskInput = document.querySelector('[data-new-task-input]'); //1.17(d)
const deleteCompleteTasksButton = document.querySelector('[data-delete-complete-task-button]'); //1.18
const noListsMessage = document.querySelector('[data-no-lists-message-container]'); //1.19


const LOCAL_STORAGE_LIST_KEY = "task.lists";  // 1.13(a)
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'; //1.14 (a)
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []; // 1.1 & 1.10  1.13 (b) 
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);  //1.14(a)


listDisplayContainer.addEventListener('click', () => { 
    closeMenu(); //1.0
})

tasksContainer.addEventListener('click', (e) => {  //1.17
    if(e.target.tagName.toLowerCase() === 'input') { 
        const selectedList = lists.find(list => list.id === selectedListId); 
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id); 
        selectedTask.complete = e.target.checked; 
        saveAndRender(); 
        renderTaskCount(selectedListId); 
    }
})

listContainer.addEventListener('click', e => { //1.14(c)
    if(e.target.tagName.toLowerCase() === 'li') { 
        selectedListId = e.target.dataset.listId; 
        saveAndRender();
    }
}) // 1.14(c)


deleteCompleteTasksButton.addEventListener('click', (e) => { 
    const selectedList = lists.find(list => list.id === selectedListId); 
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete); 
    saveAndRender()
})


listDeleteButton.addEventListener('click', e => { // 1.15
    lists = lists.filter(list => list.id !== selectedListId ); 
    selectedListId = "null"; 
    saveAndRender()
}) // 1.15


newListForm.addEventListener('submit', e => { // 1.12(b)
    e.preventDefault(); 
    const listName = newListInput.value; 
    if(listName == null || listName === '') return; 
    const list  = createList(listName);
    lists.push(list); 
    newListInput.value = null; 
    saveAndRender();
}); //1.12(b)


newTaskForm.addEventListener('submit', e => { // 1.17(d)
    e.preventDefault(); 
    const taskName = newTaskInput.value; 
    if(taskName == null || taskName === '') return; 
    const task  = createTask(taskName);
    newTaskInput.value = null; 
    const selectedList = lists.find(list => list.id === selectedListId); 
    selectedList.tasks.push(task); 
    saveAndRender();
}); //1.17(d)

function createTask (taskName) {  //1.15
    return {id: Date.now().toString(), name: taskName, complete: false}
} 

function saveAndRender () { // 1.08
    save(); 
    render();
}

function createList (listName) {  //1.12(b)
    return {id: Date.now().toString(), name: listName, tasks:[]}
}

function save() { 
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render ()  { //1.4
    noListMessageFunc()
    clearElement(listContainer); //1.5
    renderList(); 
    const selectedList = lists.find(list => list.id === selectedListId); 
    if(selectedListId == "null") { 
        listDisplayContainer.style.display = 'none';
    } else { 
       listDisplayContainer.style.display = ''; 
       listTitleElement.innerText = selectedList.name;
       renderTaskCount(selectedList); // 1.16(c)
       clearElement(tasksContainer); //1.17(a)
       renderTasks(selectedList) // 1.17(c)
    }
   
}

function renderTasks(selectedList) { // 1.16
    selectedList.tasks.forEach (task => { 
        const taskElement = document.importNode(taskTemplate.content, true); 
        const checkbox = taskElement.querySelector('input'); 
        const taskName = taskElement.querySelector('p');
        checkbox.id = task.id; 
        checkbox.checked = task.complete; 
        if(task.complete === true) { 
            taskName.className = "absolute peer-hover:w-full transition-all duration-300 ease-in-out ml-1 rounded-md text-gray-200 line-through"
        }
        taskName.textContent = task.name;
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount (selectedList) { // 1.16(c)
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length; 
    const taskString = incompleteTasksCount === 1? 'task' : 'tasks'; 
    listCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;
} // 1.16(c)

function renderList () { // 1.16
    lists.forEach( list => { //1.8 
        const listElement = document.createElement('li'); 
        listElement.className = "mb-4 p-1 rounded-md shadow-md bg-gray-200 hover:bg-black hover:text-white hover:cursor-pointer active:bg-blue-700 sm:w-8/12 truncate"; 
        listElement.dataset.listId  = list.id;
        listElement.innerHTML = list.name;  // 1.10(a)
        if(list.id === selectedListId) { // 1.14(b)
            listElement.classList.add("bg-yellow-500"); 
        }
        listContainer.appendChild(listElement);
    }) //1.8

}


function clearElement (element) {  //1.6 & 1.9 
    while(element.firstChild) { 
            element.removeChild(element.firstChild); 
        }
} // 1.6 & 1.9

render() // 1.2

function noListMessageFunc  () { 
    if(lists.length === 0) { 
        noListsMessage.style.display='';
    } else { 
        noListsMessage.style.display='none';
    }
}


