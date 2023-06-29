
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

Now question is how we achieved that.

#### In without Reconciliation app your javascript code in index.html file inside script tag looks like:

<img width="388" alt="demo-Without" src="https://github.com/faisal004/Reconciliation/assets/88244542/ac64377e-c640-426d-bd2e-b50c8bb0ba98">

