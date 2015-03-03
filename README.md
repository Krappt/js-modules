# AJAX Service

Данный модуль предназначен для отправки кроссдоменных AJAX запросов. 

## Поддерживаемые браузеры

* IE8+
* Chrome 1.0+
* FireFox 1.0+
* Safari 1.2+

## Вызов

`KrapptUtils.AjaxService.call(name, params, method, callback)`

* name (string) - название метода.
* params (object) - параметры запроса.
* method (string) - тип метода (GET, POST, DELETE, PUT).
* callback (function) - функция колбека.