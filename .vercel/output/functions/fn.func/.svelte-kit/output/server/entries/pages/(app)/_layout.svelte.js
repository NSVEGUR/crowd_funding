import { c as create_ssr_component, a as subscribe, v as validate_component, b as add_attribute, e as escape, d as each, m as missing_component } from "../../../chunks/index3.js";
import { L as Logo } from "../../../chunks/logo.js";
import { P as Profile } from "../../../chunks/profile.js";
import { w as writable } from "../../../chunks/index2.js";
import "../../../chunks/utils.js";
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-5 h-5"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"}"></path></svg>`;
});
const Bars = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-6 h-6"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"}"></path></svg>`;
});
const Command = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"currentColor"}" viewBox="${"0 0 16 16"}" class="${"w-3 h-3"}"><path d="${"M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3zM6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5H6zm4 1v4H6V6h4zm1-1V3.5A1.5 1.5 0 1 1 12.5 5H11zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5V11zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11H5z"}"></path></svg>`;
});
const toggleNav = writable(false);
const toggleMenu = writable(false);
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_toggleMenu;
  let $$unsubscribe_toggleNav;
  $$unsubscribe_toggleMenu = subscribe(toggleMenu, (value) => value);
  $$unsubscribe_toggleNav = subscribe(toggleNav, (value) => value);
  let { session } = $$props;
  let { url } = $$props;
  if ($$props.session === void 0 && $$bindings.session && session !== void 0)
    $$bindings.session(session);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  $$unsubscribe_toggleMenu();
  $$unsubscribe_toggleNav();
  return `<header class="${"h-14 relative border-b-[1px] border-base bg-muted backdrop-blur-lg"}"><button class="${"lg:hidden absolute top-1/2 -translate-y-1/2 left-3 nav-btn text-accent"}" id="${"nav-btn"}">${validate_component(Bars, "BarsSVG").$$render($$result, {}, {}, {})}</button>
	<div class="${"absolute left-6 top-1/2 -translate-y-1/2 flex -lg:left-10"}"><div class="${"flex gap-2 items-center text-xl"}"><div class="${"w-6"}"><img class="${"h-full w-full"}"${add_attribute("src", Logo, 0)} alt="${"logo"}"></div>
			<h4 class="${"text-skin-base font-medium"}">Crowd Funding</h4></div></div>
	${url == "/" || url == "/personal" ? `<div class="${"-lg:hidden pl-2 flex items-center text-inverted absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[60%] border-[1px] border-base rounded-lg"}">${validate_component(Search, "SearchSVG").$$render($$result, {}, {}, {})}
			<input type="${"text"}" class="${"grow bg-transparent p-2 focus:outline-none"}" placeholder="${"Search"}">
			<div class="${"flex text-sm items-center pr-2 gap-1"}"><span class="${"border-[1px] border-base rounded w-6 h-6 flex items-center justify-center"}">${validate_component(Command, "Command").$$render($$result, {}, {}, {})}</span>
				<span class="${"border-[1px] border-base w-6 h-6 flex items-center justify-center rounded"}">K</span></div></div>` : ``}
	${session ? `<div class="${"absolute right-4 top-1/2 -translate-y-1/2 flex gap-4 items-center"}"><button class="${"w-8 h-8 rounded-full shadow-lg bg-light-muted"}" id="${"menu-btn"}"><img class="${"w-8"}"${add_attribute("src", Profile, 0)} alt="${"profile"}"></button></div>` : `<div class="${"absolute top-1/2 -translate-y-1/2 right-4"}"><a class="${"bg-accent text-skin-inverted p-[6px] px-3 rounded-md font-medium"}" href="${"/auth"}">Login</a></div>`}</header>

`;
});
const Squares = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-7 h-7"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"}"></path></svg>`;
});
const PlusCircle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-7 h-7"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>`;
});
const UserCircle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-7 h-7"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"}"></path></svg>`;
});
const Logout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-7 h-7"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"}"></path></svg>`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toggleNav, $$unsubscribe_toggleNav;
  $$unsubscribe_toggleNav = subscribe(toggleNav, (value) => $toggleNav = value);
  let { hyperlinks } = $$props;
  if ($$props.hyperlinks === void 0 && $$bindings.hyperlinks && hyperlinks !== void 0)
    $$bindings.hyperlinks(hyperlinks);
  $$unsubscribe_toggleNav();
  return `<section class="${"flex h-[calc(100vh-theme(spacing.12))"}">
	<nav class="${"h-screen border-r-[1px] border-base bg-muted -lg:fixed -lg:z-50 -lg:w-2/3 " + escape(
    $toggleNav ? "-lg:-translate-x-0" : "-lg:-translate-x-full",
    true
  ) + " transition-all duration-300 overflow-hidden"}" id="${"nav"}"><ul class="${"mt-5 p-3 flex flex-col items-start gap-3 w-full h-full text-accent"}">${each(hyperlinks, (link, index) => {
    return `${link.name === "Logout" ? `<li class="${"-lg:w-full"}"><form action="${"/logout"}" method="${"POST"}"><button type="${"submit"}" class="${"group w-full relative p-2 items-center flex justify-center -lg:justify-start gap-2 rounded-3xl bg-light-muted " + escape(link.active && "bg-accent text-skin-inverted", true) + " hover:bg-accent hover:text-dominant hyperlink hover:rounded-lg transition-all duration-300"}"><div>${validate_component(link.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>
								<span class="${"hidden group-hover:block fixed z-50 w-32 p-1 left-[70px] text-center rounded bg-accent text-skin-inverted before:content-[''] before:absolute before:border-[6px] before:border-transparent before:border-r-accent before:top-1/2 before:-translate-y-1/2 before:-left-3 animate-scale -lg:group-hover:hidden"}">${escape(link.name)}</span>
								<span class="${"lg:hidden"}">${escape(link.name)}</span>
							</button></form>
					</li>` : `<li class="${"-lg:w-full"}"><a class="${"group w-full relative p-2 items-center flex justify-center -lg:justify-start gap-2 rounded-3xl bg-light-muted " + escape(link.active && "bg-accent text-skin-inverted", true) + " hover:bg-accent hover:text-dominant hyperlink hover:rounded-lg transition-all duration-300"}"${add_attribute("href", link.href, 0)}><div>${validate_component(link.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>
							<span class="${"hidden group-hover:block fixed z-50 w-32 p-1 left-[70px] text-center rounded bg-accent text-skin-inverted before:content-[''] before:absolute before:border-[6px] before:border-transparent before:border-r-accent before:top-1/2 before:-translate-y-1/2 before:-left-3 animate-scale -lg:group-hover:hidden"}">${escape(link.name)}</span>
							<span class="${"lg:hidden"}">${escape(link.name)}</span></a>
					</li>`}`;
  })}</ul></nav>
	<section class="${"p-10 bg-muted h-screen w-full overflow-scroll -sm:p-3"}">${slots.default ? slots.default({}) : ``}</section></section>`;
});
const PageTransition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { duration } = $$props;
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  return `<div class="${"overflow-hidden"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { email } = $$props;
  if ($$props.email === void 0 && $$bindings.email && email !== void 0)
    $$bindings.email(email);
  return `<menu class="${"fixed bg-muted text-skin-base right-2 top-[52px] rounded-xl border-[1px] border-base shadow-xl p-3 z-20 before:absolute before:content-[''] before:right-[12px] before:bottom-full before:w-0 before:h-0 before:border-[10px] before:border-transparent before:border-b-base after:absolute after:content-[''] after:right-[13px] after:bottom-full after:w-0 after:h-0 after:border-[9px] after:border-transparent after:border-b-muted "}" id="${"menu"}"><div class="${"bg-dominant rounded-xl overflow-hidden"}"><div class="${"flex items-center gap-2 py-3 px-5"}"><div class="${"flex gap-4 items-center"}"><button class="${"w-8 h-8 rounded-full shadow-lg bg-light-muted"}"><img class="${"w-8"}"${add_attribute("src", Profile, 0)} alt="${"profile"}"></button></div>
			<ul class="${"text-xs"}"><li class="${"text-skin-muted"}">${escape(email.split("@")[0][0].toUpperCase() + email.split("@")[0].slice(1))}</li>
				<li>${escape(email)}</li></ul></div>
		<div class="${"border-b-[1px] border-base w-full"}"></div>
		<ul class="${"w-full"}"><li><a href="${"/start"}" class="${"p-4 block w-full h-full hover:no-underline hover:bg-light-muted"}">Start a campaign</a></li>
			<li><a href="${"/"}" class="${"p-4 block w-full h-full hover:no-underline hover:bg-light-muted"}">All campaigns</a></li>
			<li><a href="${"/personal"}" class="${"p-4 block w-full h-full hover:no-underline hover:bg-light-muted"}">My campaigns</a></li></ul></div>
	<form action="${"/logout"}" method="${"POST"}"><button class="${"block w-full h-full hover:no-underline text-center py-2"}" type="${"submit"}"><i class="${"fas fa-sign-out-alt mr-1"}"></i>Log out</button></form></menu>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toggleMenu, $$unsubscribe_toggleMenu;
  $$unsubscribe_toggleMenu = subscribe(toggleMenu, (value) => $toggleMenu = value);
  let { data } = $$props;
  const hyperlinks = [
    {
      name: "All Campaigns",
      icon: Squares,
      href: "/",
      active: data.url == "/"
    },
    {
      name: "Start Campaign",
      icon: PlusCircle,
      href: "/start",
      active: data.url.includes("/start")
    },
    {
      name: "My Campaigns",
      icon: UserCircle,
      href: "/personal",
      active: data.url.includes("/personal")
    },
    {
      name: "Logout",
      icon: Logout,
      href: "/",
      active: false
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_toggleMenu();
  return `${validate_component(Header, "Header").$$render($$result, { session: data.session, url: data.url }, {}, {})}
${validate_component(Nav, "Nav").$$render($$result, { hyperlinks }, {}, {
    default: () => {
      return `${data.session?.user.email && $toggleMenu ? `${validate_component(Menu, "Menu").$$render($$result, { email: data.session.user.email }, {}, {})}` : ``}
	${validate_component(PageTransition, "PageTransition").$$render($$result, { duration: 300 }, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`;
    }
  })}`;
});
export {
  Layout as default
};
