<?php
    namespace project\control\traits;

    trait View {
        public function view(): void {
            $classname = __CLASS__;
            $class_array = explode('\\', $classname);
            $class = end($class_array);
            require_once __DIR__ . '/../../view/' . lcfirst($class) . '.php';
        }
    }