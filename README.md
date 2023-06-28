
# Reconciliation App

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

Lets start with (withoutReconciliation) project first;

