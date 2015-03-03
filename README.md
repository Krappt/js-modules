# AJAX Service

Данный модуль предназначен для отправки кроссдоменных AJAX запросов. 

## Поддерживаемые браузеры

* IE8+
* Chrome 1.0+
* FireFox 1.0+
* Safari 1.2+
* Opera 8.01+

## Вызов

`KrapptUtils.AjaxService.call(name, params, method, callback)`

* name (string) - название метода.
* params (object) - параметры запроса.
* method (string) - тип метода (GET, POST, DELETE, PUT).
* callback (function) - функция колбека.

# Custom events

Данный модуль предназначен для реализации пользовательских событий. 

Логика работы следующая: 

Модуль инициализируется в нужной области видимости (scope) и добавляется в общий пулл, после вызова какой-либо функции, модуль проводит поиск необходимой функции в каждом элементе пулла.

## Вызов

`
KrapptUtils.CustomEvent.subscribe(this); //подпись на событие
KrapptUtils.CustomEvent.publish({event: type, data: data}) //вызов событие. event(string) -  название события, data (*) - какие-либо данные для передачи;
`