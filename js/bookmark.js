const bookmarks = document.querySelectorAll("#bookmark");
const bookmarkContent = document.querySelector(".bookmark-content");
const deleteBookmark = document.querySelector("#delete");
const BOOKMARK_KEY = "bookmark_key";

const savedBookmarks = localStorage.getItem(BOOKMARK_KEY);
let bookmarkObjs = [];

function saveBookmark() {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarkObjs));
}

// delete 함수
[].forEach.call(document.querySelectorAll("#delete"), function deleteBookmarkHandler(el) {
  el.addEventListener("click", function (event) {
    const deleteIndex = getElementIndex(bookmarks, el.parentNode);
    bookmarkObjs = bookmarkObjs.filter((item) => item.id !== deleteIndex);
    bookmarks[deleteIndex].querySelector("#favicon").style.backgroundImage = "none";
    bookmarks[deleteIndex].querySelector("span").textContent = "";
    bookmarks[deleteIndex].querySelector("#favicon").classList.add("hidden");
    bookmarks[deleteIndex].querySelector("span").classList.add("hidden");
    bookmarks[deleteIndex].querySelector("#plus").classList.remove("hidden");
    bookmarks[deleteIndex].querySelector("#delete").classList.add("hidden");
    saveBookmark();
  });
});

// index 찾기위한 기초 함수
function getParentNode(element) {
  return element.parentNode;
}
function getElementIndex(element, range) {
  getParentNode(element);

  if (!!range) return [].indexOf.call(element, range);
  return [].indexOf.call(element.parentNode.children, element);
}

// inputHandler 에 index 값 받아오기
[].forEach.call(document.querySelectorAll("#plus"), function inputHandler(el) {
  el.addEventListener("click", function (event) {
    event.preventDefault();
    const bookmarkIndex = getElementIndex(document.querySelectorAll("#bookmark"), el.parentNode);
    console.log();
    if (Object.keys(bookmarkObjs).indexOf(bookmarkIndex) === -1) {
      const bookmarkName = prompt("Write your bookmark name", "name");
      const bookmarkLink = prompt("Write your website url (Please put https:// in front of it.)", "https://");
      const newBookmarkObj = {
        id: bookmarkIndex,
        name: bookmarkName,
        link: bookmarkLink,
      };
      bookmarkObjs.push(newBookmarkObj);
      bookmarkObjs = removeDuplicates(bookmarkObjs, "id");
      paintBookmark(bookmarkObjs);
      saveBookmark();
    }
  });
});

function paintBookmark(bookmarkObjs) {
  for (const i in bookmarkObjs) {
    const bookmarkLink = bookmarkObjs[i].link;
    const bookmarkName = bookmarkObjs[i].name;
    bookmarks[bookmarkObjs[i].id].querySelector("#favicon").classList.remove("hidden");
    bookmarks[bookmarkObjs[i].id].querySelector("span").classList.remove("hidden");
    bookmarks[bookmarkObjs[i].id].querySelector("#plus").classList.add("hidden");
    bookmarks[bookmarkObjs[i].id].querySelector("#delete").classList.remove("hidden");

    bookmarks[bookmarkObjs[i].id].querySelector(
      "#favicon"
    ).style.backgroundImage = `url(https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmarkLink})`;
    bookmarks[bookmarkObjs[i].id].querySelector("span").textContent = bookmarkName;
    bookmarks[bookmarkObjs[i].id].querySelector("#favicon").setAttribute("OnClick", `window.open('${bookmarkLink}', "_blank")`);
    bookmarks[bookmarkObjs[i].id].querySelector("span").setAttribute("OnClick", `window.open('${bookmarkLink}', "_blank")`);
  }
}

// localstorage 불러 오기 함수
if (savedBookmarks !== null) {
  const parsedBookmarks = JSON.parse(savedBookmarks);
  bookmarkObjs = parsedBookmarks;
  paintBookmark(bookmarkObjs);
}

// 중복 제거 함수
function removeDuplicates(originalArray, prop) {
  let newArray = [];
  let lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
