var Rho =
  Rho ||
  (function (P) {
    var X = "rhoapi.js";
    var V = "__rhoID";
    var ak = "__rhoClass";
    var F = "__rhoCallback";
    var A = "/system/js_api_entrypoint";
    var v = "";
    var u = "0";
    var ae = {
      isFunction: function (al) {
        return "function" === typeof al;
      },
      isPlainObject: function (al) {
        return al && "object" === typeof al;
      },
      isArray: function (al) {
        return al && "Array" == al.constructor.name;
      },
      extend: function () {
        var al,
          ar,
          am,
          an,
          av,
          at,
          aq = arguments[0] || {},
          ap = 1,
          ao = arguments.length,
          au = false;
        if (typeof aq === "boolean") {
          au = aq;
          aq = arguments[ap] || {};
          ap++;
        }
        if (typeof aq !== "object" && !ae.isFunction(aq)) {
          aq = {};
        }
        if (ap === ao) {
          aq = this;
          ap--;
        }
        for (; ap < ao; ap++) {
          if ((av = arguments[ap]) != null) {
            for (an in av) {
              al = aq[an];
              am = av[an];
              if (aq === am) {
                continue;
              }
              if (au && am && (ae.isPlainObject(am) || (ar = ae.isArray(am)))) {
                if (ar) {
                  ar = false;
                  at = al && ae.isArray(al) ? al : [];
                } else {
                  at = al && ae.isPlainObject(al) ? al : {};
                }
                aq[an] = ae.extend(au, at, am);
              } else {
                if (am !== undefined) {
                  aq[an] = am;
                }
              }
            }
          }
        }
        return aq;
      },
      ajax: function (ap) {
        if (!ap) {
          return;
        }
        function an() {
          if (typeof XMLHttpRequest !== "undefined") {
            return new XMLHttpRequest();
          } else {
            var at = [
              "MSXML2.XmlHttp.5.0",
              "MSXML2.XmlHttp.4.0",
              "MSXML2.XmlHttp.3.0",
              "MSXML2.XmlHttp.2.0",
              "Microsoft.XmlHttp",
            ];
            for (var av = 0, ar = at.length; av < ar; av++) {
              try {
                return new ActiveXObject(at[av]);
              } catch (au) {}
            }
          }
          return null;
        }
        var aq = an();
        function al(ar) {
          return function () {
            if (ar.readyState < 4) {
              return;
            }
            if (ar.status !== 200 && ar.status !== 0) {
              (ap.error || function () {})(ar, "error", ar.statusText);
              return;
            }
            if (ar.readyState === 4) {
              var au = null;
              try {
                au = JSON.parse(ar.responseText);
              } catch (at) {}
              (ap.success || function () {})(au, "success", ar);
            }
          };
        }
        if (ap.async === true) {
          aq.onreadystatechange = al(aq);
        }
        aq.open(ap.type || "get", ap.url || "", ap.async === true);
        var ao = ap.headers || {};
        for (var am in ao) {
          if (!ao.hasOwnProperty(am)) {
            continue;
          }
          aq.setRequestHeader(am, ao[am]);
        }
        aq.send(ap.data);
        if (ap.async !== true) {
          al(aq)();
        }
      },
      each: function (am, an) {
        if (this.isArray(am)) {
          am.forEach(function (ap, ao) {
            an(ao, ap);
          });
        } else {
          for (var al in am) {
            if (am.hasOwnProperty(al)) {
              an(al, am[al]);
            }
          }
        }
      },
    };
    var L = 0;
    var x = {};
    function aa() {
      return window.__rhoJsVmID || null;
    }
    function s() {}
    function b(al) {
      if ("undefined" == typeof al || !al) {
        al = V;
      }
      return al + "#" + L++;
    }
    function E(al) {
      if (al && "string" == typeof al) {
        return al.toLowerCase() == "true";
      }
      return false;
    }
    function h(ao, am, an) {
      if ("string" == typeof ao) {
        return ao;
      }
      if ("function" != typeof ao) {
        ao = s;
      }
      if ("undefined" == typeof an || !an) {
        an = b();
      }
      var al = {
        id: an,
        callback: ao,
        isPersistent: "undefined" != typeof am && am,
      };
      x[an] = al;
      return v + an;
    }
    function Q(al) {
      for (var am in al) {
        if (!al.hasOwnProperty(am)) {
          continue;
        }
        if ("object" == typeof al[am]) {
          al[am] = r(al[am]);
        }
      }
      return al;
    }
    function r(al) {
      if (al != null && "object" == typeof al) {
        if (al[V] && al[ak]) {
          return M(al[ak], al[V]);
        } else {
          return Q(al);
        }
      }
      return al;
    }
    function k(al) {
      if ("undefined" == typeof al) {
        throw "Invalid API JSON response";
      }
      if (null == al || "object" != typeof al) {
        return al;
      }
      var am = ae.extend(al instanceof Array ? [] : {}, al);
      return r(am);
    }
    function e(an) {
      var am = {};
      if ("string" == typeof an) {
        an = an.split(/[\s\,]/);
      }
      if (an instanceof Array) {
        for (var al = 0; al < an.length; al++) {
          if (0 < an[al].length) {
            am[an[al]] = null;
          }
        }
      } else {
        if (an instanceof Object) {
          am = an;
        }
      }
      return am;
    }
    function T(ao) {
      var an = [];
      if ("string" == typeof ao) {
        ao = ao.split(/[\s\,]/);
      }
      if (ao instanceof Array) {
        for (var am = 0; am < ao.length; am++) {
          if (0 < ao[am].length) {
            an.push(ao[am]);
          }
        }
      } else {
        if (ao instanceof Object) {
          for (var al in ao) {
            if (ao.hasOwnProperty(al) && 0 < al.length) {
              an.push(al);
            }
          }
        }
      }
      return an;
    }
    var ag = 0;
    function o(al, am) {
      if ("function" != typeof am) {
        return am;
      }
      return F + ":" + h(am, true);
    }
    function N(ao) {
      var ap = null;
      if ("number" == typeof ao.valueCallbackIndex) {
        if (ao.valueCallbackIndex < ao.args.length - 1) {
          throw "Generated API method error: wrong position for value callback argument!";
        }
        if (ao.valueCallbackIndex == ao.args.length - 1) {
          ap = ao.args.pop();
        }
        if (ap && "function" != typeof ap) {
          throw "Value callback should be a function!";
        }
      }
      var at = null;
      var an = null;
      if ("number" == typeof ao.persistentCallbackIndex) {
        if (ao.persistentCallbackIndex < ao.args.length - 2) {
          throw "Generated API method error: wrong position for persistent callback argument!";
        }
        if (ao.persistentCallbackIndex == ao.args.length - 2) {
          an = ao.args.pop();
          at = ao.args.pop();
        } else {
          if (ao.persistentCallbackIndex == ao.args.length - 1) {
            at = ao.args.pop();
          }
        }
        if (at && "function" != typeof at) {
          throw "Persistent callback should be a function!";
        }
        if (an && "string" != typeof an) {
          throw "Persistent callback optional parameters should be a string!";
        }
        var an = an || null;
        if (at) {
          at = h(at, true);
        }
      }
      var am = { method: ao.method, params: ao.args };
      am[ak] = ao.module;
      am[V] = ao.instanceId || null;
      am.jsonrpc = "2.0";
      am.id = ag++;
      if (at) {
        am[F] = { id: at, vmID: aa(), optParams: an };
      }
      var aq = JSON.stringify(am, o);
      var au = null;
      function ar(av) {
        au = k(av);
        if (ap) {
          ap(au);
        }
      }
      function al(av) {
        throw av.message;
      }
      Rho.platform.nativeApiCall(aq, null != ap, function (av) {
        if (av.error) {
          al(av.error);
        } else {
          ar(av.result);
        }
      });
      return null != ap ? null : au;
    }
    function af(al) {
      return function (am) {
        am.args = Array.prototype.slice.call(am.args);
        if ("getProperties" == am.method && 0 < am.args.length) {
          am.args[0] = T(am.args[0]);
        }
        am.module = al;
        am.method = am.method;
        return N(am);
      };
    }
    function Y(al, ap, ao) {
      var aq = ap;
      var at = al;
      var an = false;
      if ("function" == typeof aq) {
        if ("function" == typeof at && !ao) {
          throw "Namespace definition conflict!";
        }
        an = true;
        aq = al;
        at = ap;
      }
      for (var ar in aq) {
        if (!aq.hasOwnProperty(ar)) {
          continue;
        }
        if (at.hasOwnProperty(ar) && !ao) {
          continue;
        }
        if ("prototype" == ar) {
          if (an) {
            continue;
          }
          if ("object" != typeof at[ar]) {
            at[ar] = {};
          }
          for (var am in aq[ar]) {
            if (!aq[ar].hasOwnProperty(am)) {
              continue;
            }
            at[ar][am] = aq[ar][am];
          }
          continue;
        }
        at[ar] = aq[ar];
      }
      return at;
    }
    function Z(ar, aq, al) {
      aq = aq || {};
      var at = window;
      var an = ar.split(/[\:\.]/);
      var au = "";
      for (var ao = 0; ao < an.length; ao++) {
        var am = an[ao];
        au = au + (ao == 0 ? "" : ".") + am;
        var ap = at[am];
        if (!(ap instanceof Object || "undefined" == typeof ap)) {
          throw (
            "Namespace " + au + " is already defined and it isn't an object!"
          );
        }
        if (ao == an.length - 1) {
          if (at[am]) {
            at[am] = Y(at[am], aq, al);
          } else {
            at[am] = aq;
          }
        }
        at[am] = at[am] || {};
        at = at[am];
      }
      return at;
    }
    var O = { ffHackKeywords: false, ffHackMethod: false, js185: false };
    (function y() {
      O.ffHackKeywords = (function am() {
        var ap = {};
        var ao = false;
        var ar = false;
        try {
          ap = {
            get propGet() {
              ao = true;
              return ao;
            },
            set propSet(at) {
              ar = at;
            },
          };
          ap.propSet = ap.propGet;
        } catch (aq) {}
        return ao && ar;
      })();
      O.ffHackMethod = (function an() {
        var ap = {};
        var ao = false;
        var ar = false;
        try {
          ap.__defineGetter__("propGet", function () {
            ao = true;
            return ao;
          });
          ap.__defineSetter__("propSet", function (at) {
            ar = at;
          });
          ap.propSet = ap.propGet;
        } catch (aq) {}
        return ao && ar;
      })();
      O.js185 = (function al() {
        var ap = {};
        var ao = false;
        var ar = false;
        try {
          Object.defineProperty(ap, "propGet", {
            get: function () {
              ao = true;
              return ao;
            },
          });
          Object.defineProperty(ap, "propSet", {
            set: function (at) {
              ar = at;
            },
          });
          ap.propSet = ap.propGet;
        } catch (aq) {}
        return ao && ar;
      })();
    })();
    var m = function (ao, aq, al, ap) {
      var an = aq.split(":")[0];
      function am(ar, ax) {
        var aw = ax.split(":");
        var av = aw[0];
        var au = aw[1];
        var at = aw[2];
        if ("get" == ar && au) {
          return au;
        }
        if ("set" == ar && at) {
          return at;
        }
        return ar + av.charAt(0).toUpperCase() + av.slice(1);
      }

      if (null != ap && "function" == typeof ap) {
        ao[am("set", aq)] = ap;
      }
    };
    var a = m;
    if (O.js185) {
      a = function (ao, aq, al, ap) {
        var an = aq.split(":")[0];
        var am = { configurable: true, enumerable: false };
        if (null != al && "function" == typeof al) {
          am.get = al;
        }
        if (null != ap && "function" == typeof ap) {
          am.set = ap;
        }
        Object.defineProperty(ao, an, am);
      };
    } else {
      if (O.ffHackMethod) {
        a = function (an, ap, al, ao) {
          var am = ap.split(":")[0];
          an.__defineGetter__(am, al);
          an.__defineSetter__(am, ao);
        };
      } else {
      }
    }
    function l(ap, ao, am, al, ar) {
      var aq = "w" == am;
      var au = ao.split(":");
      ao = au[0];
      var an = ao;
      var at = ao + "=";
      if (2 < au.length) {
        at = au[2];
      }
      if (1 < au.length) {
        an = au[1];
      }
      return function () {
        try {
          if ("function" == typeof ar) {
            return ar.apply(this, arguments);
          }
        } catch (av) {
          throw "Custom accessor function exception: " + av;
        }
        return ap({
          instanceId: "function" == typeof al ? al.apply(this, []) : u,
          args: arguments,
          method: aq ? at : an,
          valueCallbackIndex: aq ? 1 : 0,
        });
      };
    }
    var t = [];
    function q(an, au, ap, al) {
      if (!(au instanceof Array)) {
        throw "Property definitions list should be Array instance";
      }
      for (var ao = 0; ao < au.length; ao++) {
        var av = au[ao];
        var ar = av.propAccess;
        var at =
          0 <= ar.indexOf("r")
            ? l(ap, av.propName, "r", al, av.customGet)
            : null;
        var am =
          0 <= ar.indexOf("w")
            ? l(ap, av.propName, "w", al, av.customSet)
            : null;
        try {
          a(an, av.propName, at, am);
        } catch (aq) {
          t.push(name);
        }
        m(an, av.propName, at, am);
      }
    }
    function C(ap, an, ao) {
      if (!(an instanceof Array)) {
        throw "Property definitions list should be Array instance";
      }
      if (a != m || true == ao) {
        for (var am = 0; am < an.length; am++) {
          var aq = an[am];
          try {
            a(ap, aq.propName, aq.propGetter, aq.propSetter);
          } catch (al) {
            t.push(name);
          }
        }
      }
    }
    function d(ap, am, ao, al, an) {
      return function () {
        return al({
          instanceId: "function" == typeof an ? an.apply(this, []) : u,
          args: arguments,
          method: ap,
          persistentCallbackIndex: am,
          valueCallbackIndex: ao,
        });
      };
    }
    function ah(ap, ar, al, ao) {
      if (!(ar instanceof Array)) {
        throw "Property definitions list should be Array instance";
      }
      for (var an = 0; an < ar.length; an++) {
        var aq = ar[an];
        try {
          ap[aq.methodName] = d(
            aq.nativeName,
            aq.persistentCallbackIndex,
            aq.valueCallbackIndex,
            al,
            ao
          );
        } catch (am) {
          t.push(aq.methodName);
        }
      }
    }
    function j(an, am, al) {
      if (!am) {
        throw "No parent namespace for alias!";
      }
      if (am[al]) {
        throw "Alias definition conflict!";
      }
      am[al] = an;
    }
    function M(am, an) {
      var al = {};
      al[ak] = am;
      al[V] = an;
      return new (Z(am))(al);
    }
    function w(ao, an, al) {
      var ap = document.createElement(an);
      for (var am in al) {
        if (!al.hasOwnProperty(am)) {
          continue;
        }
        ap.setAttribute(am, al[am]);
      }
      ao.appendChild(ap);
    }
    function D(al) {
      w(document.getElementsByTagName("head")[0], "link", {
        rel: "stylesheet",
        href: al,
      });
    }
    function i(al) {
      w(document.getElementsByTagName("head")[0], "script", {
        type: "text/javascript",
        src: al,
      });
    }
    function c(ao) {
      var ap = null;
      var al = document.getElementsByTagName("script");
      for (var an = 0; an < al.length; an++) {
        var am = (al[an].getAttribute("src") || "").replace(/\?.*$/gi, "");
        if (am.indexOf(ao, am.length - ao.length) !== -1) {
          ap = al[an];
          break;
        }
      }
      return ap;
    }
    var K = c(X);
    function ai(al) {
      if (null == K || null == al || !al) {
        return;
      }
      var am = K.getAttribute("src");
      i(am.replace(X, al + ".js"));
    }
    function H(al) {
      if (null == al) {
        return;
      }
      var am = [];
      if ("object" == typeof al && "Array" == al.constructor.name) {
        am = al;
      }
      if ("string" == typeof al) {
        am = al.trim().split(/[,\s]+/);
      }
      for (var ao = 0; ao < am.length; ao++) {
        var an = am[ao].trim();
        if (0 < an.length) {
          an = 0 == an.indexOf("Rho.") ? an : "rho." + an;
          ai(an);
        }
      }
    }
    if (null != K) {
      H(K.getAttribute("data-api-modules"));
    }
    function p(aq, am) {
      var an = decodeURIComponent(aq);
      var ap = x[an];
      if ("object" == typeof ap && ap) {
        if ("function" == typeof ap.callback) {
          var al = null;
          var ao = null;
          if (am) {
            ao = am.error;
            if (!ao) {
              al = k(am.result);
            }
          }
          ap.callback(al, ao);
        }
        if (!ap.isPersistent) {
          delete x[an];
        }
      }
    }
    var ad = "RHO_AJAX-->12345<--PORT_NUMBER";
    var g = "http://127.0.0.1";
    var B = null;
    function J() {
      if (B) {
        return B;
      }
      var am = window[Rho.util.flag.API_AJAX_URL];
      if (am) {
        return (B = am);
      }
      if (0 != window.location.protocol.indexOf("file")) {
        return (B = A);
      }
      var an = ad.replace(/[\-<>A-Z_]*/g, "");
      var al = Number(an);
      if (0 < an.length && !isNaN(al)) {
        return (B = g.replace(/\/$/, "") + ":" + al + A);
      }
      throw "Unknown API AJAX URL for application loaded with file:// protocol";
    }
    function W(an, am, al) {
      ae.ajax({
        async: am,
        type: "post",
        url: J(),
        data: an,
        dataType: "json",
        headers: { Accept: "text/plain" },
        success: function (ao) {
          al(ao);
        },
        error: function (aq, ao, ap) {
          al({ error: { message: ap, code: aq.status } });
        },
      });
    }
    function I(al) {
      if ("undefined" != typeof window.RhoOld) {
        if ("object" == typeof window.RhoOld) {
          for (var am in window.RhoOld) {
            if (
              window.RhoOld.hasOwnProperty(am) &&
              "undefined" != typeof window.RhoOld[am] &&
              "undefined" == typeof al[am]
            ) {
              al[am] = window.RhoOld[am];
            }
          }
        }
        window.RhoOld = undefined;
      }
      return al;
    }
    var S = {
      flag: {
        API_AJAX_URL: "__rho_apiAjaxURL",
        USE_AJAX_BRIDGE: "__rho_useAjaxBridge",
        NATIVE_BRIDGE_TYPE: "__rho_nativeBridgeType",
      },
      loadApiModules: H,
      namespace: Z,
      namespaceAlias: j,
      apiReqFor: af,
      namesToProps: e,
      namesToArray: T,
      createPropsProxy: q,
      createRawPropsProxy: C,
      createMethodsProxy: ah,
      methodAccessReqFunc: d,
      incompatibleProps: t,
      rhoIdParam: function () {
        return V;
      },
      rhoClassParam: function () {
        return ak;
      },
      nextId: b,
    };
    var n = {
      id: {
        AJAX: "ajax",
        AUTO: "auto",
        RHOSIMULATOR: "rhosimulator",
        ANDROID: "android",
        IPHONE: "iphone",
        WP8: "wp8",
        WM: "wm",
        WIN32: "win32",
      },
      nativeApiCall: W,
      nativeApiResult: function () {},
    };
    var U = I({ jQuery: ae, util: S, platform: n, callbackHandler: p });
    var ab = "__rhoNativeApiCall";
    var R = "__rhoNativeApi";
    var z = {};
    var f = function (am, al) {
      z[am] = function () {
        var an = al();
        an.apiCall.platformId = am;
        return an;
      };
    };
    f(n.id.ANDROID, function () {
      return {
        apiCall: function (ao, an, am) {
          var al = {};
          if (window[R] && "function" == typeof window[R]["apiCall"]) {
            al = window[R].apiCall(ao, an);
          } else {
            al = prompt(ao, ab + ":prompt");
          }
          am(JSON.parse(al));
        },
      };
    });
    f(n.id.IPHONE, function () {
      return (
        window[R] || {
          apiCall: function (ao, am, al) {
            var an = {};
            an[ab] = ao;
            ae.ajax({
              async: am,
              type: "head",
              url: "/!" + R + "?" + +new Date(),
              dataType: "json",
              headers: an,
              success: function (ar, ap, aq) {
                al(JSON.parse(aq.responseText));
              },
              error: function (ar, ap, aq) {
                al({ error: { message: aq, code: ar.status } });
              },
            });
          },
        }
      );
    });
    f(n.id.WP8, function () {
      var al = undefined;
      n.nativeApiResult = function (am) {
        al = am;
      };
      window.__rhoNativeApiResult = n.nativeApiResult;
      return {
        apiCall: function (ao, an, am) {
          window.external.notify(ao);
          am(JSON.parse(al));
        },
      };
    });
    f(n.id.WM, function () {
      var al = new WebkitBridge();
      return {
        apiCall: function (ao, an, am) {
          var ap = al.framework(ao);
          am(JSON.parse(ap));
        },
      };
    });
    f(n.id.RHOSIMULATOR, function () {
      return {
        apiCall: function (ao, an, am) {
          var al = {};
          if (window[R] && "function" == typeof window[R]["apiCall"]) {
            al = window[R].apiCall(ao, an);
          }
          am(JSON.parse(al));
        },
      };
    });
    f(n.id.WIN32, function () {
      return {
        apiCall: function (ao, an, am) {
          var al = {};
          if (window[R] && "function" == typeof window[R]["apiCall"]) {
            al = window[R].apiCall(ao, an);
          }
          am(JSON.parse(al));
        },
      };
    });
    var G = n.nativeApiCall;
    f(n.id.AJAX, function () {
      return { apiCall: G };
    });
    var aj = [
      [/RhoSimulator/, z[n.id.RHOSIMULATOR]],
      [/Android/, z[n.id.ANDROID]],
      [/iPhone|iPod|iPad/, z[n.id.IPHONE]],
      [/Windows\s+Phone/, z[n.id.WP8]],
      [/Windows\s+(?:Mobile|CE)|WM [0-9]/, z[n.id.WM]],
      [/Windows/, z[n.id.WIN32]],
    ];
    var ac = z[n.id.ANDROID];
    n.nativeApiCall = function () {
      var al = z[window[S.flag.NATIVE_BRIDGE_TYPE]] || ac;
      al().apiCall.apply(this, arguments);
    };
    return U;
  })("undefined" == typeof jQuery ? undefined : jQuery);
