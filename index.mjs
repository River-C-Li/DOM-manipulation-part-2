// Menu data structure
import "./styles.css";

const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

let body = document.querySelector("body");
const mainEI = document.querySelector("main");
mainEI.style.backgroundColor = "var(--main-bg)";
mainEI.classList.add("flex-ctr");
const h1 = document.createElement("h1");
h1.textContent = "About DOM manipulation";

body.appendChild(mainEI).appendChild(h1);

const topMenuEI = document.getElementById("top-menu");
topMenuEI.style.backgroundColor = "var(--top-menu-bg)";
topMenuEI.style.height = "100%";
topMenuEI.classList.add("flex-around");

let subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

menuLinks.forEach((menus) => {
  const topA = document.createElement("a");
  topA.textContent = `
      ${menus.text}
      `;
  topA.setAttribute("href", `${menus.href}`);
  topMenuEI.appendChild(topA);
});

let topMenuLinks = Array.from(document.querySelectorAll("a"));

// for (const a of topMenuLinks) {                 ///////////doe not work
//   //important loop
//   a.addEventListener(
//     "click",
//     (e) => {
//       if (e.target.tagName !== "a") {
//         e.preventDefault();
//         return;
//       }
//     },
//     false
//   );
// }

topMenuEI.addEventListener("click", (e) => {
  if (e.target.tagName !== "a") {
    e.preventDefault();
  }
  // e.preventDefault();
  // if (!topMenuLinks.includes(e.target)) return; ///REF
  const previousSelection = topMenuLinks.find((element) => {
    //REF CONTAINS !!!!!!!!!
    return element.classList.contains("active");
  });
  // Remove active class from all links
  topMenuLinks.forEach((link) => {
    link.classList.remove("active");
    if (previousSelection === e.target) {
      /////REF If current selection is similar to previous selection remove the active class
      e.target.classList.remove("active");
    } else {
      //  add the active class
      e.target.classList.add("active");
    }
  });

  for (let i = 0; i < menuLinks.length; i++) {
    if (e.target.text === "about") {
      ////!!!!strict equal
      subMenuEl.style.top = "0";
      mainEI.querySelector("h1").textContent = "About DOM Class";
      break;
    } else {
      if (!e.target.classList.contains("active")) {
        subMenuEl.style.top = 0;
      } else {
        subMenuEl.style.top = "100%";
        const selectedElement = menuLinks.find((element) => {
          return element.text === e.target.text;
        });
        // buildSubMenu(selectedElement.subLinks, subMenuEl);
        // console.log(selectedElement);
        //Undefined ????Caching the "link" object for passing its subLinks array .

        ///////////////////////////////////////////////////2. loop inner array, still problem???????????????????????????????
        // function buildSubMenu(subLinks, subMenuElement) {
        //   // 1. Clear the current content of subMenu element
        //   Array.from(subMenuElement.children).forEach((element) => {
        //     element.remove();
        //   });

        //   subLinks.forEach((element) => {
        //     const subA = document.createElement("a");
        //     subA.text = `
        //           ${element.text}
        //           `;
        //     subA.setAttribute("href", `${element.href}`);
        //     subMenuEl.appendChild(subA);
        //   });
        // }

        function buildSubMenu(subLinks) {
          //   // 1. Clear the current content of subMenu element
          Array.from(subMenuElement.children).forEach((element) => {
            element.remove();
          });
          const subMenuEl = document.getElementById("sub-menu");
          subMenuEl.innerHTML = "";
          for (const link of subLinks) {
            const a = document.createElement("a");
            a.href = link.href;
            a.textContent = link.text;
            subMenuEl.appendChild(a);
          }

          // break;
        }
      }
    }
  }
});

//ACTIOn
subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();

  const subMenuLinks = Array.from(subMenuEl.querySelectorAll("a"));

  if (!subMenuLinks.includes(e.target)) return;

  subMenuEl.style.top = 0;

  topMenuLinks.forEach((element) => {
    element.classList.remove("active");
  });

  // const targetText = e.target.text.split(" ");  //for first letter uppercase

  // const titleCaseText = targetText.map((element) => {
  //   return element[0].toUpperCase() + element.slice(1);
  // });

  // mainEI.querySelector("h1").textContent = titleCaseText.join(" ");
});
