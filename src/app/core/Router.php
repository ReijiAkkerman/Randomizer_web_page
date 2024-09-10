<?php
    namespace project\core;

    class Router {
        public string $controller;
        public string $method;
        public array $args;
        public static string $folder;

        public function __construct() {
            $this->args = [];
            $this->getRequestElements();
        }

        public function action(): void {
            if($this->args) {
                (new $this->controller)->{$this->method}($this->args);
            }
            else {
                (new $this->controller)->{$this->method}();
            }
        }

        public function getRequestElements(): void {
            $clearRequest = $this->getClearRequest($_SERVER['REQUEST_URI']);
            $requestElements = explode('/', $clearRequest);
            $this->controller = $this->getController($requestElements);
            if($this->controller)
                $this->method = $this->getMethod($requestElements);
            if($this->method) 
                $this->args = $this->getArgs($requestElements);
        }

        /**
         * Возвращает контероллер и устанавливает соответствующую ему папку
         */

        public function getController(array $requestElements): string {
            $controllerPart = ucfirst($requestElements[1]);
            if(!$controllerPart) {
                header("Location: ../randomizer/view");
                exit;
            }
            $fileExists = file_exists(__DIR__ . "/../control/{$controllerPart}.php");
            if($fileExists) {
                $controller = "project\\control\\" . $controllerPart;
                Router::$folder = $requestElements[1];
                return $controller;
            }
            else {
                header("Location: ../randomizer/view");
                exit;
            }
        }

        public function getMethod(array $requestElements): string {
            if(!isset($requestElements[2])) {
                header("Location: ../" . Router::$folder . "/view");
                exit;
            }
            $method = $requestElements[2];
            $method_exists = method_exists($this->controller, $method);
            if($method_exists) 
                return $method;
            else {
                header("Location: ../" . Router::$folder . "/view");
                exit;
            }
        }

        public function getArgs(array $requestElements): array {
            $args = [];
            for($i = 3; $i < sizeof($requestElements); $i++)
                $args[] = $requestElements[$i];
            return $args;
        }

        /**
         * Возвращает false если строка не содержит знака вопроса '?'
         * в противном случае строку без изменений
         */

        public function getClearRequest(string $request): string {
            $containsQuestionMark = str_contains($request, '?');
            if($containsQuestionMark) {
                $temp_array = explode('?', $request);
                $string = $temp_array[0];
                return $string;
            }
            else 
                return $request;
        }
    }