var EB = Rho;
(function (f, c, d) {
  var b = "Rho.Application";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.APP_EVENT_ACTIVATED = "Activated";
  e.APP_EVENT_CONFIGCONFLICT = "ConfigConflict";
  e.APP_EVENT_DBMIGRATESOURCE = "DBMigrateSource";
  e.APP_EVENT_DEACTIVATED = "Deactivated";
  e.APP_EVENT_SCREEN_OFF = "ScreenOff";
  e.APP_EVENT_SCREEN_ON = "ScreenOn";
  e.APP_EVENT_SYNCUSERCHANGED = "SyncUserChanged";
  e.APP_EVENT_UICREATED = "UICreated";
  e.APP_EVENT_UIDESTROYED = "UIDestroyed";
  d.createPropsProxy(
    e,
    [
      { propName: "appBundleFolder", propAccess: "r" },
      { propName: "appsBundleFolder", propAccess: "r" },
      { propName: "bundleFolder", propAccess: "r" },
      { propName: "userFolder", propAccess: "r" },
      { propName: "configPath", propAccess: "r" },
      { propName: "modelsManifestPath", propAccess: "r" },
      { propName: "databaseBlobFolder", propAccess: "r" },
      { propName: "publicFolder", propAccess: "r" },
      { propName: "startURI", propAccess: "rw" },
      { propName: "settingsPageURI", propAccess: "rw" },
      { propName: "splash", propAccess: "r" },
      { propName: "version", propAccess: "r" },
      { propName: "title", propAccess: "rw" },
      { propName: "appName", propAccess: "r" },
      { propName: "locale", propAccess: "r" },
      { propName: "country", propAccess: "r" },
      { propName: "nativeMenu", propAccess: "rw" },
      { propName: "defaultNativeMenu", propAccess: "r" },
      { propName: "securityTokenNotPassed", propAccess: "r" },
      { propName: "invalidSecurityTokenStartPath", propAccess: "r" },
      { propName: "rhoPlatformVersion", propAccess: "r" },
      { propName: "badLinkURI", propAccess: "r" },
    ],
    a
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "modelFolderPath",
        nativeName: "modelFolderPath",
        valueCallbackIndex: 1,
      },
      {
        methodName: "databaseFilePath",
        nativeName: "databaseFilePath",
        valueCallbackIndex: 1,
      },
      {
        methodName: "expandDatabaseBlobFilePath",
        nativeName: "expandDatabaseBlobFilePath",
        valueCallbackIndex: 1,
      },
      {
        methodName: "relativeDatabaseBlobFilePath",
        nativeName: "relativeDatabaseBlobFilePath",
        valueCallbackIndex: 1,
      },
      { methodName: "quit", nativeName: "quit", valueCallbackIndex: 0 },
      { methodName: "minimize", nativeName: "minimize", valueCallbackIndex: 0 },
      { methodName: "restore", nativeName: "restore", valueCallbackIndex: 0 },
      {
        methodName: "setApplicationNotify",
        nativeName: "setApplicationNotify",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var c = "Rho.Config";
  var b = e.apiReqFor(c);
  function a() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (c != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(a.prototype, [], b, function () {
    return this.getId();
  });
  e.createMethodsProxy(a.prototype, [], b, function () {
    return this.getId();
  });
  e.createRawPropsProxy(a.prototype, []);
  e.createPropsProxy(a, [{ propName: "configPath", propAccess: "rw" }], b);
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "getPropertyString",
        nativeName: "getPropertyString",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setPropertyString",
        nativeName: "setPropertyString",
        valueCallbackIndex: 3,
      },
      {
        methodName: "getPropertyInt",
        nativeName: "getPropertyInt",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setPropertyInt",
        nativeName: "setPropertyInt",
        valueCallbackIndex: 3,
      },
      {
        methodName: "getPropertyBool",
        nativeName: "getPropertyBool",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setPropertyBool",
        nativeName: "setPropertyBool",
        valueCallbackIndex: 3,
      },
      {
        methodName: "isPropertyExists",
        nativeName: "isPropertyExists",
        valueCallbackIndex: 1,
      },
      {
        methodName: "removeProperty",
        nativeName: "removeProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "loadFromFile",
        nativeName: "loadFromFile",
        valueCallbackIndex: 0,
      },
    ],
    b
  );
  e.namespace(c, a);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Intent";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.BROADCAST = "broadcast";
  e.START_ACTIVITY = "startActivity";
  e.START_SERVICE = "startService";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "send",
        nativeName: "send",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "startListening",
        nativeName: "startListening",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "stopListening",
        nativeName: "stopListening",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Log";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  c.DEST_FILE = "file";
  c.DEST_OUTPUT = "stdio";
  c.DEST_URI = "uri";
  c.LEVEL_ERROR = 3;
  c.LEVEL_FATAL = 4;
  c.LEVEL_INFO = 1;
  c.LEVEL_TRACE = 0;
  c.LEVEL_WARNING = 2;
  e.createPropsProxy(
    c,
    [
      { propName: "level", propAccess: "rw" },
      { propName: "destination", propAccess: "rw" },
      { propName: "includeCategories", propAccess: "rw" },
      { propName: "excludeCategories", propAccess: "rw" },
      { propName: "fileSize", propAccess: "rw" },
      { propName: "filePath", propAccess: "rw" },
      { propName: "memoryPeriod", propAccess: "rw" },
      { propName: "netTrace", propAccess: "rw" },
      { propName: "skipPost", propAccess: "rw" },
      { propName: "excludeFilter", propAccess: "rw" },
      { propName: "destinationURI", propAccess: "rw" },
    ],
    a
  );
  e.createMethodsProxy(
    c,
    [
      { methodName: "trace", nativeName: "trace", valueCallbackIndex: 2 },
      { methodName: "info", nativeName: "info", valueCallbackIndex: 2 },
      { methodName: "warning", nativeName: "warning", valueCallbackIndex: 2 },
      { methodName: "error", nativeName: "error", valueCallbackIndex: 2 },
      {
        methodName: "fatalError",
        nativeName: "fatalError",
        valueCallbackIndex: 2,
      },
      {
        methodName: "sendLogFile",
        nativeName: "sendLogFile",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "showLog", nativeName: "showLog", valueCallbackIndex: 0 },
      {
        methodName: "cleanLogFile",
        nativeName: "cleanLogFile",
        valueCallbackIndex: 0,
      },
      {
        methodName: "readLogFile",
        nativeName: "readLogFile",
        valueCallbackIndex: 1,
      },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.NativeMenubar";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(
    e,
    [
      { propName: "mainMenu", propAccess: "rw" },
      { propName: "extraMenu", propAccess: "rw" },
      { propName: "mainButton", propAccess: "rw" },
      { propName: "extraButton", propAccess: "rw" },
      { propName: "defaultMainMenu", propAccess: "r" },
    ],
    a
  );
  d.createMethodsProxy(e, [], a);
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.NativeTabbar";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.ON_TAB_FOCUS = "onTabFocus";
  f.ON_TAB_NEW_ERROR = "onTabNewError";
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "create",
        nativeName: "create",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "currentTabIndex",
        nativeName: "currentTabIndex",
        valueCallbackIndex: 0,
      },
      { methodName: "remove", nativeName: "remove", valueCallbackIndex: 0 },
      {
        methodName: "removeTab",
        nativeName: "removeTab",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setTabBadge",
        nativeName: "setTabBadge",
        valueCallbackIndex: 2,
      },
      {
        methodName: "switchTab",
        nativeName: "switchTab",
        valueCallbackIndex: 1,
      },
      {
        methodName: "isCreated",
        nativeName: "isCreated",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.NativeToolbar";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.BACK = "back";
  e.CLOSE = "close";
  e.EXIT = "exit";
  e.FULLSCREEN = "fullscreen";
  e.HOME = "home";
  e.LOG = "log";
  e.MINIMIZE = "minimize";
  e.OPTIONS = "options";
  e.REFRESH = "refresh";
  e.SEPARATOR = "separator";
  e.SIP = "SIP";
  e.SYNC = "sync";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      { methodName: "create", nativeName: "create", valueCallbackIndex: 2 },
      { methodName: "remove", nativeName: "remove", valueCallbackIndex: 0 },
      {
        methodName: "isCreated",
        nativeName: "isCreated",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Navbar";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      { methodName: "create", nativeName: "create", valueCallbackIndex: 1 },
      { methodName: "remove", nativeName: "remove", valueCallbackIndex: 0 },
      { methodName: "started", nativeName: "started", valueCallbackIndex: 0 },
    ],
    a
  );
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Network";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  d.AUTH_BASIC = "basic";
  e.createPropsProxy(
    d,
    [
      { propName: "url", propAccess: "rw" },
      { propName: "authType", propAccess: "rw" },
      { propName: "authUser", propAccess: "rw" },
      { propName: "authPassword", propAccess: "rw" },
      { propName: "verifyPeerCertificate", propAccess: "rw" },
      { propName: "httpVerb", propAccess: "rw" },
      { propName: "headers", propAccess: "rw" },
      { propName: "responseTimeout", propAccess: "rw" },
    ],
    a
  );
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "cancel",
        nativeName: "cancel",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "downloadFile",
        nativeName: "downloadFile",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "get",
        nativeName: "get",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "post",
        nativeName: "post",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "uploadFile",
        nativeName: "uploadFile",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "hasNetwork",
        nativeName: "hasNetwork",
        valueCallbackIndex: 0,
      },
      {
        methodName: "hasWifiNetwork",
        nativeName: "hasWifiNetwork",
        valueCallbackIndex: 0,
      },
      {
        methodName: "hasCellNetwork",
        nativeName: "hasCellNetwork",
        valueCallbackIndex: 0,
      },
      {
        methodName: "startStatusNotify",
        nativeName: "startStatusNotify",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "stopStatusNotify",
        nativeName: "stopStatusNotify",
        valueCallbackIndex: 0,
      },
      {
        methodName: "detectConnection",
        nativeName: "detectConnection",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "stopDetectingConnection",
        nativeName: "stopDetectingConnection",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "connectWan",
        nativeName: "connectWan",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "disconnectWan",
        nativeName: "disconnectWan",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.NewORM";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.APP = "app";
  f.BULK_ONLY = "bulk_only";
  f.FIXED_SCHEMA = "fixedSchema";
  f.FULL_UPDATE = "full_update";
  f.INCREMENTAL = "incremental";
  f.LOCAL = "local";
  f.NONE = "none";
  f.OVERWRITE = "overwrite";
  f.PASS_THROUGH = "pass_through";
  f.PROPERTY_BAG = "propertyBag";
  f.SYNC = "sync";
  f.USER = "user";
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "useNewOrm",
        nativeName: "useNewOrm",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getClientId",
        nativeName: "getClientId",
        valueCallbackIndex: 0,
      },
      {
        methodName: "haveLocalChanges",
        nativeName: "haveLocalChanges",
        valueCallbackIndex: 0,
      },
      {
        methodName: "databaseLocalReset",
        nativeName: "databaseLocalReset",
        valueCallbackIndex: 0,
      },
      {
        methodName: "databaseClientReset",
        nativeName: "databaseClientReset",
        valueCallbackIndex: 1,
      },
      {
        methodName: "databaseFullResetEx",
        nativeName: "databaseFullResetEx",
        valueCallbackIndex: 3,
      },
      {
        methodName: "databaseFullReset",
        nativeName: "databaseFullReset",
        valueCallbackIndex: 2,
      },
      {
        methodName: "databaseFullResetAndLogout",
        nativeName: "databaseFullResetAndLogout",
        valueCallbackIndex: 0,
      },
      {
        methodName: "databaseFullclientResetAndLogout",
        nativeName: "databaseFullclientResetAndLogout",
        valueCallbackIndex: 0,
      },
      {
        methodName: "generateId",
        nativeName: "generateId",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var c = "Rho.NewORMModel";
  var b = e.apiReqFor(c);
  function a() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (c != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
      this.init.apply(this, arguments);
    }
  }
  e.createPropsProxy(
    a.prototype,
    [
      { propName: "loaded", propAccess: "rw" },
      { propName: "model_name", propAccess: "rw" },
      { propName: "sync_type", propAccess: "rw" },
      { propName: "sync_priority", propAccess: "rw" },
      { propName: "partition", propAccess: "rw" },
      { propName: "source_id", propAccess: "rw" },
      { propName: "fixed_schema", propAccess: "rw" },
      { propName: "freezed", propAccess: "rw" },
      { propName: "associations", propAccess: "rw" },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    a.prototype,
    [
      { methodName: "init", nativeName: "init", valueCallbackIndex: 1 },
      {
        methodName: "initModel",
        nativeName: "initModel",
        valueCallbackIndex: 0,
      },
      {
        methodName: "setBelongsTo",
        nativeName: "setBelongsTo",
        valueCallbackIndex: 2,
      },
      {
        methodName: "getBelongsTo",
        nativeName: "getBelongsTo",
        valueCallbackIndex: 1,
      },
      { methodName: "set", nativeName: "set", valueCallbackIndex: 2 },
      { methodName: "enable", nativeName: "enable", valueCallbackIndex: 1 },
      {
        methodName: "setModelProperty",
        nativeName: "setModelProperty",
        valueCallbackIndex: 3,
      },
      {
        methodName: "getModelProperty",
        nativeName: "getModelProperty",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setSchemaIndex",
        nativeName: "setSchemaIndex",
        valueCallbackIndex: 3,
      },
      { methodName: "destroy", nativeName: "destroy", valueCallbackIndex: 0 },
      {
        methodName: "createObject",
        nativeName: "createObject",
        valueCallbackIndex: 1,
      },
      {
        methodName: "createInstance",
        nativeName: "createInstance",
        valueCallbackIndex: 1,
      },
      {
        methodName: "anyChangedObjects",
        nativeName: "anyChangedObjects",
        valueCallbackIndex: 0,
      },
      {
        methodName: "hasChanges",
        nativeName: "hasChanges",
        valueCallbackIndex: 1,
      },
      {
        methodName: "canModify",
        nativeName: "canModify",
        valueCallbackIndex: 1,
      },
      {
        methodName: "updateObject",
        nativeName: "updateObject",
        valueCallbackIndex: 3,
      },
      {
        methodName: "saveObject",
        nativeName: "saveObject",
        valueCallbackIndex: 2,
      },
      {
        methodName: "deleteObject",
        nativeName: "deleteObject",
        valueCallbackIndex: 1,
      },
      {
        methodName: "deleteObjects",
        nativeName: "deleteObjects",
        valueCallbackIndex: 2,
      },
      {
        methodName: "deleteObjectsPropertyBagByCondHash",
        nativeName: "deleteObjectsPropertyBagByCondHash",
        valueCallbackIndex: 2,
      },
      {
        methodName: "deleteObjectsPropertyBagByCondArray",
        nativeName: "deleteObjectsPropertyBagByCondArray",
        valueCallbackIndex: 3,
      },
      { methodName: "getCount", nativeName: "getCount", valueCallbackIndex: 0 },
      {
        methodName: "getBackendRefreshTime",
        nativeName: "getBackendRefreshTime",
        valueCallbackIndex: 0,
      },
      {
        methodName: "findObjects",
        nativeName: "findObjects",
        valueCallbackIndex: 5,
      },
      {
        methodName: "findObjectsPropertyBagByCondHash",
        nativeName: "findObjectsPropertyBagByCondHash",
        valueCallbackIndex: 4,
      },
      {
        methodName: "findObjectsPropertyBagByCondArray",
        nativeName: "findObjectsPropertyBagByCondArray",
        valueCallbackIndex: 5,
      },
      {
        methodName: "find_by_sql",
        nativeName: "find_by_sql",
        valueCallbackIndex: 1,
      },
      {
        methodName: "validateFreezedAttribute",
        nativeName: "validateFreezedAttribute",
        valueCallbackIndex: 1,
      },
      {
        methodName: "validateFreezedAttributes",
        nativeName: "validateFreezedAttributes",
        valueCallbackIndex: 1,
      },
      {
        methodName: "buildComplexWhereCond",
        nativeName: "buildComplexWhereCond",
        valueCallbackIndex: 4,
      },
      {
        methodName: "buildFindLimits",
        nativeName: "buildFindLimits",
        valueCallbackIndex: 2,
      },
      {
        methodName: "buildFindOrder",
        nativeName: "buildFindOrder",
        valueCallbackIndex: 2,
      },
      {
        methodName: "buildFindOrderString",
        nativeName: "buildFindOrderString",
        valueCallbackIndex: 2,
      },
      {
        methodName: "buildSimpleWhereCond",
        nativeName: "buildSimpleWhereCond",
        valueCallbackIndex: 2,
      },
      {
        methodName: "onSyncDeleteError",
        nativeName: "onSyncDeleteError",
        valueCallbackIndex: 3,
      },
      {
        methodName: "onSyncUpdateError",
        nativeName: "onSyncUpdateError",
        valueCallbackIndex: 4,
      },
      {
        methodName: "onSyncCreateError",
        nativeName: "onSyncCreateError",
        valueCallbackIndex: 2,
      },
      {
        methodName: "pushChanges",
        nativeName: "pushChanges",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(a.prototype, []);
  a.ALL = "all";
  a.APP = "app";
  a.ASC = "ASC";
  a.BULK_ONLY = "bulk_only";
  a.COUNT = "count";
  a.DESC = "DESC";
  a.FIRST = "first";
  a.FIXED_SCHEMA = "fixed_schema";
  a.FULL_UPDATE = "full_update";
  a.INCREMENTAL = "incremental";
  a.LOCAL = "local";
  a.NONE = "none";
  a.OVERWRITE = "overwrite";
  a.PASS_THROUGH = "pass_through";
  a.SYNC = "sync";
  a.USER = "user";
  e.createPropsProxy(a, [], b);
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        valueCallbackIndex: 0,
      },
      { methodName: "getModel", nativeName: "getModel", valueCallbackIndex: 1 },
      { methodName: "clear", nativeName: "clear", valueCallbackIndex: 0 },
    ],
    b
  );
  e.namespace(c, a);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.Notification";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.TYPE_DIALOG = "dialog";
  f.TYPE_NOTIFICATION = "notification";
  f.TYPE_NOTIFICATION_DIALOG = "notificationDialog";
  f.TYPE_TOAST = "toast";
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "showPopup",
        nativeName: "showPopup",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "hidePopup",
        nativeName: "hidePopup",
        valueCallbackIndex: 0,
      },
      {
        methodName: "showStatus",
        nativeName: "showStatus",
        valueCallbackIndex: 3,
      },
      { methodName: "playFile", nativeName: "playFile", valueCallbackIndex: 2 },
      { methodName: "beep", nativeName: "beep", valueCallbackIndex: 1 },
      { methodName: "vibrate", nativeName: "vibrate", valueCallbackIndex: 1 },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var c = "Rho.Push";
  var b = e.apiReqFor(c);
  function a() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (c != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(
    a.prototype,
    [
      { propName: "type", propAccess: "r" },
      { propName: "userNotifyMode", propAccess: "rw" },
      { propName: "pushServer", propAccess: "r" },
      { propName: "pushAppName", propAccess: "r" },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    a.prototype,
    [
      {
        methodName: "getDeviceId",
        nativeName: "getDeviceId",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "startNotifications",
        nativeName: "startNotifications",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "stopNotifications",
        nativeName: "stopNotifications",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(a.prototype, []);
  a.PUSH_NOTIFY_ALERTS = "alert";
  a.PUSH_NOTIFY_NONE = "none";
  a.PUSH_NOTIFY_NOTIFICATIONS = "notification";
  a.PUSH_NOTIFY_NOTIFICATIONS_AND_ALERTS = "backgroundNotifications";
  a.PUSH_TYPE_NATIVE = "native-push";
  a.PUSH_TYPE_RHOCONNECT = "rhoconnect-push";
  e.createPropsProxy(a, [], b);
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    b
  );
  e.createPropsProxy(
    a,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          a.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    b
  );
  a.getId = function () {
    return a.getDefaultID();
  };
  e.createPropsProxy(
    a,
    [
      { propName: "type", propAccess: "r" },
      { propName: "userNotifyMode", propAccess: "rw" },
      { propName: "pushServer", propAccess: "r" },
      { propName: "pushAppName", propAccess: "r" },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "getDeviceId",
        nativeName: "getDeviceId",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "startNotifications",
        nativeName: "startNotifications",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "stopNotifications",
        nativeName: "stopNotifications",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(a, []);
  e.namespace(c, a);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.RhoFile";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
      this.open.apply(this, arguments);
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(
    e.prototype,
    [
      { methodName: "open", nativeName: "open", valueCallbackIndex: 2 },
      { methodName: "close", nativeName: "close", valueCallbackIndex: 0 },
      { methodName: "isOpened", nativeName: "isOpened", valueCallbackIndex: 0 },
      { methodName: "read", nativeName: "read", valueCallbackIndex: 1 },
      { methodName: "readAll", nativeName: "readAll", valueCallbackIndex: 0 },
      { methodName: "write", nativeName: "write", valueCallbackIndex: 1 },
      { methodName: "flush", nativeName: "flush", valueCallbackIndex: 0 },
      { methodName: "seek", nativeName: "seek", valueCallbackIndex: 1 },
      { methodName: "size", nativeName: "size", valueCallbackIndex: 0 },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  e.OPEN_FOR_APPEND = 1;
  e.OPEN_FOR_READ = 2;
  e.OPEN_FOR_READ_WRITE = 4;
  e.OPEN_FOR_WRITE = 3;
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      { methodName: "copy", nativeName: "copy", valueCallbackIndex: 2 },
      { methodName: "rename", nativeName: "rename", valueCallbackIndex: 2 },
      { methodName: "makeDir", nativeName: "makeDir", valueCallbackIndex: 1 },
      { methodName: "exists", nativeName: "exists", valueCallbackIndex: 1 },
      {
        methodName: "getFileSize",
        nativeName: "getFileSize",
        valueCallbackIndex: 1,
      },
      { methodName: "isDir", nativeName: "isDir", valueCallbackIndex: 1 },
      { methodName: "isFile", nativeName: "isFile", valueCallbackIndex: 1 },
      {
        methodName: "deleteFile",
        nativeName: "deleteFile",
        valueCallbackIndex: 1,
      },
      {
        methodName: "deleteDir",
        nativeName: "deleteDir",
        valueCallbackIndex: 1,
      },
      { methodName: "makeDirs", nativeName: "makeDirs", valueCallbackIndex: 1 },
      {
        methodName: "deleteRecursive",
        nativeName: "deleteRecursive",
        valueCallbackIndex: 2,
      },
      { methodName: "listDir", nativeName: "listDir", valueCallbackIndex: 1 },
      { methodName: "basename", nativeName: "basename", valueCallbackIndex: 1 },
      { methodName: "dirname", nativeName: "dirname", valueCallbackIndex: 1 },
      { methodName: "join", nativeName: "join", valueCallbackIndex: 2 },
      { methodName: "read", nativeName: "read", valueCallbackIndex: 1 },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.System";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.KEYBOARD_AUTOMATIC = "automatic";
  e.KEYBOARD_HIDDEN = "hidden";
  e.KEYBOARD_SHOWN = "shown";
  e.PLATFORM_ANDROID = "ANDROID";
  e.PLATFORM_IOS = "APPLE";
  e.PLATFORM_WINDOWS_DESKTOP = "WINDOWS_DESKTOP";
  e.PLATFORM_WM_CE = "WINDOWS";
  e.PLATFORM_WP8 = "WP8";
  e.REGKEY_CLASSES_ROOT = "HKCR";
  e.REGKEY_CURRENT_USER = "HKCU";
  e.REGKEY_LOCAL_MACHINE = "HKLM";
  e.REGKEY_USERS = "HKU";
  e.REGTYPE_BINARY = "Binary";
  e.REGTYPE_DWORD = "DWORD";
  e.REGTYPE_MULTI_SZ = "MultiSZ";
  e.REGTYPE_SZ = "String";
  e.SCREEN_LANDSCAPE = "landscape";
  e.SCREEN_PORTRAIT = "portrait";
  d.createPropsProxy(
    e,
    [
      { propName: "main_window_closed", propAccess: "r" },
      { propName: "platform", propAccess: "r" },
      { propName: "hasCamera", propAccess: "r" },
      { propName: "screenWidth", propAccess: "r" },
      { propName: "screenHeight", propAccess: "r" },
      { propName: "realScreenWidth", propAccess: "r" },
      { propName: "realScreenHeight", propAccess: "r" },
      { propName: "screenOrientation", propAccess: "r" },
      { propName: "ppiX", propAccess: "r" },
      { propName: "ppiY", propAccess: "r" },
      { propName: "deviceOwnerEmail", propAccess: "r" },
      { propName: "deviceOwnerName", propAccess: "r" },
      { propName: "devicePushId", propAccess: "r" },
      { propName: "phoneId", propAccess: "r" },
      { propName: "deviceName", propAccess: "r" },
      { propName: "osVersion", propAccess: "r" },
      { propName: "locale", propAccess: "r" },
      { propName: "country", propAccess: "r" },
      { propName: "isEmulator", propAccess: "r" },
      { propName: "isRhoSimulator", propAccess: "r" },
      { propName: "hasCalendar", propAccess: "r" },
      { propName: "isSymbolDevice", propAccess: "r" },
      { propName: "isMotorolaDevice", propAccess: "r" },
      { propName: "oemInfo", propAccess: "r" },
      { propName: "uuid", propAccess: "r" },
      { propName: "deviceHostName", propAccess: "r" },
      { propName: "deviceSerialNumber", propAccess: "r" },
      { propName: "applicationIconBadge", propAccess: "rw" },
      { propName: "httpProxyURI", propAccess: "rw" },
      { propName: "lockWindowSize", propAccess: "rw" },
      { propName: "keyboardState", propAccess: "rw" },
      { propName: "localServerPort", propAccess: "r" },
      { propName: "freeServerPort", propAccess: "r" },
      { propName: "screenAutoRotate", propAccess: "rw" },
      { propName: "hasTouchscreen", propAccess: "r" },
      { propName: "webviewFramework", propAccess: "r" },
      { propName: "screenSleeping", propAccess: "rw" },
      { propName: "hasNetwork", propAccess: "r" },
      { propName: "hasWifiNetwork", propAccess: "r" },
      { propName: "hasCellNetwork", propAccess: "r" },
      { propName: "hasSqlite", propAccess: "r" },
    ],
    a
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "applicationInstall",
        nativeName: "applicationInstall",
        valueCallbackIndex: 1,
      },
      {
        methodName: "isApplicationInstalled",
        nativeName: "isApplicationInstalled",
        valueCallbackIndex: 1,
      },
      {
        methodName: "applicationUninstall",
        nativeName: "applicationUninstall",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getStartParams",
        nativeName: "getStartParams",
        valueCallbackIndex: 0,
      },
      { methodName: "openUrl", nativeName: "openUrl", valueCallbackIndex: 1 },
      {
        methodName: "unzipFile",
        nativeName: "unzipFile",
        valueCallbackIndex: 3,
      },
      { methodName: "zipFile", nativeName: "zipFile", valueCallbackIndex: 3 },
      { methodName: "zipFiles", nativeName: "zipFiles", valueCallbackIndex: 4 },
      {
        methodName: "setRegistrySetting",
        nativeName: "setRegistrySetting",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getRegistrySetting",
        nativeName: "getRegistrySetting",
        valueCallbackIndex: 1,
      },
      {
        methodName: "deleteRegistrySetting",
        nativeName: "deleteRegistrySetting",
        valueCallbackIndex: 1,
      },
      {
        methodName: "setWindowFrame",
        nativeName: "setWindowFrame",
        valueCallbackIndex: 4,
      },
      {
        methodName: "setWindowPosition",
        nativeName: "setWindowPosition",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setWindowSize",
        nativeName: "setWindowSize",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setDoNotBackupAttribute",
        nativeName: "setDoNotBackupAttribute",
        valueCallbackIndex: 2,
      },
      {
        methodName: "runApplication",
        nativeName: "runApplication",
        valueCallbackIndex: 3,
      },
      {
        methodName: "hideSplashScreen",
        nativeName: "hideSplashScreen",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.System.Process";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(
    e.prototype,
    [
      {
        methodName: "waitForApplication",
        nativeName: "waitForApplication",
        valueCallbackIndex: 0,
      },
      {
        methodName: "closeHandle",
        nativeName: "closeHandle",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProcessExitCode",
        nativeName: "getProcessExitCode",
        valueCallbackIndex: 0,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "runApplication",
        nativeName: "runApplication",
        valueCallbackIndex: 3,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Timer";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(
    e.prototype,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "isAlive", nativeName: "isAlive", valueCallbackIndex: 0 },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [{ methodName: "create", nativeName: "create", valueCallbackIndex: 0 }],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.WebView";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.SAVE_FORMAT_JPEG = "jpeg";
  e.SCROLL_FINGER = "FingerScroll";
  e.SCROLL_NONE = "None";
  e.SCROLL_SCROLLBARS = "Scrollbars";
  d.createPropsProxy(
    e,
    [
      { propName: "framework", propAccess: "r" },
      { propName: "fullScreen", propAccess: "rw" },
      { propName: "enableZoom", propAccess: "rw" },
      { propName: "enablePageLoadingIndication", propAccess: "r" },
      { propName: "enableWebPlugins", propAccess: "r" },
      { propName: "navigationTimeout", propAccess: "rw" },
      { propName: "scrollTechnique", propAccess: "r" },
      { propName: "fontFamily", propAccess: "r" },
      { propName: "userAgent", propAccess: "r" },
      { propName: "viewportEnabled", propAccess: "r" },
      { propName: "viewportWidth", propAccess: "r" },
      { propName: "cacheSize", propAccess: "r" },
      { propName: "acceptLanguage", propAccess: "rw" },
      { propName: "zoomPage", propAccess: "rw" },
      { propName: "textZoomLevel", propAccess: "rw" },
      { propName: "activeTab", propAccess: "r" },
      { propName: "contentHeight", propAccess: "r" },
      { propName: "blockNetworkImage", propAccess: "rw" },
      { propName: "blockNetworkLoads", propAccess: "rw" },
      { propName: "useWideViewPort", propAccess: "rw" },
      { propName: "loadWithOverviewMode", propAccess: "rw" },
    ],
    a
  );
  d.createMethodsProxy(
    e,
    [
      { methodName: "refresh", nativeName: "refresh", valueCallbackIndex: 1 },
      {
        methodName: "clearCache",
        nativeName: "clearCache",
        valueCallbackIndex: 0,
      },
      {
        methodName: "clearApplicationCache",
        nativeName: "clearApplicationCache",
        valueCallbackIndex: 0,
      },
      {
        methodName: "clearCookies",
        nativeName: "clearCookies",
        valueCallbackIndex: 0,
      },
      {
        methodName: "clearHistory",
        nativeName: "clearHistory",
        valueCallbackIndex: 0,
      },
      {
        methodName: "resizeWebviewLayout",
        nativeName: "resizeWebviewLayout",
        valueCallbackIndex: 4,
      },
      {
        methodName: "resetWebviewLayout",
        nativeName: "resetWebviewLayout",
        valueCallbackIndex: 0,
      },
      { methodName: "navigate", nativeName: "navigate", valueCallbackIndex: 2 },
      {
        methodName: "navigateBack",
        nativeName: "navigateBack",
        valueCallbackIndex: 1,
      },
      {
        methodName: "currentLocation",
        nativeName: "currentLocation",
        valueCallbackIndex: 1,
      },
      {
        methodName: "currentURL",
        nativeName: "currentURL",
        valueCallbackIndex: 1,
      },
      {
        methodName: "executeJavascript",
        nativeName: "executeJavascript",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setCookie",
        nativeName: "setCookie",
        valueCallbackIndex: 2,
      },
      { methodName: "save", nativeName: "save", valueCallbackIndex: 3 },
      {
        methodName: "captureWebPageScreen",
        nativeName: "captureWebPageScreen",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var c = "Rho.Barcode";
  var b = e.apiReqFor(c);
  function a() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (c != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(
    a.prototype,
    [
      { propName: "autoEnter", propAccess: "rw" },
      { propName: "autoTab", propAccess: "rw" },
      { propName: "hapticFeedback", propAccess: "rw" },
      { propName: "linearSecurityLevel", propAccess: "rw" },
      { propName: "scanTimeout", propAccess: "rw" },
      { propName: "rasterMode", propAccess: "rw" },
      { propName: "rasterHeight", propAccess: "rw" },
      { propName: "aimingPattern", propAccess: "rw" },
      { propName: "aimType", propAccess: "rw" },
      { propName: "timedAimDuration", propAccess: "rw" },
      { propName: "sameSymbolTimeout", propAccess: "rw" },
      { propName: "differentSymbolTimeout", propAccess: "rw" },
      { propName: "digimarcDecoding", propAccess: "rw" },
      { propName: "barcodeCount", propAccess: "rw" },
      { propName: "instantReporting", propAccess: "rw" },
      { propName: "aimMode", propAccess: "rw" },
      { propName: "codeIdType", propAccess: "rw" },
      { propName: "picklistMode", propAccess: "rw" },
      { propName: "picklistEx", propAccess: "rw" },
      { propName: "scanMode", propAccess: "rw" },
      { propName: "sceneDetectionQualifier", propAccess: "rw" },
      { propName: "characterSetSelection", propAccess: "rw" },
      { propName: "autoCharacterSetFailureOption", propAccess: "rw" },
      { propName: "enableGS1", propAccess: "rw" },
      { propName: "enableHIBCC", propAccess: "rw" },
      { propName: "enableICCBBA", propAccess: "rw" },
      { propName: "viewfinderMode", propAccess: "rw" },
      { propName: "viewfinderX", propAccess: "rw" },
      { propName: "viewfinderY", propAccess: "rw" },
      { propName: "viewfinderWidth", propAccess: "rw" },
      { propName: "viewfinderHeight", propAccess: "rw" },
      { propName: "viewfinderFeedback", propAccess: "rw" },
      { propName: "viewfinderFeedbackTime", propAccess: "rw" },
      { propName: "focusMode", propAccess: "rw" },
      { propName: "illuminationBrightness", propAccess: "rw" },
      { propName: "illuminationMode", propAccess: "rw" },
      { propName: "dpmMode", propAccess: "rw" },
      { propName: "inverse1dMode", propAccess: "rw" },
      { propName: "poorQuality1dMode", propAccess: "rw" },
      { propName: "beamWidth", propAccess: "rw" },
      { propName: "dbpMode", propAccess: "rw" },
      { propName: "klasseEins", propAccess: "rw" },
      { propName: "adaptiveScanning", propAccess: "rw" },
      { propName: "bidirectionalRedundancy", propAccess: "rw" },
      { propName: "barcodeDataFormat", propAccess: "rw" },
      { propName: "dataBufferSize", propAccess: "rw" },
      { propName: "connectionIdleTimeout", propAccess: "rw" },
      { propName: "disconnectBtOnDisable", propAccess: "rw" },
      { propName: "displayBtAddressBarcodeOnEnable", propAccess: "rw" },
      { propName: "enableTimeout", propAccess: "rw" },
      { propName: "friendlyName", propAccess: "r" },
      { propName: "lcdMode", propAccess: "rw" },
      { propName: "lowBatteryScan", propAccess: "rw" },
      { propName: "triggerConnected", propAccess: "rw" },
      { propName: "disableScannerDuringNavigate", propAccess: "rw" },
      { propName: "decodeVolume", propAccess: "rw" },
      { propName: "decodeDuration", propAccess: "rw" },
      { propName: "decodeFrequency", propAccess: "rw" },
      { propName: "invalidDecodeFrequency", propAccess: "rw" },
      { propName: "decodeSound", propAccess: "rw" },
      { propName: "invalidDecodeSound", propAccess: "rw" },
      { propName: "scannerType", propAccess: "r" },
      { propName: "allDecoders", propAccess: "rw" },
      { propName: "aztec", propAccess: "rw" },
      { propName: "chinese2of5", propAccess: "rw" },
      { propName: "codabar", propAccess: "rw" },
      { propName: "codabarClsiEditing", propAccess: "rw" },
      { propName: "codabarMaxLength", propAccess: "rw" },
      { propName: "codabarMinLength", propAccess: "rw" },
      { propName: "codabarNotisEditing", propAccess: "rw" },
      { propName: "codabarRedundancy", propAccess: "rw" },
      { propName: "code11", propAccess: "rw" },
      { propName: "code11checkDigitCount", propAccess: "rw" },
      { propName: "code11maxLength", propAccess: "rw" },
      { propName: "code11minLength", propAccess: "rw" },
      { propName: "code11redundancy", propAccess: "rw" },
      { propName: "code11reportCheckDigit", propAccess: "rw" },
      { propName: "code128", propAccess: "rw" },
      { propName: "code128checkIsBtTable", propAccess: "rw" },
      { propName: "code128ean128", propAccess: "rw" },
      { propName: "code128isbt128", propAccess: "rw" },
      { propName: "code128isbt128ConcatMode", propAccess: "rw" },
      { propName: "code128maxLength", propAccess: "rw" },
      { propName: "code128minLength", propAccess: "rw" },
      { propName: "code128other128", propAccess: "rw" },
      { propName: "code128redundancy", propAccess: "rw" },
      { propName: "code128securityLevel", propAccess: "rw" },
      { propName: "compositeAb", propAccess: "rw" },
      { propName: "compositeAbUccLinkMode", propAccess: "rw" },
      {
        propName: "compositeAbUseUpcPreambleCheckDigitRules",
        propAccess: "rw",
      },
      { propName: "compositeC", propAccess: "rw" },
      { propName: "code39", propAccess: "rw" },
      { propName: "code39code32Prefix", propAccess: "rw" },
      { propName: "code39convertToCode32", propAccess: "rw" },
      { propName: "code39fullAscii", propAccess: "rw" },
      { propName: "code39maxLength", propAccess: "rw" },
      { propName: "code39minLength", propAccess: "rw" },
      { propName: "code39redundancy", propAccess: "rw" },
      { propName: "code39reportCheckDigit", propAccess: "rw" },
      { propName: "code39securityLevel", propAccess: "rw" },
      { propName: "code39verifyCheckDigit", propAccess: "rw" },
      { propName: "code93", propAccess: "rw" },
      { propName: "code93maxLength", propAccess: "rw" },
      { propName: "code93minLength", propAccess: "rw" },
      { propName: "code93redundancy", propAccess: "rw" },
      { propName: "d2of5", propAccess: "rw" },
      { propName: "d2of5maxLength", propAccess: "rw" },
      { propName: "d2of5minLength", propAccess: "rw" },
      { propName: "d2of5redundancy", propAccess: "rw" },
      { propName: "datamatrix", propAccess: "rw" },
      { propName: "dotCode", propAccess: "rw" },
      { propName: "dotCodeInverse", propAccess: "rw" },
      { propName: "dotCodeMirror", propAccess: "rw" },
      { propName: "gridMatrix", propAccess: "rw" },
      { propName: "gridMatrixInverse", propAccess: "rw" },
      { propName: "gridMatrixMirror", propAccess: "rw" },
      { propName: "ean13", propAccess: "rw" },
      { propName: "ean8", propAccess: "rw" },
      { propName: "ean8convertToEan13", propAccess: "rw" },
      { propName: "hanXin", propAccess: "rw" },
      { propName: "hanXinInverse", propAccess: "rw" },
      { propName: "i2of5", propAccess: "rw" },
      { propName: "i2of5convertToEan13", propAccess: "rw" },
      { propName: "i2of5reducedQuietZone", propAccess: "rw" },
      { propName: "i2of5febraban", propAccess: "rw" },
      { propName: "i2of5maxLength", propAccess: "rw" },
      { propName: "i2of5minLength", propAccess: "rw" },
      { propName: "i2of5redundancy", propAccess: "rw" },
      { propName: "i2of5reportCheckDigit", propAccess: "rw" },
      { propName: "i2of5verifyCheckDigit", propAccess: "rw" },
      { propName: "korean3of5", propAccess: "rw" },
      { propName: "korean3of5redundancy", propAccess: "rw" },
      { propName: "korean3of5maxLength", propAccess: "rw" },
      { propName: "korean3of5minLength", propAccess: "rw" },
      { propName: "macroPdf", propAccess: "rw" },
      { propName: "macroPdfBufferLabels", propAccess: "rw" },
      { propName: "macroPdfConvertToPdf417", propAccess: "rw" },
      { propName: "macroPdfExclusive", propAccess: "rw" },
      { propName: "macroMicroPdf", propAccess: "rw" },
      { propName: "macroMicroPdfBufferLabels", propAccess: "rw" },
      { propName: "macroMicroPdfConvertToMicroPdf", propAccess: "rw" },
      { propName: "macroMicroPdfExclusive", propAccess: "rw" },
      { propName: "macroMicroPdfReportAppendInfo", propAccess: "rw" },
      { propName: "mailMark", propAccess: "rw" },
      { propName: "matrix2of5", propAccess: "rw" },
      { propName: "matrix2of5maxLength", propAccess: "rw" },
      { propName: "matrix2of5minLength", propAccess: "rw" },
      { propName: "matrix2of5reportCheckDigit", propAccess: "rw" },
      { propName: "matrix2of5verifyCheckDigit", propAccess: "rw" },
      { propName: "maxiCode", propAccess: "rw" },
      { propName: "microPdf", propAccess: "rw" },
      { propName: "microQr", propAccess: "rw" },
      { propName: "msi", propAccess: "rw" },
      { propName: "msiCheckDigits", propAccess: "rw" },
      { propName: "msiCheckDigitScheme", propAccess: "rw" },
      { propName: "msiMaxLength", propAccess: "rw" },
      { propName: "msiMinLength", propAccess: "rw" },
      { propName: "msiRedundancy", propAccess: "rw" },
      { propName: "msiReportCheckDigit", propAccess: "rw" },
      { propName: "pdf417", propAccess: "rw" },
      { propName: "signature", propAccess: "rw" },
      { propName: "signatureImageHeight", propAccess: "rw" },
      { propName: "signatureImageWidth", propAccess: "rw" },
      { propName: "signatureImageQuality", propAccess: "rw" },
      { propName: "ausPostal", propAccess: "rw" },
      { propName: "canPostal", propAccess: "rw" },
      { propName: "dutchPostal", propAccess: "rw" },
      { propName: "japPostal", propAccess: "rw" },
      { propName: "ukPostal", propAccess: "rw" },
      { propName: "ukPostalReportCheckDigit", propAccess: "rw" },
      { propName: "us4state", propAccess: "rw" },
      { propName: "us4stateFics", propAccess: "rw" },
      { propName: "usPlanet", propAccess: "rw" },
      { propName: "usPlanetReportCheckDigit", propAccess: "rw" },
      { propName: "usPostNet", propAccess: "rw" },
      { propName: "usPostNetReportCheckDigit", propAccess: "rw" },
      { propName: "qrCode", propAccess: "rw" },
      { propName: "gs1dataBar", propAccess: "rw" },
      { propName: "gs1dataBarExpanded", propAccess: "rw" },
      { propName: "gs1dataBarLimited", propAccess: "rw" },
      { propName: "gs1LimitedSecurityLevel", propAccess: "rw" },
      { propName: "gs1QrCode", propAccess: "rw" },
      { propName: "gs1Datamatrix", propAccess: "rw" },
      { propName: "tlc39", propAccess: "rw" },
      { propName: "trioptic39", propAccess: "rw" },
      { propName: "trioptic39Redundancy", propAccess: "rw" },
      { propName: "upcEanBookland", propAccess: "rw" },
      { propName: "upcEanBooklandFormat", propAccess: "rw" },
      { propName: "upcEanConvertGs1dataBarToUpcEan", propAccess: "rw" },
      { propName: "upcEanCoupon", propAccess: "rw" },
      { propName: "upcEanCouponReport", propAccess: "rw" },
      { propName: "upcEanLinearDecode", propAccess: "rw" },
      { propName: "upcEanRandomWeightCheckDigit", propAccess: "rw" },
      { propName: "upcEanRetryCount", propAccess: "rw" },
      { propName: "upcEanSecurityLevel", propAccess: "rw" },
      { propName: "upcEanSupplemental2", propAccess: "rw" },
      { propName: "upcEanSupplemental5", propAccess: "rw" },
      { propName: "upcEanSupplementalMode", propAccess: "rw" },
      { propName: "upca", propAccess: "rw" },
      { propName: "upcaPreamble", propAccess: "rw" },
      { propName: "upcaReportCheckDigit", propAccess: "rw" },
      { propName: "upce0", propAccess: "rw" },
      { propName: "upce0convertToUpca", propAccess: "rw" },
      { propName: "upce0preamble", propAccess: "rw" },
      { propName: "upce0reportCheckDigit", propAccess: "rw" },
      { propName: "upce1", propAccess: "rw" },
      { propName: "upce1convertToUpca", propAccess: "rw" },
      { propName: "upce1preamble", propAccess: "rw" },
      { propName: "upce1reportCheckDigit", propAccess: "rw" },
      { propName: "webcode", propAccess: "rw" },
      { propName: "webcodeDecodeGtSubtype", propAccess: "rw" },
      { propName: "rsmModelNumber", propAccess: "r" },
      { propName: "rsmSerialNumber", propAccess: "r" },
      { propName: "rsmDateOfManufacture", propAccess: "r" },
      { propName: "rsmDateOfService", propAccess: "r" },
      { propName: "rsmBluetoothAddress", propAccess: "r" },
      { propName: "rsmFirmwareVersion", propAccess: "r" },
      { propName: "rsmDeviceClass", propAccess: "r" },
      { propName: "rsmBatteryStatus", propAccess: "r" },
      { propName: "rsmBatteryCapacity", propAccess: "r" },
      { propName: "rsmBatteryId", propAccess: "r" },
      { propName: "rsmBluetoothAuthentication", propAccess: "rw" },
      { propName: "rsmBluetoothEncryption", propAccess: "rw" },
      { propName: "rsmBluetoothPinCode", propAccess: "rw" },
      { propName: "rsmBluetoothPinCodeType", propAccess: "rw" },
      { propName: "rsmBluetoothReconnectionAttempts", propAccess: "rw" },
      { propName: "rsmBluetoothBeepOnReconnectAttempt", propAccess: "rw" },
      { propName: "rsmBluetoothHidAutoReconnect", propAccess: "rw" },
      { propName: "rsmBluetoothFriendlyName", propAccess: "rw" },
      { propName: "rsmBluetoothInquiryMode", propAccess: "rw" },
      { propName: "rsmBluetoothAutoReconnect", propAccess: "rw" },
      { propName: "rsmForceSavePairingBarcode", propAccess: "rw" },
      { propName: "rsmLowBatteryIndication", propAccess: "rw" },
      { propName: "rsmLowBatteryIndicationCycle", propAccess: "rw" },
      { propName: "rsmScanLineWidth", propAccess: "rw" },
      { propName: "rsmGoodScansDelay", propAccess: "rw" },
      { propName: "rsmDecodeFeedback", propAccess: "rw" },
      { propName: "rsmIgnoreCode128Usps", propAccess: "rw" },
      { propName: "rsmScanTriggerWakeup", propAccess: "rw" },
      { propName: "rsmMems", propAccess: "rw" },
      { propName: "rsmProximityEnable", propAccess: "rw" },
      { propName: "rsmProximityContinuous", propAccess: "rw" },
      { propName: "rsmProximityDistance", propAccess: "rw" },
      { propName: "rsmPagingEnable", propAccess: "rw" },
      { propName: "rsmPagingBeepSequence", propAccess: "rw" },
      { propName: "pairAfterScannerReboot", propAccess: "rw" },
      { propName: "disconnectOnExit", propAccess: "rw" },
      { propName: "connectionIdleTime", propAccess: "rw" },
      { propName: "decodeLEDFeedback", propAccess: "rw" },
      { propName: "decodeLEDTime", propAccess: "rw" },
      { propName: "decodeLEDFeedbackMode", propAccess: "rw" },
      { propName: "decodeScreenNotification", propAccess: "rw" },
      { propName: "decodeScreenNotificationTime ", propAccess: "rw" },
      { propName: "decodeScreenTranslucencyLevel", propAccess: "rw" },
      { propName: "oneDQuietZoneLevel", propAccess: "rw" },
      { propName: "poorQualityDecodeEffortLevel", propAccess: "rw" },
      { propName: "zoom", propAccess: "rw" },
      { propName: "triggerType", propAccess: "rw" },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    a.prototype,
    [
      {
        methodName: "enable",
        nativeName: "enable",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "setautoCharacterSetPreference",
        nativeName: "setautoCharacterSetPreference",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getautoCharacterSetPreference",
        nativeName: "getautoCharacterSetPreference",
        valueCallbackIndex: 0,
      },
      {
        methodName: "registerBluetoothStatus",
        nativeName: "registerBluetoothStatus",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "addConnectionListener",
        nativeName: "addConnectionListener",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "removeConnectionListener",
        nativeName: "removeConnectionListener",
        valueCallbackIndex: 0,
      },
      { methodName: "start", nativeName: "start", valueCallbackIndex: 0 },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "disable", nativeName: "disable", valueCallbackIndex: 0 },
      {
        methodName: "resetToDefault",
        nativeName: "resetToDefault",
        valueCallbackIndex: 0,
      },
      {
        methodName: "isParamSupported",
        nativeName: "isParamSupported",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getSupportedProperties",
        nativeName: "getSupportedProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "take",
        nativeName: "take",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "commandRemoteScanner",
        nativeName: "commandRemoteScanner",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(a.prototype, []);
  a.AIMINGPATTERN_OFF = "OFF";
  a.AIMINGPATTERN_ON = "ON";
  a.AIMMODE_DOT = "dot";
  a.AIMMODE_NONE = "none";
  a.AIMMODE_RETICLE = "reticle";
  a.AIMMODE_SLAB = "slab";
  a.AIMTYPE_CONTINUOUS_READ = "continuousRead";
  a.AIMTYPE_PRESENTATION = "presentation";
  a.AIMTYPE_PRESS_AND_RELEASE = "pressAndRelease";
  a.AIMTYPE_PRESS_AND_SUSTAIN = "pressAndSustain";
  a.AIMTYPE_TIMED_HOLD = "timedHold";
  a.AIMTYPE_TIMED_RELEASE = "timedRelease";
  a.AIMTYPE_TRIGGER = "trigger";
  a.ALL_THRICE = "allThrice";
  a.ALL_TWICE = "allTwice";
  a.AUTO = "AUTO";
  a.BEAM_NARROW = "narrow";
  a.BEAM_NORMAL = "normal";
  a.BEAM_WIDE = "wide";
  a.BOOKLAND_ISBN10 = "isbn10";
  a.BOOKLAND_ISBN13 = "isbn13";
  a.CODE11_CHECKDIGIT_NONE = "none";
  a.CODE11_CHECKDIGIT_ONE = "one";
  a.CODE11_CHECKDIGIT_TWO = "two";
  a.CODE128ISBT_ALWAYS = "always";
  a.CODE128ISBT_AUTO = "auto";
  a.CODE128ISBT_NEVER = "never";
  a.CODEIDTYPE_AIM = "AIM";
  a.CODEIDTYPE_NONE = "NONE";
  a.CODEIDTYPE_SYMBOL = "SYMBOL";
  a.COUPONREPORT_BOTH = "BOTH";
  a.COUPONREPORT_NEW = "NEW";
  a.COUPONREPORT_OLD = "OLD";
  a.DBP_COMPOSITE = "composite";
  a.DBP_NORMAL = "normal";
  a.DOTCODEINVERSE_AUTO = "AUTO";
  a.DOTCODEINVERSE_DISABLED = "DISABLED";
  a.DOTCODEINVERSE_ENABLED = "ENABLED";
  a.DOTCODEMIRROR_AUTO = "AUTO";
  a.DOTCODEMIRROR_DISABLED = "DISABLED";
  a.DOTCODEMIRROR_ENABLED = "ENABLED";
  a.FOCUS_AUTO = "auto";
  a.FOCUS_FIXED = "fixed";
  a.FORMAT_BINARY = "binary";
  a.FORMAT_TEXT = "text";
  a.GB18030 = "GB18030";
  a.GRIDMATRIXINVERSE_AUTO = "AUTO";
  a.GRIDMATRIXINVERSE_DISABLED = "DISABLED";
  a.GRIDMATRIXINVERSE_ENABLED = "ENABLED";
  a.GRIDMATRIXMIRROR_AUTO = "AUTO";
  a.GRIDMATRIXMIRROR_DISABLED = "DISABLED";
  a.GRIDMATRIXMIRROR_ENABLED = "ENABLED";
  a.HANXININVERSE_AUTO = "AUTO";
  a.HANXININVERSE_DISABLED = "DISABLED";
  a.HANXININVERSE_ENABLED = "ENABLED";
  a.HARD = "hard";
  a.I2OF5_VERIFY_NONE = "none";
  a.I2OF5_VERIFY_OPCC = "opcc";
  a.I2OF5_VERIFY_USS = "uss";
  a.ILLUMINATION_ALWAYS_OFF = "alwaysOff";
  a.ILLUMINATION_ALWAYS_ON = "alwaysOn";
  a.ILLUMINATION_AUTO = "auto";
  a.INVERSE_AUTO = "auto";
  a.INVERSE_DISABLED = "disabled";
  a.INVERSE_ENABLED = "enabled";
  a.ISO_8859_1 = "ISO88591";
  a.LEDMODE_BOTH = "both";
  a.LEDMODE_DISABLE = "disable";
  a.LEDMODE_LOCAL = "local";
  a.LEDMODE_REMOTE = "remote";
  a.LEVEL_1 = "LEVEL_1";
  a.LEVEL_2 = "LEVEL_2";
  a.LEVEL_3 = "LEVEL_3";
  a.LEVEL_4 = "LEVEL_4";
  a.LONG_AND_SHORT = "longAndShort";
  a.MSI_CHECKDIGITS_MOD10 = "mod10";
  a.MSI_CHECKDIGITS_MOD11 = "mod11";
  a.MSI_CHECKDIGITS_ONE = "one";
  a.MSI_CHECKDIGITS_TWO = "two";
  a.NONE = "AUTO";
  a.PASR_DISABLE = "DISABLE";
  a.PASR_ENABLE = "ENABLE";
  a.PICKLISTEX_DISABLED = "disabled";
  a.PICKLISTEX_HARDWARE_RETICLE = "hardwareReticle";
  a.PICKLISTEX_SOFTWARE_RETICLE = "softwareReticle";
  a.PICKLIST_DISABLED = "disabled";
  a.PICKLIST_HARDWARE_RETICLE = "hardwareReticle";
  a.PICKLIST_SOFTWARE_RETICLE = "softwareReticle";
  a.PQD_LEVEL_0 = "level_0";
  a.PQD_LEVEL_1 = "level_1";
  a.PQD_LEVEL_2 = "level_2";
  a.PQD_LEVEL_3 = "level_3";
  a.QZ_LEVEL_0 = "level_0";
  a.QZ_LEVEL_1 = "level_1";
  a.QZ_LEVEL_2 = "level_2";
  a.QZ_LEVEL_3 = "level_3";
  a.RASTER_CYCLONE = "cyclone";
  a.RASTER_NONE = "none";
  a.RASTER_OPEN_ALWAYS = "openAlways";
  a.RASTER_SMART = "smart";
  a.REDUNDANCY_AND_LENGTH = "redundancyAndLength";
  a.RSM_AUTORECONNECT_NONE = "none";
  a.RSM_AUTORECONNECT_ON_OUT_OF_RANGE = "onOutOfRange";
  a.RSM_AUTORECONNECT_ON_POWER = "onPower";
  a.RSM_AUTORECONNECT_ON_POWER_OUT_OF_RANGE = "onPowerOutOfRange";
  a.SCANMODE_MULTI_BARCODE = "multi_barcode";
  a.SCANMODE_SINGLE_BARCODE = "single_barcode";
  a.SCANMODE_UDI = "udi";
  a.SCENEDETECTIONQUALIFIER_NONE = "NONE";
  a.SCENEDETECTIONQUALIFIER_PROXIMITY_SENSOR_INPUT = "PROXIMITY_SENSOR_INPUT";
  a.SHORT_OR_CODABAR = "shortOrCodabar";
  a.SOFT_ALWAYS = "softAlways";
  a.SOFT_ONCE = "softOnce";
  a.Shift_JIS = "SHIFTJIS";
  a.UCC_ALWAYS = "always";
  a.UCC_AUTO = "auto";
  a.UCC_NEVER = "never";
  a.UPCA_PREAMBLE_COUNTRY = "countryAndSystemChars";
  a.UPCA_PREAMBLE_NONE = "none";
  a.UPCA_PREAMBLE_SYSTEMCHAR = "systemChar";
  a.UPCE0_PREAMBLE_COUNTRY = "countryAndSystemChars";
  a.UPCE0_PREAMBLE_NONE = "none";
  a.UPCE0_PREAMBLE_SYSTEMCHAR = "systemChar";
  a.UPCE1_PREAMBLE_COUNTRY = "countryAndSystemChars";
  a.UPCE1_PREAMBLE_NONE = "none";
  a.UPCE1_PREAMBLE_SYSTEMCHAR = "systemChar";
  a.UPCEAN_379 = "378or379";
  a.UPCEAN_439 = "414or419or434or439";
  a.UPCEAN_979 = "978or979";
  a.UPCEAN_ALWAYS = "always";
  a.UPCEAN_AUTO = "auto";
  a.UPCEAN_NONE = "none";
  a.UPCEAN_SMART = "smart";
  a.UTF_8 = "UTF8";
  a.VF_FEEDBACK_DISABLED = "disabled";
  a.VF_FEEDBACK_ENABLED = "enabled";
  a.VF_FEEDBACK_RETICLE = "reticle";
  a.VIEWFINDER_DISABLED = "disabled";
  a.VIEWFINDER_DYNAMIC_RETICLE = "dynamicReticle";
  a.VIEWFINDER_ENABLED = "enabled";
  a.VIEWFINDER_STATIC_RETICLE = "staticReticle";
  e.createPropsProxy(a, [], b);
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    b
  );
  e.createPropsProxy(
    a,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          a.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    b
  );
  a.getId = function () {
    return a.getDefaultID();
  };
  e.createPropsProxy(
    a,
    [
      { propName: "autoEnter", propAccess: "rw" },
      { propName: "autoTab", propAccess: "rw" },
      { propName: "hapticFeedback", propAccess: "rw" },
      { propName: "linearSecurityLevel", propAccess: "rw" },
      { propName: "scanTimeout", propAccess: "rw" },
      { propName: "rasterMode", propAccess: "rw" },
      { propName: "rasterHeight", propAccess: "rw" },
      { propName: "aimingPattern", propAccess: "rw" },
      { propName: "aimType", propAccess: "rw" },
      { propName: "timedAimDuration", propAccess: "rw" },
      { propName: "sameSymbolTimeout", propAccess: "rw" },
      { propName: "differentSymbolTimeout", propAccess: "rw" },
      { propName: "digimarcDecoding", propAccess: "rw" },
      { propName: "barcodeCount", propAccess: "rw" },
      { propName: "instantReporting", propAccess: "rw" },
      { propName: "aimMode", propAccess: "rw" },
      { propName: "codeIdType", propAccess: "rw" },
      { propName: "picklistMode", propAccess: "rw" },
      { propName: "picklistEx", propAccess: "rw" },
      { propName: "scanMode", propAccess: "rw" },
      { propName: "sceneDetectionQualifier", propAccess: "rw" },
      { propName: "characterSetSelection", propAccess: "rw" },
      { propName: "autoCharacterSetFailureOption", propAccess: "rw" },
      { propName: "enableGS1", propAccess: "rw" },
      { propName: "enableHIBCC", propAccess: "rw" },
      { propName: "enableICCBBA", propAccess: "rw" },
      { propName: "viewfinderMode", propAccess: "rw" },
      { propName: "viewfinderX", propAccess: "rw" },
      { propName: "viewfinderY", propAccess: "rw" },
      { propName: "viewfinderWidth", propAccess: "rw" },
      { propName: "viewfinderHeight", propAccess: "rw" },
      { propName: "viewfinderFeedback", propAccess: "rw" },
      { propName: "viewfinderFeedbackTime", propAccess: "rw" },
      { propName: "focusMode", propAccess: "rw" },
      { propName: "illuminationBrightness", propAccess: "rw" },
      { propName: "illuminationMode", propAccess: "rw" },
      { propName: "dpmMode", propAccess: "rw" },
      { propName: "inverse1dMode", propAccess: "rw" },
      { propName: "poorQuality1dMode", propAccess: "rw" },
      { propName: "beamWidth", propAccess: "rw" },
      { propName: "dbpMode", propAccess: "rw" },
      { propName: "klasseEins", propAccess: "rw" },
      { propName: "adaptiveScanning", propAccess: "rw" },
      { propName: "bidirectionalRedundancy", propAccess: "rw" },
      { propName: "barcodeDataFormat", propAccess: "rw" },
      { propName: "dataBufferSize", propAccess: "rw" },
      { propName: "connectionIdleTimeout", propAccess: "rw" },
      { propName: "disconnectBtOnDisable", propAccess: "rw" },
      { propName: "displayBtAddressBarcodeOnEnable", propAccess: "rw" },
      { propName: "enableTimeout", propAccess: "rw" },
      { propName: "friendlyName", propAccess: "r" },
      { propName: "lcdMode", propAccess: "rw" },
      { propName: "lowBatteryScan", propAccess: "rw" },
      { propName: "triggerConnected", propAccess: "rw" },
      { propName: "disableScannerDuringNavigate", propAccess: "rw" },
      { propName: "decodeVolume", propAccess: "rw" },
      { propName: "decodeDuration", propAccess: "rw" },
      { propName: "decodeFrequency", propAccess: "rw" },
      { propName: "invalidDecodeFrequency", propAccess: "rw" },
      { propName: "decodeSound", propAccess: "rw" },
      { propName: "invalidDecodeSound", propAccess: "rw" },
      { propName: "scannerType", propAccess: "r" },
      { propName: "allDecoders", propAccess: "rw" },
      { propName: "aztec", propAccess: "rw" },
      { propName: "chinese2of5", propAccess: "rw" },
      { propName: "codabar", propAccess: "rw" },
      { propName: "codabarClsiEditing", propAccess: "rw" },
      { propName: "codabarMaxLength", propAccess: "rw" },
      { propName: "codabarMinLength", propAccess: "rw" },
      { propName: "codabarNotisEditing", propAccess: "rw" },
      { propName: "codabarRedundancy", propAccess: "rw" },
      { propName: "code11", propAccess: "rw" },
      { propName: "code11checkDigitCount", propAccess: "rw" },
      { propName: "code11maxLength", propAccess: "rw" },
      { propName: "code11minLength", propAccess: "rw" },
      { propName: "code11redundancy", propAccess: "rw" },
      { propName: "code11reportCheckDigit", propAccess: "rw" },
      { propName: "code128", propAccess: "rw" },
      { propName: "code128checkIsBtTable", propAccess: "rw" },
      { propName: "code128ean128", propAccess: "rw" },
      { propName: "code128isbt128", propAccess: "rw" },
      { propName: "code128isbt128ConcatMode", propAccess: "rw" },
      { propName: "code128maxLength", propAccess: "rw" },
      { propName: "code128minLength", propAccess: "rw" },
      { propName: "code128other128", propAccess: "rw" },
      { propName: "code128redundancy", propAccess: "rw" },
      { propName: "code128securityLevel", propAccess: "rw" },
      { propName: "compositeAb", propAccess: "rw" },
      { propName: "compositeAbUccLinkMode", propAccess: "rw" },
      {
        propName: "compositeAbUseUpcPreambleCheckDigitRules",
        propAccess: "rw",
      },
      { propName: "compositeC", propAccess: "rw" },
      { propName: "code39", propAccess: "rw" },
      { propName: "code39code32Prefix", propAccess: "rw" },
      { propName: "code39convertToCode32", propAccess: "rw" },
      { propName: "code39fullAscii", propAccess: "rw" },
      { propName: "code39maxLength", propAccess: "rw" },
      { propName: "code39minLength", propAccess: "rw" },
      { propName: "code39redundancy", propAccess: "rw" },
      { propName: "code39reportCheckDigit", propAccess: "rw" },
      { propName: "code39securityLevel", propAccess: "rw" },
      { propName: "code39verifyCheckDigit", propAccess: "rw" },
      { propName: "code93", propAccess: "rw" },
      { propName: "code93maxLength", propAccess: "rw" },
      { propName: "code93minLength", propAccess: "rw" },
      { propName: "code93redundancy", propAccess: "rw" },
      { propName: "d2of5", propAccess: "rw" },
      { propName: "d2of5maxLength", propAccess: "rw" },
      { propName: "d2of5minLength", propAccess: "rw" },
      { propName: "d2of5redundancy", propAccess: "rw" },
      { propName: "datamatrix", propAccess: "rw" },
      { propName: "dotCode", propAccess: "rw" },
      { propName: "dotCodeInverse", propAccess: "rw" },
      { propName: "dotCodeMirror", propAccess: "rw" },
      { propName: "gridMatrix", propAccess: "rw" },
      { propName: "gridMatrixInverse", propAccess: "rw" },
      { propName: "gridMatrixMirror", propAccess: "rw" },
      { propName: "ean13", propAccess: "rw" },
      { propName: "ean8", propAccess: "rw" },
      { propName: "ean8convertToEan13", propAccess: "rw" },
      { propName: "hanXin", propAccess: "rw" },
      { propName: "hanXinInverse", propAccess: "rw" },
      { propName: "i2of5", propAccess: "rw" },
      { propName: "i2of5convertToEan13", propAccess: "rw" },
      { propName: "i2of5reducedQuietZone", propAccess: "rw" },
      { propName: "i2of5febraban", propAccess: "rw" },
      { propName: "i2of5maxLength", propAccess: "rw" },
      { propName: "i2of5minLength", propAccess: "rw" },
      { propName: "i2of5redundancy", propAccess: "rw" },
      { propName: "i2of5reportCheckDigit", propAccess: "rw" },
      { propName: "i2of5verifyCheckDigit", propAccess: "rw" },
      { propName: "korean3of5", propAccess: "rw" },
      { propName: "korean3of5redundancy", propAccess: "rw" },
      { propName: "korean3of5maxLength", propAccess: "rw" },
      { propName: "korean3of5minLength", propAccess: "rw" },
      { propName: "macroPdf", propAccess: "rw" },
      { propName: "macroPdfBufferLabels", propAccess: "rw" },
      { propName: "macroPdfConvertToPdf417", propAccess: "rw" },
      { propName: "macroPdfExclusive", propAccess: "rw" },
      { propName: "macroMicroPdf", propAccess: "rw" },
      { propName: "macroMicroPdfBufferLabels", propAccess: "rw" },
      { propName: "macroMicroPdfConvertToMicroPdf", propAccess: "rw" },
      { propName: "macroMicroPdfExclusive", propAccess: "rw" },
      { propName: "macroMicroPdfReportAppendInfo", propAccess: "rw" },
      { propName: "mailMark", propAccess: "rw" },
      { propName: "matrix2of5", propAccess: "rw" },
      { propName: "matrix2of5maxLength", propAccess: "rw" },
      { propName: "matrix2of5minLength", propAccess: "rw" },
      { propName: "matrix2of5reportCheckDigit", propAccess: "rw" },
      { propName: "matrix2of5verifyCheckDigit", propAccess: "rw" },
      { propName: "maxiCode", propAccess: "rw" },
      { propName: "microPdf", propAccess: "rw" },
      { propName: "microQr", propAccess: "rw" },
      { propName: "msi", propAccess: "rw" },
      { propName: "msiCheckDigits", propAccess: "rw" },
      { propName: "msiCheckDigitScheme", propAccess: "rw" },
      { propName: "msiMaxLength", propAccess: "rw" },
      { propName: "msiMinLength", propAccess: "rw" },
      { propName: "msiRedundancy", propAccess: "rw" },
      { propName: "msiReportCheckDigit", propAccess: "rw" },
      { propName: "pdf417", propAccess: "rw" },
      { propName: "signature", propAccess: "rw" },
      { propName: "signatureImageHeight", propAccess: "rw" },
      { propName: "signatureImageWidth", propAccess: "rw" },
      { propName: "signatureImageQuality", propAccess: "rw" },
      { propName: "ausPostal", propAccess: "rw" },
      { propName: "canPostal", propAccess: "rw" },
      { propName: "dutchPostal", propAccess: "rw" },
      { propName: "japPostal", propAccess: "rw" },
      { propName: "ukPostal", propAccess: "rw" },
      { propName: "ukPostalReportCheckDigit", propAccess: "rw" },
      { propName: "us4state", propAccess: "rw" },
      { propName: "us4stateFics", propAccess: "rw" },
      { propName: "usPlanet", propAccess: "rw" },
      { propName: "usPlanetReportCheckDigit", propAccess: "rw" },
      { propName: "usPostNet", propAccess: "rw" },
      { propName: "usPostNetReportCheckDigit", propAccess: "rw" },
      { propName: "qrCode", propAccess: "rw" },
      { propName: "gs1dataBar", propAccess: "rw" },
      { propName: "gs1dataBarExpanded", propAccess: "rw" },
      { propName: "gs1dataBarLimited", propAccess: "rw" },
      { propName: "gs1LimitedSecurityLevel", propAccess: "rw" },
      { propName: "gs1QrCode", propAccess: "rw" },
      { propName: "gs1Datamatrix", propAccess: "rw" },
      { propName: "tlc39", propAccess: "rw" },
      { propName: "trioptic39", propAccess: "rw" },
      { propName: "trioptic39Redundancy", propAccess: "rw" },
      { propName: "upcEanBookland", propAccess: "rw" },
      { propName: "upcEanBooklandFormat", propAccess: "rw" },
      { propName: "upcEanConvertGs1dataBarToUpcEan", propAccess: "rw" },
      { propName: "upcEanCoupon", propAccess: "rw" },
      { propName: "upcEanCouponReport", propAccess: "rw" },
      { propName: "upcEanLinearDecode", propAccess: "rw" },
      { propName: "upcEanRandomWeightCheckDigit", propAccess: "rw" },
      { propName: "upcEanRetryCount", propAccess: "rw" },
      { propName: "upcEanSecurityLevel", propAccess: "rw" },
      { propName: "upcEanSupplemental2", propAccess: "rw" },
      { propName: "upcEanSupplemental5", propAccess: "rw" },
      { propName: "upcEanSupplementalMode", propAccess: "rw" },
      { propName: "upca", propAccess: "rw" },
      { propName: "upcaPreamble", propAccess: "rw" },
      { propName: "upcaReportCheckDigit", propAccess: "rw" },
      { propName: "upce0", propAccess: "rw" },
      { propName: "upce0convertToUpca", propAccess: "rw" },
      { propName: "upce0preamble", propAccess: "rw" },
      { propName: "upce0reportCheckDigit", propAccess: "rw" },
      { propName: "upce1", propAccess: "rw" },
      { propName: "upce1convertToUpca", propAccess: "rw" },
      { propName: "upce1preamble", propAccess: "rw" },
      { propName: "upce1reportCheckDigit", propAccess: "rw" },
      { propName: "webcode", propAccess: "rw" },
      { propName: "webcodeDecodeGtSubtype", propAccess: "rw" },
      { propName: "rsmModelNumber", propAccess: "r" },
      { propName: "rsmSerialNumber", propAccess: "r" },
      { propName: "rsmDateOfManufacture", propAccess: "r" },
      { propName: "rsmDateOfService", propAccess: "r" },
      { propName: "rsmBluetoothAddress", propAccess: "r" },
      { propName: "rsmFirmwareVersion", propAccess: "r" },
      { propName: "rsmDeviceClass", propAccess: "r" },
      { propName: "rsmBatteryStatus", propAccess: "r" },
      { propName: "rsmBatteryCapacity", propAccess: "r" },
      { propName: "rsmBatteryId", propAccess: "r" },
      { propName: "rsmBluetoothAuthentication", propAccess: "rw" },
      { propName: "rsmBluetoothEncryption", propAccess: "rw" },
      { propName: "rsmBluetoothPinCode", propAccess: "rw" },
      { propName: "rsmBluetoothPinCodeType", propAccess: "rw" },
      { propName: "rsmBluetoothReconnectionAttempts", propAccess: "rw" },
      { propName: "rsmBluetoothBeepOnReconnectAttempt", propAccess: "rw" },
      { propName: "rsmBluetoothHidAutoReconnect", propAccess: "rw" },
      { propName: "rsmBluetoothFriendlyName", propAccess: "rw" },
      { propName: "rsmBluetoothInquiryMode", propAccess: "rw" },
      { propName: "rsmBluetoothAutoReconnect", propAccess: "rw" },
      { propName: "rsmForceSavePairingBarcode", propAccess: "rw" },
      { propName: "rsmLowBatteryIndication", propAccess: "rw" },
      { propName: "rsmLowBatteryIndicationCycle", propAccess: "rw" },
      { propName: "rsmScanLineWidth", propAccess: "rw" },
      { propName: "rsmGoodScansDelay", propAccess: "rw" },
      { propName: "rsmDecodeFeedback", propAccess: "rw" },
      { propName: "rsmIgnoreCode128Usps", propAccess: "rw" },
      { propName: "rsmScanTriggerWakeup", propAccess: "rw" },
      { propName: "rsmMems", propAccess: "rw" },
      { propName: "rsmProximityEnable", propAccess: "rw" },
      { propName: "rsmProximityContinuous", propAccess: "rw" },
      { propName: "rsmProximityDistance", propAccess: "rw" },
      { propName: "rsmPagingEnable", propAccess: "rw" },
      { propName: "rsmPagingBeepSequence", propAccess: "rw" },
      { propName: "pairAfterScannerReboot", propAccess: "rw" },
      { propName: "disconnectOnExit", propAccess: "rw" },
      { propName: "connectionIdleTime", propAccess: "rw" },
      { propName: "decodeLEDFeedback", propAccess: "rw" },
      { propName: "decodeLEDTime", propAccess: "rw" },
      { propName: "decodeLEDFeedbackMode", propAccess: "rw" },
      { propName: "decodeScreenNotification", propAccess: "rw" },
      { propName: "decodeScreenNotificationTime ", propAccess: "rw" },
      { propName: "decodeScreenTranslucencyLevel", propAccess: "rw" },
      { propName: "oneDQuietZoneLevel", propAccess: "rw" },
      { propName: "poorQualityDecodeEffortLevel", propAccess: "rw" },
      { propName: "zoom", propAccess: "rw" },
      { propName: "triggerType", propAccess: "rw" },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    a,
    [
      {
        methodName: "enable",
        nativeName: "enable",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "setautoCharacterSetPreference",
        nativeName: "setautoCharacterSetPreference",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getautoCharacterSetPreference",
        nativeName: "getautoCharacterSetPreference",
        valueCallbackIndex: 0,
      },
      {
        methodName: "registerBluetoothStatus",
        nativeName: "registerBluetoothStatus",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "addConnectionListener",
        nativeName: "addConnectionListener",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "removeConnectionListener",
        nativeName: "removeConnectionListener",
        valueCallbackIndex: 0,
      },
      { methodName: "start", nativeName: "start", valueCallbackIndex: 0 },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "disable", nativeName: "disable", valueCallbackIndex: 0 },
      {
        methodName: "resetToDefault",
        nativeName: "resetToDefault",
        valueCallbackIndex: 0,
      },
      {
        methodName: "isParamSupported",
        nativeName: "isParamSupported",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getSupportedProperties",
        nativeName: "getSupportedProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "take",
        nativeName: "take",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "commandRemoteScanner",
        nativeName: "commandRemoteScanner",
        valueCallbackIndex: 1,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    b,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(a, []);
  e.namespace(c, a);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Device";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  e.createPropsProxy(c, [], a);
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "calibrate",
        nativeName: "calibrate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "suspend",
        nativeName: "suspend",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "powerOff",
        nativeName: "powerOff",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "idle",
        nativeName: "idle",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "wake",
        nativeName: "wake",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "acquirePartialWakeLock",
        nativeName: "acquirePartialWakeLock",
        valueCallbackIndex: 0,
      },
      {
        methodName: "releasePartialWakeLock",
        nativeName: "releasePartialWakeLock",
        valueCallbackIndex: 0,
      },
      {
        methodName: "reboot",
        nativeName: "reboot",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "navigationBarVisibility",
        nativeName: "navigationBarVisibility",
        valueCallbackIndex: 1,
      },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.DeviceMemory";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  e.DEVICE_MEMORY_STATUS_CRITICAL = "DEVICE_MEMORY_STATUS_CRITICAL";
  e.DEVICE_MEMORY_STATUS_LOW = "DEVICE_MEMORY_STATUS_LOW";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "startListeningPlatformMemoryWarning",
        nativeName: "startListeningPlatformMemoryWarning",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "stopListeningPlatformMemoryWarning",
        nativeName: "stopListeningPlatformMemoryWarning",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getAvailableMemory",
        nativeName: "getAvailableMemory",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getInternalStorage",
        nativeName: "getInternalStorage",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getExternalStorage",
        nativeName: "getExternalStorage",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Mediaplayer";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      { methodName: "start", nativeName: "start", valueCallbackIndex: 1 },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      {
        methodName: "startvideo",
        nativeName: "startvideo",
        valueCallbackIndex: 1,
      },
      {
        methodName: "stopvideo",
        nativeName: "stopvideo",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getAllRingtones",
        nativeName: "getAllRingtones",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "playRingTone",
        nativeName: "playRingTone",
        valueCallbackIndex: 1,
      },
      {
        methodName: "stopRingTone",
        nativeName: "stopRingTone",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Configreadwrite";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  e.createPropsProxy(c, [], a);
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "writeToConfig",
        nativeName: "writeToConfig",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "writeToTempConfig",
        nativeName: "writeToTempConfig",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "readFromTempConfig",
        nativeName: "readFromTempConfig",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "readFromOriginalConfig",
        nativeName: "readFromOriginalConfig",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Printer";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(
    d.prototype,
    [
      { propName: "ID", propAccess: "r" },
      { propName: "deviceName", propAccess: "r" },
      { propName: "printerType", propAccess: "r" },
      { propName: "deviceAddress", propAccess: "r" },
      { propName: "devicePort", propAccess: "rw" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "isConnected", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    d.prototype,
    [
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "connectWithOptions",
        nativeName: "connectWithOptions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "requestState",
        nativeName: "requestState",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "printFile",
        nativeName: "printFile",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printImageFromFile",
        nativeName: "printImageFromFile",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "printRawString",
        nativeName: "printRawString",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "enumerateSupportedControlLanguages",
        nativeName: "enumerateSupportedControlLanguages",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(d.prototype, []);
  d.CONNECTION_TYPE_ANY = "CONNECTION_TYPE_ANY";
  d.CONNECTION_TYPE_BLUETOOTH = "CONNECTION_TYPE_BLUETOOTH";
  d.CONNECTION_TYPE_ON_BOARD = "CONNECTION_TYPE_ON_BOARD";
  d.CONNECTION_TYPE_TCP = "CONNECTION_TYPE_TCP";
  d.CONNECTION_TYPE_USB = "CONNECTION_TYPE_USB";
  d.PRINTER_LANGUAGE_CPCL = "PRINTER_LANGUAGE_CPCL";
  d.PRINTER_LANGUAGE_EPS = "PRINTER_LANGUAGE_EPS";
  d.PRINTER_LANGUAGE_ZPL = "PRINTER_LANGUAGE_ZPL";
  d.PRINTER_STATE_IS_BATTERY_LOW = "PRINTER_STATE_IS_BATTERY_LOW";
  d.PRINTER_STATE_IS_COVER_OPENED = "PRINTER_STATE_IS_COVER_OPENED";
  d.PRINTER_STATE_IS_DRAWER_OPENED = "PRINTER_STATE_IS_DRAWER_OPENED";
  d.PRINTER_STATE_IS_PAPER_OUT = "PRINTER_STATE_IS_PAPER_OUT";
  d.PRINTER_STATE_IS_READY_TO_PRINT = "PRINTER_STATE_IS_READY_TO_PRINT";
  d.PRINTER_STATUS_ERROR = "PRINTER_STATUS_ERROR";
  d.PRINTER_STATUS_ERR_IO = "PRINTER_STATUS_ERR_IO";
  d.PRINTER_STATUS_ERR_MEMORY = "PRINTER_STATUS_ERR_MEMORY";
  d.PRINTER_STATUS_ERR_NETWORK = "PRINTER_STATUS_ERR_NETWORK";
  d.PRINTER_STATUS_ERR_NOT_CONNECTED = "PRINTER_STATUS_ERR_NOT_CONNECTED";
  d.PRINTER_STATUS_ERR_NOT_FOUND = "PRINTER_STATUS_ERR_NOT_FOUND";
  d.PRINTER_STATUS_ERR_PARAM = "PRINTER_STATUS_ERR_PARAM";
  d.PRINTER_STATUS_ERR_PROCESSING = "PRINTER_STATUS_ERR_PROCESSING";
  d.PRINTER_STATUS_ERR_RESPONSE = "PRINTER_STATUS_ERR_RESPONSE";
  d.PRINTER_STATUS_ERR_TIMEOUT = "PRINTER_STATUS_ERR_TIMEOUT";
  d.PRINTER_STATUS_ERR_UNSUPPORTED = "PRINTER_STATUS_ERR_UNSUPPORTED";
  d.PRINTER_STATUS_SUCCESS = "PRINTER_STATUS_SUCCESS";
  d.PRINTER_TYPE_ANY = "PRINTER_TYPE_ANY";
  d.PRINTER_TYPE_APD = "PRINTER_TYPE_APD";
  d.PRINTER_TYPE_EPSON = "PRINTER_TYPE_EPSON";
  d.PRINTER_TYPE_NATIVE = "PRINTER_TYPE_NATIVE";
  d.PRINTER_TYPE_ZEBRA = "PRINTER_TYPE_ZEBRA";
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "enumerateSupportedTypes",
        nativeName: "enumerateSupportedTypes",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "searchPrinters",
        nativeName: "searchPrinters",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "stopSearch",
        nativeName: "stopSearch",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getPrinterByID",
        nativeName: "getPrinterByID",
        valueCallbackIndex: 1,
      },
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.createPropsProxy(
    d,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          d.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  d.getId = function () {
    return d.getDefaultID();
  };
  e.createPropsProxy(
    d,
    [
      { propName: "ID", propAccess: "r" },
      { propName: "deviceName", propAccess: "r" },
      { propName: "printerType", propAccess: "r" },
      { propName: "deviceAddress", propAccess: "r" },
      { propName: "devicePort", propAccess: "rw" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "isConnected", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "connectWithOptions",
        nativeName: "connectWithOptions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "requestState",
        nativeName: "requestState",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "printFile",
        nativeName: "printFile",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printImageFromFile",
        nativeName: "printImageFromFile",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "printRawString",
        nativeName: "printRawString",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "enumerateSupportedControlLanguages",
        nativeName: "enumerateSupportedControlLanguages",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(d, []);
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.PrinterZebra";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    f.prototype,
    [
      { propName: "ID", propAccess: "r" },
      { propName: "deviceName", propAccess: "r" },
      { propName: "printerType", propAccess: "r" },
      { propName: "deviceAddress", propAccess: "r" },
      { propName: "devicePort", propAccess: "rw" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "isConnected", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    f.prototype,
    [
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "connectWithOptions",
        nativeName: "connectWithOptions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "requestState",
        nativeName: "requestState",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "printFile",
        nativeName: "printFile",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printImageFromFile",
        nativeName: "printImageFromFile",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "printRawString",
        nativeName: "printRawString",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "enumerateSupportedControlLanguages",
        nativeName: "enumerateSupportedControlLanguages",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "retrieveFileNames",
        nativeName: "retrieveFileNames",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "retrieveFileNamesWithExtensions",
        nativeName: "retrieveFileNamesWithExtensions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "sendFileContents",
        nativeName: "sendFileContents",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "printStoredFormatWithHash",
        nativeName: "printStoredFormatWithHash",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printStoredFormatWithArray",
        nativeName: "printStoredFormatWithArray",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "storeImage",
        nativeName: "storeImage",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(f.prototype, []);
  f.CONNECTION_TYPE_ANY = "CONNECTION_TYPE_ANY";
  f.CONNECTION_TYPE_BLUETOOTH = "CONNECTION_TYPE_BLUETOOTH";
  f.CONNECTION_TYPE_ON_BOARD = "CONNECTION_TYPE_ON_BOARD";
  f.CONNECTION_TYPE_TCP = "CONNECTION_TYPE_TCP";
  f.CONNECTION_TYPE_USB = "CONNECTION_TYPE_USB";
  f.DISCOVERY_MODE_DIRECTED_BROADCAST = "DISCOVERY_MODE_DIRECTED_BROADCAST";
  f.DISCOVERY_MODE_LOCAL_BROADCAST = "DISCOVERY_MODE_LOCAL_BROADCAST";
  f.DISCOVERY_MODE_MULTICAST = "DISCOVERY_MODE_MULTICAST";
  f.DISCOVERY_MODE_SUBNET_SEARCH = "DISCOVERY_MODE_SUBNET_SEARCH";
  f.ERROR_BAD_FILE_DIRECTORY_ENTRY = "ERROR_BAD_FILE_DIRECTORY_ENTRY";
  f.ERROR_INVALID_DISCOVERY_HOP_COUNT = "ERROR_INVALID_DISCOVERY_HOP_COUNT";
  f.ERROR_INVALID_FILE_NAME = "ERROR_INVALID_FILE_NAME";
  f.ERROR_INVALID_FORMAT_NAME = "ERROR_INVALID_FORMAT_NAME";
  f.ERROR_INVALID_PRINTER_DRIVE_LETTER = "ERROR_INVALID_PRINTER_DRIVE_LETTER";
  f.ERROR_INVALID_PRINTER_LANGUAGE = "ERROR_INVALID_PRINTER_LANGUAGE";
  f.ERROR_MALFORMED_FORMAT_FIELD_NUMBER = "ERROR_MALFORMED_FORMAT_FIELD_NUMBER";
  f.ERROR_MALFORMED_NETWORK_DISCOVERY_ADDRESS =
    "ERROR_MALFORMED_NETWORK_DISCOVERY_ADDRESS";
  f.ERROR_MALFORMED_PRINTER_STATUS_RESPONSE =
    "ERROR_MALFORMED_PRINTER_STATUS_RESPONSE";
  f.ERROR_NETWORK_ERROR_DURING_DISCOVERY =
    "ERROR_NETWORK_ERROR_DURING_DISCOVERY";
  f.ERROR_NO_CONNECTION = "ERROR_NO_CONNECTION";
  f.ERROR_READ_FAILURE = "ERROR_READ_FAILURE";
  f.ERROR_UNKNOWN_PRINTER_LANGUAGE = "ERROR_UNKNOWN_PRINTER_LANGUAGE";
  f.ERROR_WRITE_FAILURE = "ERROR_WRITE_FAILURE";
  f.PRINTER_LANGUAGE_CPCL = "PRINTER_LANGUAGE_CPCL";
  f.PRINTER_LANGUAGE_EPS = "PRINTER_LANGUAGE_EPS";
  f.PRINTER_LANGUAGE_ZPL = "PRINTER_LANGUAGE_ZPL";
  f.PRINTER_STATE_IS_BATTERY_LOW = "PRINTER_STATE_IS_BATTERY_LOW";
  f.PRINTER_STATE_IS_COVER_OPENED = "PRINTER_STATE_IS_COVER_OPENED";
  f.PRINTER_STATE_IS_DRAWER_OPENED = "PRINTER_STATE_IS_DRAWER_OPENED";
  f.PRINTER_STATE_IS_HEAD_COLD = "PRINTER_STATE_IS_HEAD_COLD";
  f.PRINTER_STATE_IS_HEAD_OPEN = "PRINTER_STATE_IS_HEAD_OPEN";
  f.PRINTER_STATE_IS_HEAD_TOO_HOT = "PRINTER_STATE_IS_HEAD_TOO_HOT";
  f.PRINTER_STATE_IS_PAPER_OUT = "PRINTER_STATE_IS_PAPER_OUT";
  f.PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS =
    "PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS";
  f.PRINTER_STATE_IS_PAUSED = "PRINTER_STATE_IS_PAUSED";
  f.PRINTER_STATE_IS_READY_TO_PRINT = "PRINTER_STATE_IS_READY_TO_PRINT";
  f.PRINTER_STATE_IS_RECEIVE_BUFFER_FULL =
    "PRINTER_STATE_IS_RECEIVE_BUFFER_FULL";
  f.PRINTER_STATE_IS_RIBBON_OUT = "PRINTER_STATE_IS_RIBBON_OUT";
  f.PRINTER_STATE_LABELS_REMAINING_IN_BATCH =
    "PRINTER_STATE_LABELS_REMAINING_IN_BATCH";
  f.PRINTER_STATE_LABEL_LENGTH_IN_DOTS = "PRINTER_STATE_LABEL_LENGTH_IN_DOTS";
  f.PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER =
    "PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER";
  f.PRINTER_STATE_PRINT_MODE = "PRINTER_STATE_PRINT_MODE";
  f.PRINTER_STATUS_ERROR = "PRINTER_STATUS_ERROR";
  f.PRINTER_STATUS_ERR_IO = "PRINTER_STATUS_ERR_IO";
  f.PRINTER_STATUS_ERR_MEMORY = "PRINTER_STATUS_ERR_MEMORY";
  f.PRINTER_STATUS_ERR_NETWORK = "PRINTER_STATUS_ERR_NETWORK";
  f.PRINTER_STATUS_ERR_NOT_CONNECTED = "PRINTER_STATUS_ERR_NOT_CONNECTED";
  f.PRINTER_STATUS_ERR_NOT_FOUND = "PRINTER_STATUS_ERR_NOT_FOUND";
  f.PRINTER_STATUS_ERR_PARAM = "PRINTER_STATUS_ERR_PARAM";
  f.PRINTER_STATUS_ERR_PROCESSING = "PRINTER_STATUS_ERR_PROCESSING";
  f.PRINTER_STATUS_ERR_RESPONSE = "PRINTER_STATUS_ERR_RESPONSE";
  f.PRINTER_STATUS_ERR_TIMEOUT = "PRINTER_STATUS_ERR_TIMEOUT";
  f.PRINTER_STATUS_ERR_UNSUPPORTED = "PRINTER_STATUS_ERR_UNSUPPORTED";
  f.PRINTER_STATUS_SUCCESS = "PRINTER_STATUS_SUCCESS";
  f.PRINTER_TYPE_ANY = "PRINTER_TYPE_ANY";
  f.PRINTER_TYPE_APD = "PRINTER_TYPE_APD";
  f.PRINTER_TYPE_EPSON = "PRINTER_TYPE_EPSON";
  f.PRINTER_TYPE_NATIVE = "PRINTER_TYPE_NATIVE";
  f.PRINTER_TYPE_ZEBRA = "PRINTER_TYPE_ZEBRA";
  f.PRINT_MODE_APPLICATOR = "PRINT_MODE_APPLICATOR";
  f.PRINT_MODE_CUTTER = "PRINT_MODE_CUTTER";
  f.PRINT_MODE_DELAYED_CUT = "PRINT_MODE_DELAYED_CUT";
  f.PRINT_MODE_KIOSK = "PRINT_MODE_KIOSK";
  f.PRINT_MODE_LINERLESS_PEEL = "PRINT_MODE_LINERLESS_PEEL";
  f.PRINT_MODE_LINERLESS_REWIND = "PRINT_MODE_LINERLESS_REWIND";
  f.PRINT_MODE_PARTIAL_CUTTER = "PRINT_MODE_PARTIAL_CUTTER";
  f.PRINT_MODE_PEEL_OFF = "PRINT_MODE_PEEL_OFF";
  f.PRINT_MODE_REWIND = "PRINT_MODE_REWIND";
  f.PRINT_MODE_RFID = "PRINT_MODE_RFID";
  f.PRINT_MODE_TEAR_OFF = "PRINT_MODE_TEAR_OFF";
  f.PRINT_MODE_UNKNOWN = "PRINT_MODE_UNKNOWN";
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "enumerateSupportedTypes",
        nativeName: "enumerateSupportedTypes",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "searchPrinters",
        nativeName: "searchPrinters",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "stopSearch",
        nativeName: "stopSearch",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getPrinterByID",
        nativeName: "getPrinterByID",
        valueCallbackIndex: 1,
      },
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.createPropsProxy(
    f,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          f.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  f.getId = function () {
    return f.getDefaultID();
  };
  d.createPropsProxy(
    f,
    [
      { propName: "ID", propAccess: "r" },
      { propName: "deviceName", propAccess: "r" },
      { propName: "printerType", propAccess: "r" },
      { propName: "deviceAddress", propAccess: "r" },
      { propName: "devicePort", propAccess: "rw" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "isConnected", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "connectWithOptions",
        nativeName: "connectWithOptions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "requestState",
        nativeName: "requestState",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "printFile",
        nativeName: "printFile",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printImageFromFile",
        nativeName: "printImageFromFile",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "printRawString",
        nativeName: "printRawString",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "enumerateSupportedControlLanguages",
        nativeName: "enumerateSupportedControlLanguages",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "retrieveFileNames",
        nativeName: "retrieveFileNames",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "retrieveFileNamesWithExtensions",
        nativeName: "retrieveFileNamesWithExtensions",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "sendFileContents",
        nativeName: "sendFileContents",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "printStoredFormatWithHash",
        nativeName: "printStoredFormatWithHash",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "printStoredFormatWithArray",
        nativeName: "printStoredFormatWithArray",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "storeImage",
        nativeName: "storeImage",
        persistentCallbackIndex: 4,
        valueCallbackIndex: 6,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(f, []);
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.ScreenOrientation";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  e.createPropsProxy(d, [{ propName: "autoRotate", propAccess: "rw" }], a);
  e.createMethodsProxy(
    d,
    [
      { methodName: "normal", nativeName: "normal", valueCallbackIndex: 0 },
      {
        methodName: "rightHanded",
        nativeName: "rightHanded",
        valueCallbackIndex: 0,
      },
      {
        methodName: "leftHanded",
        nativeName: "leftHanded",
        valueCallbackIndex: 0,
      },
      {
        methodName: "upsideDown",
        nativeName: "upsideDown",
        valueCallbackIndex: 0,
      },
      {
        methodName: "setScreenOrientationEvent",
        nativeName: "setScreenOrientationEvent",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Sensor";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    e.prototype,
    [
      { propName: "minimumGap", propAccess: "rw" },
      { propName: "type", propAccess: "r" },
      { propName: "status", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e.prototype,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "readData", nativeName: "readData", valueCallbackIndex: 0 },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  e.SENSOR_STATUS_ERROR = "error";
  e.SENSOR_STATUS_NOT_READY = "not_ready";
  e.SENSOR_STATUS_READY = "ready";
  e.SENSOR_STATUS_STARTED = "started";
  e.SENSOR_TYPE_ACCELEROMETER = "Accelerometer";
  e.SENSOR_TYPE_AMBIENT_LIGHT = "AmbientLight";
  e.SENSOR_TYPE_DEVICE_ORIENTATION = "DeviceOrientation";
  e.SENSOR_TYPE_ECOMPASS = "ECompass";
  e.SENSOR_TYPE_GRAVITY = "Gravity";
  e.SENSOR_TYPE_GYROSCOPE = "Gyroscope";
  e.SENSOR_TYPE_HUMIDITY = "Humidity";
  e.SENSOR_TYPE_LINEAR_ACCELERATION = "LinearAcceleration";
  e.SENSOR_TYPE_MAGNETOMETER = "Magnetometer";
  e.SENSOR_TYPE_MOTION = "Motion";
  e.SENSOR_TYPE_ORIENTATION = "Orientation";
  e.SENSOR_TYPE_PRESSURE = "Pressure";
  e.SENSOR_TYPE_PROXIMITY = "Proximity";
  e.SENSOR_TYPE_PROXIMITY_LONG_RANGE = "ProximityLongRange";
  e.SENSOR_TYPE_ROTATION = "Rotation";
  e.SENSOR_TYPE_TEMPERATURE = "Temperature";
  e.SENSOR_TYPE_TILT_ANGLE = "TiltAngle";
  d.createPropsProxy(
    e,
    [{ propName: "proximitySensorType", propAccess: "rw" }],
    a
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "makeSensorByType",
        nativeName: "makeSensorByType",
        valueCallbackIndex: 1,
      },
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.CardReader";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    e.prototype,
    [
      { propName: "pinTimeout", propAccess: "rw" },
      { propName: "pinEntry", propAccess: "rw" },
      { propName: "panData", propAccess: "rw" },
      { propName: "autoTab", propAccess: "rw" },
      { propName: "autoEnter", propAccess: "rw" },
      { propName: "moduleName", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e.prototype,
    [
      {
        methodName: "open",
        nativeName: "open",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "close", nativeName: "close", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  e.DCR7000 = "dcr7000";
  e.MSR3000 = "msr3000";
  e.MSR55 = "msr55";
  e.MSR7000 = "msr7000";
  e.MSR9000 = "msr9000";
  e.MSR9001 = "msr9001";
  e.MSR9500 = "msr9500";
  e.MSRCAMEO = "msrcameo";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.createPropsProxy(
    e,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          e.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  e.getId = function () {
    return e.getDefaultID();
  };
  d.createPropsProxy(
    e,
    [
      { propName: "pinTimeout", propAccess: "rw" },
      { propName: "pinEntry", propAccess: "rw" },
      { propName: "panData", propAccess: "rw" },
      { propName: "autoTab", propAccess: "rw" },
      { propName: "autoEnter", propAccess: "rw" },
      { propName: "moduleName", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "open",
        nativeName: "open",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "close", nativeName: "close", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e, []);
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.AudioCapture";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    f.prototype,
    [
      { propName: "source", propAccess: "rw" },
      { propName: "encoder", propAccess: "rw" },
      { propName: "maxDuration", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    f.prototype,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "cancel", nativeName: "cancel", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(f.prototype, []);
  f.ENCODER_AAC = "AAC";
  f.ENCODER_AMR_NB = "AMR_NB";
  f.ENCODER_AMR_WB = "AMR_WB";
  f.MIC = "mic";
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(f, [], a);
  d.createPropsProxy(
    f,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          f.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  f.getId = function () {
    return f.getDefaultID();
  };
  d.createPropsProxy(
    f,
    [
      { propName: "source", propAccess: "rw" },
      { propName: "encoder", propAccess: "rw" },
      { propName: "maxDuration", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "cancel", nativeName: "cancel", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(f, []);
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.LogCapture";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  e.createPropsProxy(
    c,
    [
      { propName: "excludeCategories", propAccess: "rw" },
      { propName: "maxLines", propAccess: "rw" },
    ],
    a
  );
  e.createMethodsProxy(
    c,
    [
      { methodName: "start", nativeName: "start", valueCallbackIndex: 0 },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "clear", nativeName: "clear", valueCallbackIndex: 0 },
      { methodName: "numLines", nativeName: "numLines", valueCallbackIndex: 0 },
      { methodName: "read", nativeName: "read", valueCallbackIndex: 0 },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Instrumentation";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(
    c.prototype,
    [
      {
        methodName: "simulate_key_event_code",
        nativeName: "simulate_key_event_code",
        valueCallbackIndex: 1,
      },
      {
        methodName: "simulate_key_event_string",
        nativeName: "simulate_key_event_string",
        valueCallbackIndex: 1,
      },
      {
        methodName: "simulate_touch_event",
        nativeName: "simulate_touch_event",
        valueCallbackIndex: 3,
      },
      {
        methodName: "screen_capture",
        nativeName: "screen_capture",
        valueCallbackIndex: 1,
      },
      {
        methodName: "get_allocated_memory",
        nativeName: "get_allocated_memory",
        valueCallbackIndex: 0,
      },
      {
        methodName: "delete_file",
        nativeName: "delete_file",
        valueCallbackIndex: 1,
      },
      {
        methodName: "file_exists",
        nativeName: "file_exists",
        valueCallbackIndex: 1,
      },
      {
        methodName: "re_simulate_navigation",
        nativeName: "re_simulate_navigation",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(c.prototype, []);
  e.createPropsProxy(c, [], a);
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.createPropsProxy(
    c,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          c.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  c.getId = function () {
    return c.getDefaultID();
  };
  e.createPropsProxy(c, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "simulate_key_event_code",
        nativeName: "simulate_key_event_code",
        valueCallbackIndex: 1,
      },
      {
        methodName: "simulate_key_event_string",
        nativeName: "simulate_key_event_string",
        valueCallbackIndex: 1,
      },
      {
        methodName: "simulate_touch_event",
        nativeName: "simulate_touch_event",
        valueCallbackIndex: 3,
      },
      {
        methodName: "screen_capture",
        nativeName: "screen_capture",
        valueCallbackIndex: 1,
      },
      {
        methodName: "get_allocated_memory",
        nativeName: "get_allocated_memory",
        valueCallbackIndex: 0,
      },
      {
        methodName: "delete_file",
        nativeName: "delete_file",
        valueCallbackIndex: 1,
      },
      {
        methodName: "file_exists",
        nativeName: "file_exists",
        valueCallbackIndex: 1,
      },
      {
        methodName: "re_simulate_navigation",
        nativeName: "re_simulate_navigation",
        valueCallbackIndex: 0,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(c, []);
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.ConnectionChecking";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(
    e,
    [
      { propName: "hostURL", propAccess: "r" },
      { propName: "trackConnection", propAccess: "r" },
      { propName: "timeout", propAccess: "r" },
      { propName: "pollInterval", propAccess: "r" },
      { propName: "message", propAccess: "r" },
    ],
    a
  );
  d.createMethodsProxy(e, [], a);
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.SmartCradle";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.SMART_CRADLE_FAST = "fast";
  f.SMART_CRADLE_SLOW = "slow";
  d.createPropsProxy(
    f,
    [
      { propName: "chargeState", propAccess: "rw" },
      { propName: "rowId", propAccess: "rw" },
      { propName: "columnId", propAccess: "rw" },
      { propName: "wallId", propAccess: "rw" },
      { propName: "hardwareId", propAccess: "r" },
      { propName: "partNumber", propAccess: "r" },
      { propName: "serialNumber", propAccess: "r" },
      { propName: "mfgDate", propAccess: "r" },
      { propName: "driverVersion", propAccess: "r" },
      { propName: "cApiVersion", propAccess: "r" },
      { propName: "firmwareVersion", propAccess: "r" },
    ],
    a
  );
  d.createMethodsProxy(
    f,
    [
      { methodName: "unlock", nativeName: "unlock", valueCallbackIndex: 3 },
      { methodName: "unlockEx", nativeName: "unlockEx", valueCallbackIndex: 1 },
      { methodName: "flashLed", nativeName: "flashLed", valueCallbackIndex: 1 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Camera";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(
    c.prototype,
    [
      { propName: "cameraType", propAccess: "r" },
      { propName: "maxWidth", propAccess: "r" },
      { propName: "maxHeight", propAccess: "r" },
      { propName: "supportedSizeList", propAccess: "r" },
      { propName: "desiredWidth", propAccess: "rw" },
      { propName: "desiredHeight", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
      { propName: "compressionFormat", propAccess: "rw" },
      { propName: "outputFormat", propAccess: "rw" },
      { propName: "colorModel", propAccess: "rw" },
      { propName: "enableEditing", propAccess: "rw" },
      { propName: "flashMode", propAccess: "rw" },
      { propName: "saveToDeviceGallery", propAccess: "rw" },
      { propName: "captureSound", propAccess: "rw" },
      { propName: "previewLeft", propAccess: "rw" },
      { propName: "previewTop", propAccess: "rw" },
      { propName: "previewWidth", propAccess: "rw" },
      { propName: "previewHeight", propAccess: "rw" },
      { propName: "useSystemViewfinder", propAccess: "rw" },
      { propName: "aimMode", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    c.prototype,
    [
      {
        methodName: "takePicture",
        nativeName: "takePicture",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "showPreview",
        nativeName: "showPreview",
        valueCallbackIndex: 1,
      },
      {
        methodName: "hidePreview",
        nativeName: "hidePreview",
        valueCallbackIndex: 0,
      },
      {
        methodName: "capture",
        nativeName: "capture",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(c.prototype, []);
  c.AIM_OFF = "off";
  c.AIM_ON = "on";
  c.CAMERA_TYPE_BACK = "back";
  c.CAMERA_TYPE_COLOR = "color";
  c.CAMERA_TYPE_FRONT = "front";
  c.CAMERA_TYPE_IMAGER = "imager";
  c.COLOR_MODEL_GRAYSCALE = "grayscale";
  c.COLOR_MODEL_RGB = "rgb";
  c.COMPRESSION_FORMAT_JPG = "jpg";
  c.COMPRESSION_FORMAT_PNG = "png";
  c.FLASH_AUTO = "auto";
  c.FLASH_OFF = "off";
  c.FLASH_ON = "on";
  c.FLASH_RED_EYE = "redEye";
  c.FLASH_TORCH = "torch";
  c.OUTPUT_FORMAT_DATAURI = "dataUri";
  c.OUTPUT_FORMAT_IMAGE = "image";
  c.OUTPUT_FORMAT_IMAGE_PATH = "imagePath";
  e.createPropsProxy(c, [], a);
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "getCameraByType",
        nativeName: "getCameraByType",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "choosePicture",
        nativeName: "choosePicture",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "copyImageToDeviceGallery",
        nativeName: "copyImageToDeviceGallery",
        valueCallbackIndex: 1,
      },
    ],
    a
  );
  e.createPropsProxy(
    c,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          c.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  c.getId = function () {
    return c.getDefaultID();
  };
  e.createPropsProxy(
    c,
    [
      { propName: "cameraType", propAccess: "r" },
      { propName: "maxWidth", propAccess: "r" },
      { propName: "maxHeight", propAccess: "r" },
      { propName: "supportedSizeList", propAccess: "r" },
      { propName: "desiredWidth", propAccess: "rw" },
      { propName: "desiredHeight", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
      { propName: "compressionFormat", propAccess: "rw" },
      { propName: "outputFormat", propAccess: "rw" },
      { propName: "colorModel", propAccess: "rw" },
      { propName: "enableEditing", propAccess: "rw" },
      { propName: "flashMode", propAccess: "rw" },
      { propName: "saveToDeviceGallery", propAccess: "rw" },
      { propName: "captureSound", propAccess: "rw" },
      { propName: "previewLeft", propAccess: "rw" },
      { propName: "previewTop", propAccess: "rw" },
      { propName: "previewWidth", propAccess: "rw" },
      { propName: "previewHeight", propAccess: "rw" },
      { propName: "useSystemViewfinder", propAccess: "rw" },
      { propName: "aimMode", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "takePicture",
        nativeName: "takePicture",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "showPreview",
        nativeName: "showPreview",
        valueCallbackIndex: 1,
      },
      {
        methodName: "hidePreview",
        nativeName: "hidePreview",
        valueCallbackIndex: 0,
      },
      {
        methodName: "capture",
        nativeName: "capture",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(c, []);
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Videocapture";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    e.prototype,
    [
      { propName: "duration", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
      { propName: "saveToGallery", propAccess: "rw" },
      { propName: "resolution", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e.prototype,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "cancel", nativeName: "cancel", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  e.HIGH = "high";
  e.LOW = "low";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.createPropsProxy(
    e,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          e.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  e.getId = function () {
    return e.getDefaultID();
  };
  d.createPropsProxy(
    e,
    [
      { propName: "duration", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
      { propName: "saveToGallery", propAccess: "rw" },
      { propName: "resolution", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "start",
        nativeName: "start",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "stop", nativeName: "stop", valueCallbackIndex: 0 },
      { methodName: "cancel", nativeName: "cancel", valueCallbackIndex: 0 },
      {
        methodName: "getProperty",
        nativeName: "getProperty",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getProperties",
        nativeName: "getProperties",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "getAllProperties",
        nativeName: "getAllProperties",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperty",
        nativeName: "setProperty",
        valueCallbackIndex: 2,
      },
      {
        methodName: "setProperties",
        nativeName: "setProperties",
        valueCallbackIndex: 1,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e, []);
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Shortcutgenerator";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "createShorcut",
        nativeName: "createShorcut",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "XMLParseForShortCutCreation",
        nativeName: "XMLParseForShortCutCreation",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var c = "Rho.Mx";
  var b = e.apiReqFor(c);
  function a() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (c != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(a.prototype, [], b, function () {
    return this.getId();
  });
  e.createMethodsProxy(a.prototype, [], b, function () {
    return this.getId();
  });
  e.createRawPropsProxy(a.prototype, []);
  e.createPropsProxy(a, [], b);
  e.createMethodsProxy(a, [], b);
  e.namespace(c, a);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Sip";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      { methodName: "show", nativeName: "show", valueCallbackIndex: 0 },
      { methodName: "hide", nativeName: "hide", valueCallbackIndex: 0 },
      {
        methodName: "disableAllIME",
        nativeName: "disableAllIME",
        valueCallbackIndex: 0,
      },
      {
        methodName: "resetToDefault",
        nativeName: "resetToDefault",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.EzNFC";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(e.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(e.prototype, []);
  d.createPropsProxy(
    e,
    [
      { propName: "isSupported", propAccess: "rw" },
      { propName: "isEnabled", propAccess: "rw" },
    ],
    a
  );
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "enableAdapter",
        nativeName: "enableAdapter",
        valueCallbackIndex: 0,
      },
      {
        methodName: "enableRead",
        nativeName: "enableRead",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "disableRead",
        nativeName: "disableRead",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Remotenotification";
  var a = d.apiReqFor(b);
  function e() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(
    e.prototype,
    [
      { propName: "isConnected", propAccess: "r" },
      { propName: "isEnabled", propAccess: "r" },
      { propName: "isDefaultDevice", propAccess: "r" },
      { propName: "isLEDSupported", propAccess: "r" },
      { propName: "isBeepSupported", propAccess: "r" },
      { propName: "isVibrateSupported", propAccess: "r" },
      { propName: "modelNumber", propAccess: "r" },
      { propName: "friendlyName", propAccess: "r" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "deviceType", propAccess: "r" },
      { propName: "ledcolor", propAccess: "rw" },
      { propName: "ledonTime", propAccess: "rw" },
      { propName: "ledoffTime", propAccess: "rw" },
      { propName: "ledrepeatCount", propAccess: "rw" },
      { propName: "vibrationDuration", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e.prototype,
    [
      { methodName: "enable", nativeName: "enable", valueCallbackIndex: 0 },
      {
        methodName: "clearproperties",
        nativeName: "clearproperties",
        valueCallbackIndex: 0,
      },
      { methodName: "disable", nativeName: "disable", valueCallbackIndex: 0 },
      {
        methodName: "cancelNotification",
        nativeName: "cancelNotification",
        valueCallbackIndex: 0,
      },
      { methodName: "notify", nativeName: "notify", valueCallbackIndex: 1 },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e.prototype, []);
  e.BLUETOOTH_SSI = "BLUETOOTH_SSI";
  e.IMAGER = "IMAGER";
  e.PLUGGABLE = "PLUGGABLE";
  e.UNDEFINED = "UNDEFINED";
  e.VIBRATOR = "VIBRATOR";
  d.createPropsProxy(e, [], a);
  d.createMethodsProxy(
    e,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  d.createPropsProxy(
    e,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          e.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  e.getId = function () {
    return e.getDefaultID();
  };
  d.createPropsProxy(
    e,
    [
      { propName: "isConnected", propAccess: "r" },
      { propName: "isEnabled", propAccess: "r" },
      { propName: "isDefaultDevice", propAccess: "r" },
      { propName: "isLEDSupported", propAccess: "r" },
      { propName: "isBeepSupported", propAccess: "r" },
      { propName: "isVibrateSupported", propAccess: "r" },
      { propName: "modelNumber", propAccess: "r" },
      { propName: "friendlyName", propAccess: "r" },
      { propName: "connectionType", propAccess: "r" },
      { propName: "deviceType", propAccess: "r" },
      { propName: "ledcolor", propAccess: "rw" },
      { propName: "ledonTime", propAccess: "rw" },
      { propName: "ledoffTime", propAccess: "rw" },
      { propName: "ledrepeatCount", propAccess: "rw" },
      { propName: "vibrationDuration", propAccess: "rw" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createMethodsProxy(
    e,
    [
      { methodName: "enable", nativeName: "enable", valueCallbackIndex: 0 },
      {
        methodName: "clearproperties",
        nativeName: "clearproperties",
        valueCallbackIndex: 0,
      },
      { methodName: "disable", nativeName: "disable", valueCallbackIndex: 0 },
      {
        methodName: "cancelNotification",
        nativeName: "cancelNotification",
        valueCallbackIndex: 0,
      },
      { methodName: "notify", nativeName: "notify", valueCallbackIndex: 1 },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(e, []);
  d.namespace(b, e);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Ekb";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        valueCallbackIndex: 0,
      },
      { methodName: "disable", nativeName: "disable", valueCallbackIndex: 0 },
      { methodName: "enable", nativeName: "enable", valueCallbackIndex: 0 },
      {
        methodName: "setLayout",
        nativeName: "setLayout",
        valueCallbackIndex: 2,
      },
      {
        methodName: "clearLayout",
        nativeName: "clearLayout",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  e.createPropsProxy(
    d,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          d.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  d.getId = function () {
    return d.getDefaultID();
  };
  e.createPropsProxy(d, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d, []);
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.Bluetooth";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(d.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(d.prototype, []);
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "readData",
        nativeName: "readData",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "writeData",
        nativeName: "writeData",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "connect",
        nativeName: "connect",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      {
        methodName: "disconnect",
        nativeName: "disconnect",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, e) {
  var b = "Rho.SerialComm";
  var a = e.apiReqFor(b);
  function d() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(
    d.prototype,
    [
      { propName: "baudRates", propAccess: "rw" },
      { propName: "dataBit", propAccess: "rw" },
      { propName: "flowControlMode", propAccess: "rw" },
      { propName: "ParityBit", propAccess: "rw" },
      { propName: "stopBit", propAccess: "rw" },
      { propName: "friendlyName", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    d.prototype,
    [
      {
        methodName: "enable",
        nativeName: "enable",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "disable",
        nativeName: "disable",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "read",
        nativeName: "read",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "write",
        nativeName: "write",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(d.prototype, []);
  d.BR_115200 = "BR_115200";
  d.BR_1200 = "BR_1200";
  d.BR_14400 = "BR_14400";
  d.BR_19200 = "BR_19200";
  d.BR_230400 = "BR_230400";
  d.BR_2400 = "BR_2400";
  d.BR_28800 = "BR_28800";
  d.BR_300 = "BR_300";
  d.BR_38400 = "BR_38400";
  d.BR_460800 = "BR_460800";
  d.BR_4800 = "BR_4800";
  d.BR_57600 = "BR_57600";
  d.BR_921600 = "BR_921600";
  d.BR_9600 = "BR_9600";
  d.DSR_DTR = "DSR_DTR";
  d.EIGHT = "EIGHT";
  d.EVEN = "EVEN";
  d.MARK = "MARK";
  d.NONE = "NONE";
  d.ODD = "ODD";
  d.ONE = "ONE";
  d.ONE_AND_HALF = "ONE_AND_HALF";
  d.RTS_CTS = "RTS_CTS";
  d.SEVEN = "SEVEN";
  d.SPACE = "SPACE";
  d.TWO = "TWO";
  d.XON_XOFF = "XON_XOFF";
  e.createPropsProxy(d, [], a);
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "enumerate",
        nativeName: "enumerate",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.createPropsProxy(
    d,
    [
      {
        propName: "defaultInstance:getDefault:setDefault",
        propAccess: "rw",
        customSet: function (g) {
          if (!g || "function" != typeof g.getId) {
            throw "Default object should provide getId method!";
          }
          d.setDefaultID(g.getId());
        },
      },
      { propName: "defaultID:getDefaultID:setDefaultID", propAccess: "rw" },
    ],
    a
  );
  d.getId = function () {
    return d.getDefaultID();
  };
  e.createPropsProxy(
    d,
    [
      { propName: "baudRates", propAccess: "rw" },
      { propName: "dataBit", propAccess: "rw" },
      { propName: "flowControlMode", propAccess: "rw" },
      { propName: "ParityBit", propAccess: "rw" },
      { propName: "stopBit", propAccess: "rw" },
      { propName: "friendlyName", propAccess: "r" },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createMethodsProxy(
    d,
    [
      {
        methodName: "enable",
        nativeName: "enable",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "disable",
        nativeName: "disable",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "read",
        nativeName: "read",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "write",
        nativeName: "write",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  e.createRawPropsProxy(d, []);
  e.namespace(b, d);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.Database";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
      this.initialize.apply(this, arguments);
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(
    f.prototype,
    [
      {
        methodName: "initialize",
        nativeName: "initialize",
        valueCallbackIndex: 2,
      },
      { methodName: "close", nativeName: "close", valueCallbackIndex: 0 },
      {
        methodName: "startTransaction",
        nativeName: "startTransaction",
        valueCallbackIndex: 0,
      },
      {
        methodName: "executeSql",
        nativeName: "executeSql",
        valueCallbackIndex: 2,
      },
      {
        methodName: "executeBatchSql",
        nativeName: "executeBatchSql",
        valueCallbackIndex: 1,
      },
      {
        methodName: "isTableExist",
        nativeName: "isTableExist",
        valueCallbackIndex: 1,
      },
      {
        methodName: "destroyTable",
        nativeName: "destroyTable",
        valueCallbackIndex: 1,
      },
      {
        methodName: "destroyTables",
        nativeName: "destroyTables",
        valueCallbackIndex: 1,
      },
      {
        methodName: "commitTransaction",
        nativeName: "commitTransaction",
        valueCallbackIndex: 0,
      },
      {
        methodName: "rollbackTransaction",
        nativeName: "rollbackTransaction",
        valueCallbackIndex: 0,
      },
      { methodName: "lockDb", nativeName: "lockDb", valueCallbackIndex: 0 },
      { methodName: "unlockDb", nativeName: "unlockDb", valueCallbackIndex: 0 },
    ],
    a,
    function () {
      return this.getId();
    }
  );
  d.createRawPropsProxy(f.prototype, []);
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(f, [], a);
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.Signature";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  c.COMPRESSION_FORMAT_BMP = "bmp";
  c.COMPRESSION_FORMAT_JPG = "jpg";
  c.COMPRESSION_FORMAT_PNG = "png";
  c.OUTPUT_FORMAT_DATAURI = "dataUri";
  c.OUTPUT_FORMAT_IMAGE = "image";
  e.createPropsProxy(
    c,
    [
      { propName: "compressionFormat", propAccess: "rw" },
      { propName: "outputFormat", propAccess: "rw" },
      { propName: "fileName", propAccess: "rw" },
      { propName: "border", propAccess: "rw" },
      { propName: "penColor", propAccess: "rw" },
      { propName: "penWidth", propAccess: "rw" },
      { propName: "bgColor", propAccess: "rw" },
      { propName: "left", propAccess: "rw" },
      { propName: "top", propAccess: "rw" },
      { propName: "width", propAccess: "rw" },
      { propName: "height", propAccess: "rw" },
    ],
    a
  );
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "takeFullScreen",
        nativeName: "takeFullScreen",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      { methodName: "show", nativeName: "show", valueCallbackIndex: 1 },
      {
        methodName: "capture",
        nativeName: "capture",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "clear", nativeName: "clear", valueCallbackIndex: 0 },
      { methodName: "hide", nativeName: "hide", valueCallbackIndex: 0 },
      {
        methodName: "setVectorCallback",
        nativeName: "setVectorCallback",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.Battery";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.BATTERY_LAYOUT_DOWN = "down";
  f.BATTERY_LAYOUT_LEFT = "left";
  f.BATTERY_LAYOUT_RIGHT = "right";
  f.BATTERY_LAYOUT_UP = "up";
  f.BATTERY_TRIGGER_PERIODIC = "periodic";
  f.BATTERY_TRIGGER_SYSTEM = "system";
  f.SMART_BATTERY_HEALTHY = "healthy";
  f.SMART_BATTERY_UNHEALTHY = "unhealthy";
  f.SMART_BATTERY_UNKNOWN = "unknown";
  d.createPropsProxy(
    f,
    [
      { propName: "refreshInterval", propAccess: "rw" },
      { propName: "tripDuration", propAccess: "rw" },
      { propName: "averageCurrentConsumption", propAccess: "rw" },
    ],
    a
  );
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "batteryStatus",
        nativeName: "batteryStatus",
        persistentCallbackIndex: 1,
        valueCallbackIndex: 3,
      },
      {
        methodName: "stopBatteryStatus",
        nativeName: "stopBatteryStatus",
        valueCallbackIndex: 0,
      },
      {
        methodName: "smartBatteryStatus",
        nativeName: "smartBatteryStatus",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "batteryDiagnostics",
        nativeName: "batteryDiagnostics",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      { methodName: "showIcon", nativeName: "showIcon", valueCallbackIndex: 1 },
      { methodName: "hideIcon", nativeName: "hideIcon", valueCallbackIndex: 0 },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.KeyState";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  d.createPropsProxy(f, [], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "showStates",
        nativeName: "showStates",
        valueCallbackIndex: 1,
      },
      {
        methodName: "hideStates",
        nativeName: "hideStates",
        valueCallbackIndex: 0,
      },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (e, c, d) {
  var b = "Rho.SignalIndicators";
  var a = d.apiReqFor(b);
  function f() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][d.rhoIdParam()]) {
      if (b != arguments[0][d.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][d.rhoIdParam()];
    } else {
      g = d.nextId();
    }
  }
  d.createPropsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createMethodsProxy(f.prototype, [], a, function () {
    return this.getId();
  });
  d.createRawPropsProxy(f.prototype, []);
  f.SIGNAL_LAYOUT_DOWN = "down";
  f.SIGNAL_LAYOUT_LEFT = "left";
  f.SIGNAL_LAYOUT_RIGHT = "right";
  f.SIGNAL_LAYOUT_UP = "up";
  d.createPropsProxy(f, [{ propName: "refreshInterval", propAccess: "rw" }], a);
  d.createMethodsProxy(
    f,
    [
      {
        methodName: "wlanStatus",
        nativeName: "wlanStatus",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
      {
        methodName: "stopWlanStatus",
        nativeName: "stopWlanStatus",
        valueCallbackIndex: 0,
      },
      { methodName: "showIcon", nativeName: "showIcon", valueCallbackIndex: 1 },
      { methodName: "hideIcon", nativeName: "hideIcon", valueCallbackIndex: 0 },
    ],
    a
  );
  d.namespace(b, f);
})(Rho.jQuery, Rho, Rho.util);
(function (f, d, e) {
  var b = "Rho.KeyCapture";
  var a = e.apiReqFor(b);
  function c() {
    var g = null;
    this.getId = function () {
      return g;
    };
    if (1 == arguments.length && arguments[0][e.rhoIdParam()]) {
      if (b != arguments[0][e.rhoClassParam()]) {
        throw "Wrong class instantiation!";
      }
      g = arguments[0][e.rhoIdParam()];
    } else {
      g = e.nextId();
    }
  }
  e.createPropsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createMethodsProxy(c.prototype, [], a, function () {
    return this.getId();
  });
  e.createRawPropsProxy(c.prototype, []);
  c.IPHONE_VOLUME_DOWN = 11;
  c.IPHONE_VOLUME_UP = 10;
  e.createPropsProxy(c, [{ propName: "homeKeyValue", propAccess: "rw" }], a);
  e.createMethodsProxy(
    c,
    [
      {
        methodName: "captureKey",
        nativeName: "captureKey",
        persistentCallbackIndex: 2,
        valueCallbackIndex: 4,
      },
      { methodName: "remapKey", nativeName: "remapKey", valueCallbackIndex: 2 },
      {
        methodName: "captureTrigger",
        nativeName: "captureTrigger",
        persistentCallbackIndex: 0,
        valueCallbackIndex: 2,
      },
    ],
    a
  );
  e.namespace(b, c);
})(Rho.jQuery, Rho, Rho.util);
(function (f, c, d) {
  var b = "Rho.Application";
  var a = d.apiReqFor(b);
  var e = {};
  d.createPropsProxy(
    Rho.Application,
    [
      {
        propName: "defaultNativeMenu",
        propAccess: "r",
        customGet: function () {
          return [
            { label: "Home", action: "home" },
            { label: "Refresh", action: "refresh" },
            { label: "Sync", action: "sync" },
            { label: "Settings", action: "options" },
            { label: "Log", action: "log" },
            { label: "separator", action: "" },
            { label: "Exit", action: "close" },
          ];
        },
      },
    ],
    a
  );
  function g(h) {
    applicationEvent = h.applicationEvent;
    eventData = h.eventData;
    if (applicationEvent == Rho.Application.APP_EVENT_UICREATED) {
      console.log("AppEvent: " + applicationEvent);
      start_url = Rho.Application.startURI;
      if (!start_url) {
        start_url = "";
      }
      if (Rho.System.platform != Rho.System.PLATFORM_WP8) {
        invalid_security_token_start_path =
          Rho.Application.invalidSecurityTokenStartPath;
        if (Rho.Application.securityTokenNotPassed) {
          if (
            invalid_security_token_start_path &&
            invalid_security_token_start_path.length() > 0
          ) {
            start_url = invalid_security_token_start_path;
          } else {
            Rho.Log.fatalError(
              "processApplicationEvent: security_token is not passed - application will closed",
              "EROOR"
            );
            Rho.System.exit();
          }
        }
      }
      console.log("on_ui_created.navigate to start url: " + start_url);
      Rho.WebView.navigate(start_url);
    } else {
      if (applicationEvent == Rho.Application.APP_EVENT_UIDESTROYED) {
        console.log("AppEvent: " + applicationEvent);
      } else {
        if (applicationEvent == Rho.Application.APP_EVENT_CONFIGCONFLICT) {
          console.log("AppEvent: " + applicationEvent);
        } else {
          if (applicationEvent == Rho.Application.APP_EVENT_DBMIGRATESOURCE) {
            console.log("AppEvent: " + applicationEvent);
            console.log(
              "default on_migrate_source - do nothing; old_version :" +
                eventData.old_version +
                "; new_src : " +
                eventData.new_src
            );
            return true;
          } else {
            if (applicationEvent == Rho.Application.APP_EVENT_SYNCUSERCHANGED) {
              Rho.ORM.databaseFullReset(false, false);
            }
          }
        }
      }
    }
  }
  var e = {
    processApplicationEvent: function (h) {
      g(h);
    },
  };
  d.namespace(b, e, true);
})(Rho.jQuery, Rho, Rho.util);
(function (d, a, b) {
  Rho.NewORM.addModel = function (g, e) {
    var f = new Rho.NewORMModel(g);
    e(f);
    f.initModel();
    return f;
  };
  Rho.NewORM.getModel = function (e) {
    return Rho.NewORMModel.getModel(e);
  };
  Rho.NewORMModel.prototype._normalize_complex_conditions = function (f, j) {
    if (!f) {
      return ["", []];
    }
    j = j || "AND";
    if (Object.prototype.toString.call(f) === "[object Array]") {
      var i = new Array();
      var h = "";
      for (var e in f) {
        if (h.length > 0) {
          h += " " + j + " ";
        }
        if (e.hasOwnProperty("conditions")) {
          var g = this._normalize_complex_conditions(e.conditions, e.op);
        } else {
          var g = this._normalize_hash_condition(e, "AND");
        }
        h += "(" + g[0] + ")";
        i = i.concat(g[1]);
      }
      return [h, i];
    } else {
      return this._normalize_hash_condition(f, j);
    }
  };
  Rho.NewORMModel.prototype._normalize_hash_condition = function (m, j) {
    if (m.hasOwnProperty("attrib")) {
      var e = "=";
      var f = "";
      var n = "";
      var h = "";
      for (var i in m) {
        switch (i) {
          case "op":
            e = m[i];
            break;
          case "func":
            f = m[i];
            break;
          case "attrib":
            n = m[i];
            break;
          case "value":
          case "values":
            h = m[i];
            break;
        }
      }
      if (h instanceof String) {
        h = [h];
      }
      k = this.buildComplexWhereCond(n, h, e, f);
      return [k[0], k.slice(1)];
    } else {
      var l = "";
      var g = new Array();
      for (var i in m) {
        var k = this.buildComplexWhereCond(i, [m[i]], "=", "");
        if (l.length > 0) {
          l += " " + j + " ";
        }
        l += k[0];
        g = g.concat(k.slice(1));
      }
      return [l, g];
    }
  };
  Rho.NewORMModel.prototype._normalize_conditions = function (g, f, h) {
    if (!h) {
      var e;
      if (!f) {
        e = this.buildSimpleWhereCond(g, []);
        return [e[0], e.slice(1)];
      } else {
        if (Object.prototype.toString.call(f) === "[object String]") {
          e = this.buildSimpleWhereCond(g, [f]);
          return [e[0], e.slice(1)];
        } else {
          if (Object.prototype.toString.call(f) === "[object Array]") {
            e = this.buildSimpleWhereCond(g, f);
            return [e[0], e.slice(1)];
          } else {
            return this._normalize_complex_conditions(f, "AND");
          }
        }
      }
    }
    return this._normalize_complex_conditions(f, h);
  };
  Rho.NewORMModel.prototype._normalize_args_for_find = function (l, n, k, e) {
    var f = this.buildFindLimits(l, n);
    for (var m in f) {
      k[m] = f[m];
    }
    var h = n.orderdir || [];
    var g = n.order || [];
    if (Object.prototype.toString.call(h) === "[object String]") {
      h = [h];
    }
    if (Object.prototype.toString.call(g) === "[object String]") {
      g = [g];
    }
    e.order = this.buildFindOrder(g, h);
    var j = n.select || [];
    if (Object.prototype.toString.call(n.conditions) === "[object String]") {
      j = [j];
    }
    e.select = j;
    var i = this._normalize_conditions(l, n.conditions, n.op);
    k.conditions = i[0] || "";
    e.quests = i[1] || [];
  };
  Rho.NewORMModel.prototype.find = function (l, n) {
    l = l || "all";
    n = n || {};
    var h;
    if (this.fixed_schema) {
      var e = {};
      var k = {};
      this._normalize_args_for_find(l, n, k, e);
      h = this.findObjects(l, k, e.quests, e.select, e.order);
    } else {
      k = {};
      var f = this.buildFindLimits(l, n);
      for (var m in f) {
        k[m] = f[m];
      }
      var j = n.select || [];
      if (Object.prototype.toString.call(n.conditions) === "[object String]") {
        j = [j];
      }
      var i = n.orderdir || [];
      var g = n.order || [];
      if (Object.prototype.toString.call(i) === "[object String]") {
        i = [i];
      }
      if (Object.prototype.toString.call(g) === "[object String]") {
        g = [g];
      }
      k.order = this.buildFindOrderString(g, i);
      k.op = n.op || "AND";
      if (Object.prototype.toString.call(n.conditions) === "[object Object]") {
        h = this.findObjectsPropertyBagByCondHash(l, n.conditions, k, j);
      } else {
        n.conditions = n.conditions || [""];
        n.quests = [];
        if (Object.prototype.toString.call(n.conditions) === "[object Array]") {
          n.quests = n.conditions.slice(1);
          n.conditions = n.conditions[0];
        }
        h = this.findObjectsPropertyBagByCondArray(
          l,
          n.conditions,
          n.quests,
          k,
          j
        );
      }
    }
    switch (l) {
      case "all":
        return this._wrapORMInstances(h);
      case "count":
        return h;
      case "first":
      default:
        return this._wrapORMInstance(h[0]);
    }
  };
  Rho.NewORMModel.prototype.findBySql = function (f) {
    var e = this.find_by_sql(f);
    return this._wrapORMInstances(e);
  };
  Rho.NewORMModel.prototype.paginate = function (e) {
    e.page = e.page || 0;
    e.per_page = e.per_page || 10;
    e.offset = e.page * e.per_page;
    return this.find("all", e);
  };
  Rho.NewORMModel.prototype.delete_all = function (f) {
    var f = f || {};
    if (f.conditions == undefined) {
      f.conditions = {};
    }
    if (this.fixed_schema) {
      var j = {};
      var e = {};
      this._normalize_args_for_find("all", f, e, j);
      return this.deleteObjects(e, j.quests);
    } else {
      var e = {};
      var g = this.buildFindLimits("all", f);
      for (var h in g) {
        e[h] = g[h];
      }
      e.op = f.op || "AND";
      if (Object.prototype.toString.call(f.conditions) === "[object Object]") {
        return this.deleteObjectsPropertyBagByCondHash(f.conditions, e);
      } else {
        var i = f.conditions || [""];
        var k = [];
        if (Object.prototype.toString.call(f.conditions) === "[object Array]") {
          k = f.conditions.slice(1);
          i = f.conditions[0];
        }
        return this.deleteObjectsPropertyBagByCondArray(i, k, e);
      }
    }
  };
  Rho.NewORMModel.prototype.deleteAll = function (e) {
    return this.delete_all(e);
  };
  Rho.NewORMModel.prototype._wrapORMInstance = function (e) {
    if (!e) {
      return undefined;
    }
    var f = new c(this, e);
    return f;
  };
  Rho.NewORMModel.prototype._wrapORMInstances = function (h) {
    var f = [];
    for (var g = 0; g < h.length; g++) {
      var e = new c(this, h[g]);
      f.push(e);
    }
    return f;
  };
  Rho.NewORMModel.prototype.make = function (e) {
    var f = new c(this, this.createInstance(e));
    return f;
  };
  Rho.NewORMModel.prototype.count = function () {
    return this.getCount();
  };
  Rho.NewORMModel.prototype.create = function (e) {
    var f = new c(this, this.createObject(e));
    return f;
  };
  var c = function (e, g) {
    for (var f in g) {
      this[f] = g[f];
    }
    this.source_id = e.source_id;
    Object.defineProperty(this, "_klass_model", {
      value: function () {
        return e;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "vars", {
      value: function () {
        var i = {};
        for (var h in this) {
          i[h] = this[h];
        }
        return i;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "get", {
      value: function (h) {
        return this[h];
      },
      enumerable: false,
    });
    Object.defineProperty(this, "has", {
      value: function (h) {
        return this.hasOwnProperty(h);
      },
      enumerable: false,
    });
    Object.defineProperty(this, "set", {
      value: function (i, h) {
        this[i] = h;
        return this;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "updateAttributes", {
      value: function (h) {
        var j = this._klass_model().updateObject(this.object, this, h);
        for (var i in j) {
          this[i] = j[i];
        }
        return this;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "update_attributes", {
      value: function (h) {
        var j = this._klass_model().updateObject(this.object, this, h);
        for (var i in j) {
          this[i] = j[i];
        }
        return this;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "save", {
      value: function () {
        var i = this._klass_model().saveObject(this.object, this);
        for (var h in i) {
          this[h] = i[h];
        }
        return this;
      },
      enumerable: false,
    });
    Object.defineProperty(this, "destroy", {
      value: function () {
        this._klass_model().deleteObject(this.object);
        return this;
      },
      enumerable: false,
    });
  };
  Rho.NewORM.dbPartitions = {};
  Rho.NewORM.dbConnection = function (f) {
    var h = Rho.Application.databaseFilePath(f);
    var g = Rho.NewORM.getDbPartitions();
    var e;
    if (g && g[f]) {
      e = g[f];
    } else {
      e = new Rho.Database(h, f);
      g[f] = e;
    }
    return e;
  };
  Rho.NewORM.getDbPartitions = function () {
    return Rho.NewORM.dbPartitions;
  };
  Rho.NewORM.clear = function () {
    Rho.NewORMModel.clear();
  };
  if (Rho.NewORM.useNewOrm()) {
    console.log("Replacing Old Rho.ORM with new one!!!");
    Rho.ORM = Rho.NewORM;
    Rho.ORMHelper = Rho.NewORM;
    Rho.ORMModel = Rho.NewORMModel;
    Rho.ORM.dbConnection("local");
    Rho.ORM.dbConnection("user");
    Rho.ORM.dbConnection("app");
  }
})(Rho.jQuery, Rho, Rho.util);

export default EB;
