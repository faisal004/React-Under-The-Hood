
# Reconciliation - React-Under-The-Hood

This mini Project will help to understand how react work under the hood.
## What will we learn

- How reconcilition works 
- How state of the ui is changed with re-rendering the whole page again.
- Also we'll make a reconciler of our own not a complex one but a simple one to understand what goes under the hood when reconcilition happens.
[We'll build two same projects one with reconcilition and other without reconcilition ,so you can understand it fully]





## What is Reconciliation?


"The “reconciliation” algorithm in React is how the decision to re-render the component is made."

What makes react so popular is its Reconciliation
algorithm .In browser DOM (Document Object Model) manipulation is time consuming and expensive.

In reconcilition whole page does not get updated only parts which are changed get updated .This makes process fast and less expensive.

To understand Reconciliation fully we need we need to understand 2 things
- What is DOM(Document Object Model) 
- How websites used to render before reconcilition as a concept was introduced.


## What is DOM(Document Object Model)?

DOM in simple words is a TREE like structure in which  the logical structure of documents and the way a document is accessed and manipulated is defined.


![App Screenshot](https://www.w3schools.com/js/pic_htmltree.gif)



From the above Screenshot we can see there is a structure in which browser access the element and  while writing code you also have to maintain this hierarchy.




## How websites used to render before reconcilition as a concept was introduced?

Before reconcilition as a concept was introduced website used to make changes directly the DOM content.

Means there was only main DOM and when even a minor changes were made whole DOM was re-rendered.

However, this approach had some drawbacks. As websites became more complex and dynamic, directly manipulating the DOM  became inefficient and error-prone. For example, making multiple changes to the DOM in rapid succession could lead to performance issues, and keeping track of all the changes could be challenging.

So to tackle with this issue virtual DOM and Reconciliation was introduced.


## What is virtual DOM?

To tackle this issue of re-rendering and updating main DOM ,concept of virtual DOM was introduced.


In this approach, a virtual representation of the DOM is created and stored in memory. This virtual DOM is a lightweight copy of the actual DOM, maintained by the framework or library being used (such as React).

When changes occur in the application, instead of directly updating the actual DOM, the changes are made to the virtual DOM.

After the changes are made to the virtual DOM, a process called "Diffing" takes place. The virtual DOM is compared to the previous version of the virtual DOM or the actual DOM to determine the differences or changes that need to be applied.

Once the differences are identified, only the specific parts of the actual DOM that need to be updated are modified, rather than re-rendering the entire page. This targeted update reduces the computational cost and improves performance.

![App Screenshot](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9FgYX4PGX2-0JieZrWf3YA.jpeg)

#### Now theory Part over lets jump into the project and understand it in a practical way



## Run Locally

Clone the project

```bash
  git clone https://github.com/faisal004/Reconciliation.git
```

Go to the project directory if want to see with Reconciliation or without Reconciliation

```bash
  cd withReconciliation
```

```bash
  cd withoutReconciliation
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon todoServer.js
```




### After setting up the project locally

Lets start with (withoutReconciliation) project first:
if you are running the project locally and adding todos ,now when you open chrome dev tool and look at the element area.First of all turn on paint flashing tool in chrome to do so .

![App Screenshot](https://i.stack.imgur.com/p1DRt.png)


Then tickmark paintflashing:

![App Screenshot](https://i.stack.imgur.com/B5BxN.png)

And now when you look at element tab in dev tool it will show whole table is re-rendered when even one item is added:


https://github.com/faisal004/Reconciliation/assets/88244542/84abaeda-8f59-40d3-9e8b-447e2878b572


Now first of all let us understand what problem we are trying to resolve using Reconciliation.

https://github.com/faisal004/Reconciliation/assets/88244542/cb1d9973-73f5-4961-8b83-ff01745bd309



Now we can see that without reconcilition when we are adding todo to the list whole table is re-rendered but when Reconciliation is applied only the last row get updated and every thing remain the same.

Now question is how we achieved that?

### In without Reconciliation app your javascript code in index.html file inside script tag looks like:
```javascript
   function postData() {
      const title = document.getElementById('titleInput').value;
      const description = document.getElementById('descriptionInput').value;
      const data = {
        title: title,
        description: description
      };
      fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          fetchData();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function createRow(todo) {
      const row = document.createElement("tr");
      const idCell = document.createElement("td");
      idCell.innerHTML = todo.id;
      const titleCell = document.createElement("td");
      titleCell.innerHTML = todo.title;
      titleCell.className = "titleCell";
      const descriptionCell = document.createElement("td");
      descriptionCell.innerHTML = todo.description;
      descriptionCell.className = "descriptionCell";
      const deleteButtonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => deleteTodo(todo.id);
      deleteButton.className = "delete-button";
      deleteButtonCell.appendChild(deleteButton);
      const updateButtonCell = document.createElement("td");
      const updateButton = document.createElement("button");
      updateButton.innerHTML = "Update";
      updateButton.onclick = () => updateTodo(todo.id);
      updateButton.className = "update-button";
      updateButtonCell.appendChild(updateButton);
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(descriptionCell);
      row.appendChild(deleteButtonCell);
      row.appendChild(updateButtonCell);
      return row;
    }

    function fetchData() {
      fetch('http://localhost:3000/todos', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var parentElement = document.getElementById("mainarea");
          parentElement.innerHTML = '';
          for (var i = data.length - 1; i >= 0; i--) {
            const row = createRow(data[i]);
            parentElement.appendChild(row);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function updateTodo(id) {
      var updatedTitle = prompt("Update Title");
      var updatedDescription = prompt("Update Description");
      if (updatedTitle && updatedDescription) {
        var data = {
          title: updatedTitle,
          description: updatedDescription
        };
        fetch('http://localhost:3000/todos/' + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
            fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }

    function deleteTodo(id) {
      fetch('http://localhost:3000/todos/' + id, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          fetchData();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    fetchData();


```



This function ###fetchData() fetch todos from the backend everytime new todo is added it does not check anything it simply clear all the data inside html and re-renders the whole list again ,which is an inefficient method .To deal with this reconcilition was introduced.

### In with Reconciliation app your javascript code in index.html file inside script tag looks like:




```javascript
function updateTodo(id) {
      var updatedTitle = prompt("Update Title");
      var updatedDescription = prompt("Update Description");
      if (updatedTitle && updatedDescription) {
        var data = {
          title: updatedTitle,
          description: updatedDescription
        };
        fetch('http://localhost:3000/todos/' + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
            fetchData();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }

    function postData() {
      const title = document.getElementById('titleInput').value;
      const description = document.getElementById('descriptionInput').value;
      const data = {
        title: title,
        description: description
      };
      fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          fetchData();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function fetchData() {
      fetch('http://localhost:3000/todos', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var parentElement = document.getElementById("mainarea");
          var existingRows = Array.from(parentElement.getElementsByTagName("tr"));
          var updatedIds = [];
          for (var i = data.length - 1; i >= 0; i--) {
            var todo = data[i];
            var existingRow = existingRows.find(row => row.getAttribute("data-id") === todo.id.toString());
            if (existingRow) {
              updatedIds.push(todo.id);
              updateRow(existingRow, todo);
              existingRows = existingRows.filter(row => row !== existingRow);
            } else {
              var newRow = createRow(todo);
              parentElement.appendChild(newRow);
            }
          }
          existingRows.forEach(row => {
            var rowId = row.getAttribute("data-id");
            if (!updatedIds.includes(parseInt(rowId))) {
              row.remove();
            }
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    function createRow(todo) {
      var row = document.createElement("tr");
      row.setAttribute("data-id", todo.id);
      var idCell = document.createElement("td");
      idCell.innerHTML = todo.id;
      var titleCell = document.createElement("td");
      titleCell.innerHTML = todo.title;
      titleCell.setAttribute("class", "titleCell");
      var descriptionCell = document.createElement("td");
      descriptionCell.innerHTML = todo.description;
      descriptionCell.setAttribute("class", "descriptionCell");
      var deleteButtonCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.setAttribute("onclick", "deleteTodo(" + todo.id + ")");
      deleteButton.setAttribute("class", "delete-button");
      deleteButtonCell.appendChild(deleteButton);
      var updateButtonCell = document.createElement("td");
      var updateButton = document.createElement("button");
      updateButton.innerHTML = "Update";
      updateButton.setAttribute("onclick", "updateTodo(" + todo.id + ")");
      updateButton.setAttribute("class", "update-button");
      updateButtonCell.appendChild(updateButton);
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(descriptionCell);
      row.appendChild(deleteButtonCell);
      row.appendChild(updateButtonCell);
      return row;
    }

    function updateRow(row, todo) {
      var cells = row.getElementsByTagName("td");
      cells[0].innerHTML = todo.id;
      cells[1].innerHTML = todo.title;
      cells[2].innerHTML = todo.description;
    }

    function deleteTodo(id) {
      fetch('http://localhost:3000/todos/' + id, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          fetchData();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    fetchData();
```



Now lets breakdown what we are doing here:
In fetchData() function this is of our main focus:

it finds the parent element in the HTML document with the id "mainarea" using getElementById(). This is the element where the list of todos will be displayed.

The existing rows in the parent element are retrieved and converted into an array using Array.from(). This allows for easier manipulation and tracking of the existing rows.

A new array called updatedIds is initialized to keep track of the todo IDs that have been updated or already existed in the UI.

The function iterates over the todos received in the data array, starting from the last todo and moving backwards using a for loop.

Inside the loop, it checks if there is an existing row in the UI for the current todo by using the find() method on the existingRows array. It compares the data-id attribute of each row with the current todo's ID. If a matching row is found, it means the todo already exists in the UI.

If an existing row is found, it is added to the updatedIds array, and the updateRow() function is called to update the contents of the row with the current todo's data. The existingRows array is then updated to exclude the row that has been updated.




If no existing row is found, it means the current todo is new and does not exist in the UI. In this case, the createRow() function is called to create a new row with the todo's data, and it is appended to the parent element.

After iterating over all the todos, the code iterates over the remaining existingRows that were not updated. For each row, it retrieves the data-id attribute and checks if it is not present in the updatedIds array. If the ID is not in updatedIds, it means the todo was deleted or no longer exists in the data received. In such cases, the row is removed from the UI.


### If you are having difficulty understanding what am I doing in fetchTodod() try understand this program below ,it simulate the same thing but in simpler level.

```javascript
function findDiff(arr1, arr2) {
  let updated = 0, added = 0, deleted = 0;
  for (let i = 0; i < arr2.length; i++) {
    let item = arr2[i];
    let found = false;
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j] === arr2[i]) {
        found = true;
      }
    }
    if (found) {
      updated = updated + 1;
    } else {
      added = added + 1;
    }
  }

  for (var i = 0; i < arr1.length; i++) {
    let found = false;
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        found = true;
      }
    }
    if (!found) {
      deleted++;
    }
  }

  return {
    updated: updated,
    added: added,
    deleted: deleted
  }
}

let diff = findDiff([1, 2, 3], [1,3,4,5]);
console.log(diff);

```


## Feedback

If you have any feedback, please reach out to me at faisalhusain1320@gmail.com

