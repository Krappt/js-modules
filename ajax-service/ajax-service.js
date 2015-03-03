var KrapptUtils = {};

(function (KrapptUtils) {
    function AjaxService() {

        AjaxService.apiURL = "";
        
        AjaxService.call = function (url, params, method, callback) {
            var stringParam = "";
            if (!params) params = {};

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    var isArr = Object.prototype.toString.call(value) == '[object Array]';
                    if (isArr || typeof value == "object") value = JSON.stringify(value);
                    if (stringParam.length > 0) stringParam += "&";
                    stringParam += key + '=' + encodeURIComponent(value);
                }
            }

            url = AjaxService.apiURL + url;

            AjaxService.request(url, stringParam, method, function (responseText) {
                if (responseText.length > 0) var response = JSON.parse(responseText);
                callback(response)
            });

        };

        AjaxService.createCrossDomainRequest = function (isOldIE) {
            var request;
            if (isOldIE) {
                request = new window.XDomainRequest();
            }
            else {
                request = new XMLHttpRequest();
            }
            return request;
        };

        AjaxService.request = function (url, stringParam, method, callback, requestCount) {
            var isOldIE = false;
            var baseUrl = url;
            if (!requestCount) requestCount = 1;
            if (navigator.appName.indexOf("Internet Explorer") != -1) isOldIE = navigator.appVersion.indexOf("MSIE 9") > 0 || navigator.appVersion.indexOf("MSIE 8") > 0;

            var invocation = AjaxService.createCrossDomainRequest(isOldIE);

            var output = function outputResult() {
                callback(invocation.responseText);
            };
            var error = function () {
                var status = invocation.status;
                var readyState = invocation.readyState;
                if (status == 0 && readyState == 4 && requestCount < 5) {
                    requestCount++;
                    AjaxService.request(baseUrl, stringParam, method, callback, requestCount);
                }
                else if (url.indexOf("audit-error") == -1) {
                    console.log("Request error: " + url + " with params: " + stringParam +
                    "\nstatus text: " + invocation.statusText + "\nstatus: " + status + "\nresponse: " + invocation.response + "\nready state: " + readyState)
                }
                else invocation = null;
            };

            if (invocation) {
                if (isOldIE) {
                    if (stringParam.indexOf("date=") == -1 && stringParam.length > 0) stringParam += "&date=" + Math.round((new Date()).getTime() / 1000);
                    else if (stringParam.indexOf("date=") == -1 && stringParam.length == 0) {
                        stringParam += "date=" + Math.round((new Date()).getTime() / 1000);
                    }
                    invocation.onload = output;
                    invocation.onerror = error;
                    invocation.timeout = 10000;
                    invocation.ontimeout = function () {
                    };
                    invocation.onprogress = function () {
                    };
                    invocation.open("GET", url + '?' + stringParam, true);
                    invocation.send();
                }
                else {
                    if (method == "GET" && stringParam != null) url += "?" + stringParam;

                    invocation.open(method, url, true);
                    invocation.timeout = 10000;
                    invocation.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    invocation.onreadystatechange = function () {
                        if (invocation.readyState == 4) {
                            if (invocation.status in AjaxService.acceptible_statuses) output();
                            else error();
                        }
                    };
                    invocation.ontimeout = function () {
                    };
                    invocation.onprogress = function () {
                    };
                    if (method != "GET") invocation.send(stringParam);
                    else invocation.send();
                }
            }
            else {
                console.log("No Invocation TookPlace At All");
            }
        };

        return AjaxService;
    }

    KrapptUtils.AjaxService = AjaxService();
})(KrapptUtils);