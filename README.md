
# Reconciliation App

This mini Project will help to understand how react work under the hood.
## What will we learn

- How reconcilition works 
- How state of the ui is changed with re-rendering the whole page again.
- Also we'll make a reconciler of our own not a complex one but a simple one to understand what goes under the hood when reconcilition happens.
[We'll build two same projects one with reconcilition and other without reconcilition ,so you can understand it fully]





# What is Reconciliation?


"The “reconciliation” algorithm in React is how the decision to re-render the component is made."

What makes react so popular is its Reconciliation
algorithm .In browser DOM (Document Object Model) manipulation is time consuming and expensive.

In reconcilition whole page does not get updated only parts which are changed get updated .This makes process fast and less expensive.

To understand Reconciliation fully we need we need to understand 2 things
- What is DOM(Document Object Model) 
- How websites used to render before reconcilition as a concept was introduced.


# What is DOM(Document Object Model)?

DOM in simple words is a TREE like structure in which  the logical structure of documents and the way a document is accessed and manipulated is defined.


![App Screenshot](https://www.w3schools.com/js/pic_htmltree.gif)



From the above Screenshot we can see there is a structure in which browser access the element and  while writing code you also have to maintain this hierarchy.




# How websites used to render before reconcilition as a concept was introduced?



