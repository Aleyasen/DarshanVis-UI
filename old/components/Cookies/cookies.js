// Cookie manager

export var Cookie = function(name, value, path, expires, domain) {
    this.Name = name;
    this.Value = value;
    this.Path = path;
    this.Expires = expires;
    this.Domain = domain;
};

Cookie.prototype.maxSize = 4000; // In KB

export Cookie.prototype.toString = function() {
  return this.Value;
};

// Wrapper class, for independent pages
export var PageCookie = function(page) {
  this.Cookie = Cookie;
  this.Cookie(page);
  this.Page = page;
};

PageCookie.prototype = Cookie;
PageCookie.prototype.constructor = PageCookie;

// Save cookie based on URL
export function savePageCookie(pc) {
  var pCookie = pc;
  document.cookie = "url=" + pCookie.Page + ";";
}
