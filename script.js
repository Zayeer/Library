window.onload = () => {
	const localStorageKeys = Object.keys(localStorage);
	localStorageKeys.forEach(element => {
		if(localStorageKeys.length === 0) {
			myLibrary = [];
		} else {
		let accessLocalStorage = JSON.parse(localStorage.getItem(element));
			myLibrary.push(accessLocalStorage);
			titleVal =accessLocalStorage["title"];
			authorVal = accessLocalStorage["author"];
			pagesVal = accessLocalStorage["pages"];
			createNewBook();
		}	
		});
}


const booksContainer = document.querySelector(".books-container");
const addABook = document.querySelector(".addABook");
const myForm = document.querySelector("#form");
const formContainer = document.querySelector(".form-container");
const emptyFields = document.querySelector("#submit>span");
const displayForm = () => {
	booksContainer.style.display = "none";
	formContainer.style.display = "flex";
	emptyFields.style.display = "none";
}

addABook.addEventListener("click", displayForm);

const closeForm = document.querySelector(".form-container>span");

const closeTheForm = () => {
	formContainer.style.display = "none";
	booksContainer.style.display = "grid";

}

closeForm.addEventListener("click", closeTheForm);

const checkBox = document.querySelector(".checkbox");
const tickMark = document.querySelector(".checkbox>span");

const checkedOrNot = () => {
	(tickMark.style.display == "") || (tickMark.style.display == "none") ? tickMark.style.display = "block" :
										tickMark.style.display = "none";
}

checkBox.addEventListener("click", checkedOrNot); 


//below Array stores books objects;

let myLibrary = [];

//book constructor 

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
	myLibrary.push(new Book(title, author, pages, isRead));
}

//-------------------------------------------------------------//

const title = document.querySelector("#title-input");
const author = document.querySelector("#author>.labeledTextInput");
const pages = document.querySelector("#pages>.pages");
const submit = document.querySelector("#submit>.submit");


const submitBook = () => { 
	if(Boolean(title.value) === false ||
	   Boolean(author.value) === false ||
	   Boolean(pages.value) === false) {	   	
		emptyFields.style.display = "inline";
		emptyFields.style.marginBottom = "5px";
	} else {
		titleVal = title.value;
		authorVal = author.value;
		pagesVal = pages.value;
		let isReadVal;
		closeTheForm();
		(tickMark.style.display === "block") ? isReadVal = "Read" : isReadVal = "Unread";
		//checks if book is already present in the library, and execution stops here if there is a book
		if(checkForBook(titleVal, authorVal)) {
			return;
		}
		myForm.reset();
		//below function call executes only when therez no book with the same title and author present
		addBookToLibrary(titleVal, authorVal, pagesVal, isReadVal);
		createNewBook();
		
		localStorage.setItem(titleVal.toString(), 
			JSON.stringify(myLibrary[myLibrary.length-1]));
	}
}

const checkForBook = (title, author) => {
	for(let i = 0; i<myLibrary.length; i++) {
				if(myLibrary[i]["title"] === title & myLibrary[i]["author"] === author) {
					emptyFields.style.display = "inline";
					emptyFields.innerText = "It's already on your shelf";
					emptyFields.style.fontSize = "1rem";
					emptyFields.style.marginBottom = "5px";
					return true;		
				}
		}

		return false;
}	


let createNewBook = () => {
	const book = document.createElement("div");
		book.className = "book";
		book.setAttribute("data-title", titleVal);
		booksContainer.appendChild(book);
	const deleteBook = document.createElement("span");
		deleteBook.className = "delete-book";
		deleteBook.setAttribute("title", "delete");
		book.appendChild(deleteBook);
		deleteBook.setAttribute("data-title", titleVal);
		deleteBook.innerHTML = "&#10006";
	const titleTag = document.createElement("div");
		titleTag.className ="title";
		book.appendChild(titleTag);
		titleTag.innerText = titleVal;
	const by = document.createElement("p");
		by.className = "by";
		book.appendChild(by);
		by.innerText = "by";
	const authorTag = document.createElement("div");
		authorTag.className = "author";
		book.appendChild(authorTag);
		authorTag.innerText = authorVal;
	const pagesTag = document.createElement("div");
		pagesTag.className = "pagesDisplay";
		book.appendChild(pagesTag);
		pagesTag.innerText = `${pagesVal} pages`;
	const isReadTag = document.createElement("div");
		isReadTag.className = "isRead";
		isReadTag.setAttribute("data-title", titleVal);
		book.appendChild(isReadTag);
		tickMark.style.display === "block" ? isReadTag.innerHTML = "Read <span>&#10004</span>" : isReadTag.innerHTML = "Unread";

		isReadTag.innerHTML === "Unread" ? isReadTag.style.color = "yellow":
										   isReadTag.style.color = "red";

		tickMark.style.display = "none";

		function isReadTagStyling() {
				if(isReadTag.style.color === "yellow") {
						isReadTag.style.color = "red";
						isReadTag.innerHTML = "Read <span>&#10004</span>";
						tickMark.style.display = "block";
						let accessLocalStorage = JSON.parse(localStorage.getItem(isReadTag.getAttribute("data-title")));
						accessLocalStorage.isRead = "Read";
						localStorage.removeItem(isReadTag.getAttribute("data-title"));
						localStorage.setItem(isReadTag.getAttribute("data-title"), JSON.stringify(accessLocalStorage));
				} else {
						isReadTag.style.color = "yellow";
						isReadTag.innerText = "Unread";
						tickMark.style.display = "none";
						let accessLocalStorage = JSON.parse(localStorage.getItem(isReadTag.getAttribute("data-title")));
						accessLocalStorage.isRead = "Unread";
						localStorage.removeItem(isReadTag.getAttribute("data-title"));
						localStorage.setItem(isReadTag.getAttribute("data-title"), JSON.stringify(accessLocalStorage));
				}
		}

		isReadTag.addEventListener("click", isReadTagStyling);
		
		//Remove book from local storage and library
	    function removeBook() {
	    	let attribute = deleteBook.getAttribute("data-title");

	    	attribute = attribute.toString();
			const localStorageKeys = Object.keys(localStorage);
	    	for(let val of localStorageKeys) {
	    		if(val === attribute) {
	    			event.path[1].style.display = "none";
					localStorage.removeItem(val);
					break;
	    		}
	    	}

	    	for(let i=0; i<myLibrary.length; i++) {
	    		for(let val in myLibrary[i]) {
	    			if(myLibrary[i][val]  === attribute) {
	    				myLibrary.splice(i, 1);
	    				return;
	    			}
	    		}
	    	}

	    }

	    deleteBook.addEventListener("click", removeBook);
}


submit.addEventListener("click", submitBook);
